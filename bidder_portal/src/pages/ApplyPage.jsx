import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import Badge from "../components/Badge/Badge";
import FinancialBidStep, { isFinancialBidStepValid } from "../components/Apply/FinancialBidStep";
import InstructionsStep, { isInstructionsStepValid } from "../components/Apply/InstructionsStep";
import PaymentStep, { isPaymentStepValid } from "../components/Apply/PaymentStep";
import ReviewStep from "../components/Apply/ReviewStep";
import StepProgressBar from "../components/Apply/StepProgressBar";
import TechnicalDocsStep, { isTechnicalDocsStepValid } from "../components/Apply/TechnicalDocsStep";
import { APPLICATION_STATUS_DISPLAY } from "../utils/applicationStatusDisplay";
import { formatCurrency, formatDate } from "../utils/tenderDisplay";
import "./ApplyPage.css";

const DEFAULT_APPLICATION_DATA = { paymentStatus: null, receiptNumber: null, technicalFiles: {}, bidAmount: "", financialFiles: {}, submitted: false };
const READ_ONLY_STATUSES = ["SUBMITTED", "UNDER_EVALUATION", "AWARDED", "REJECTED"];

export default function ApplyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tender, setTender] = useState(null);
  const [existingApplication, setExistingApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [applicationData, setApplicationData] = useState(DEFAULT_APPLICATION_DATA);
  const [restoredDraft, setRestoredDraft] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const storageKey = user?.email ? `application-draft-${user.email}-${id}` : null;

  useEffect(() => {
    async function loadApplicationContext() {
      setLoading(true);
      setIsInitialized(false);
      setRestoredDraft(null);
      try {
        const loadedTender = await api.getTenderById(id);
        setTender(loadedTender || null);
        if (!loadedTender || loadedTender.tenderType === "NEGOTIATED") return;

        const savedDraft = storageKey ? JSON.parse(localStorage.getItem(storageKey) || "null") : null;
        const application = await api.getApplicationForTender(id);
        setExistingApplication(application);
        if (savedDraft && !savedDraft.submitted) {
          setCurrentStep(savedDraft.currentStep || 1);
          setMaxStepReached(savedDraft.maxStepReached || 1);
          setApplicationData((data) => ({ ...data, paymentStatus: savedDraft.paymentStatus, receiptNumber: savedDraft.receiptNumber, bidAmount: savedDraft.bidAmount || "" }));
          setRestoredDraft(savedDraft);
        } else if (application?.status === "IN_PROGRESS") {
          setCurrentStep(application.currentStep || 1);
          setMaxStepReached(application.maxStepReached || 1);
        } else {
          setCurrentStep(1);
          setMaxStepReached(1);
          setApplicationData(DEFAULT_APPLICATION_DATA);
        }
      } catch {
        setTender(null);
        setExistingApplication(null);
      } finally {
        setIsInitialized(true);
        setLoading(false);
      }
    }
    loadApplicationContext();
  }, [id, storageKey]);

  useEffect(() => {
    if (!isInitialized || !storageKey || !tender || applicationData.submitted) return;
    const filenames = (files) => Object.fromEntries(Object.entries(files).filter(([, file]) => file).map(([key, file]) => [key, file.name]));
    localStorage.setItem(storageKey, JSON.stringify({ currentStep, maxStepReached, paymentStatus: applicationData.paymentStatus, receiptNumber: applicationData.receiptNumber, bidAmount: applicationData.bidAmount, technicalDocsFilenames: filenames(applicationData.technicalFiles), financialDocsFilenames: filenames(applicationData.financialFiles) }));
    api.updateApplicationProgress(tender.id, { currentStep, maxStepReached });
  }, [isInitialized, storageKey, tender, currentStep, maxStepReached, applicationData]);

  useEffect(() => {
    if (applicationData.submitted || (currentStep <= 1 && applicationData.paymentStatus !== "paid")) return undefined;
    const warn = (event) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [currentStep, applicationData.paymentStatus, applicationData.submitted]);

  function updateApplication(patch) { setApplicationData((current) => ({ ...current, ...patch })); }
  function isCurrentStepValid() {
    if (currentStep === 1) return isPaymentStepValid(applicationData);
    if (currentStep === 2) return isInstructionsStepValid(applicationData);
    if (currentStep === 3) return isTechnicalDocsStepValid(applicationData);
    if (currentStep === 4) return isFinancialBidStepValid(applicationData);
    return true;
  }
  function handleContinue() {
    if (!isCurrentStepValid() || currentStep >= 5) return;
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setMaxStepReached((currentMax) => Math.max(currentMax, nextStep));
  }
  function handleStepClick(stepNumber) { if (stepNumber <= maxStepReached) setCurrentStep(stepNumber); }
  function handleSubmit() { if (storageKey) localStorage.removeItem(storageKey); updateApplication({ submitted: true }); }
  async function handleWithdraw() {
    const message = `Your ${formatCurrency(tender.nonRefundableFee)} instruction fee is non-refundable and will not be returned if you withdraw. Are you sure you want to withdraw this application?`;
    if (!window.confirm(message)) return;
    await api.withdrawApplication(tender.id);
    navigate("/applications");
  }
  function renderStep() {
    if (currentStep === 1) return <PaymentStep tender={tender} paymentStatus={applicationData.paymentStatus} receiptNumber={applicationData.receiptNumber} onUpdate={updateApplication} />;
    if (currentStep === 2) return <InstructionsStep tender={tender} receiptNumber={applicationData.receiptNumber} />;
    if (currentStep === 3) return <TechnicalDocsStep technicalFiles={applicationData.technicalFiles} onUpdate={updateApplication} />;
    if (currentStep === 4) return <FinancialBidStep bidAmount={applicationData.bidAmount} financialFiles={applicationData.financialFiles} onUpdate={updateApplication} />;
    return <ReviewStep tender={tender} applicationData={applicationData} onSubmit={handleSubmit} onNavigateToStep={setCurrentStep} />;
  }

  if (loading) return <p className="apply-loading">Loading tender...</p>;
  if (!tender) return <p className="apply-empty">Tender not found.</p>;
  if (tender.tenderType === "NEGOTIATED") return <p className="apply-empty">This tender is conducted via direct negotiation and is not available through the self-service application portal. Please contact the Procurement Department.</p>;
  if (READ_ONLY_STATUSES.includes(existingApplication?.status)) {
    const statusDisplay = APPLICATION_STATUS_DISPLAY[existingApplication.status];
    return <section className="apply-read-only"><p>You have already applied to this tender.</p><Badge variant={statusDisplay.variant}>{statusDisplay.label}</Badge><dl><div><dt>Applied date</dt><dd>{formatDate(existingApplication.appliedDate)}</dd></div></dl><Link to="/applications">Back to applications</Link></section>;
  }
  if (!existingApplication && tender.status !== "OPEN") return <p className="apply-empty">This tender is not currently accepting applications.</p>;
  if (!existingApplication && tender.tenderType === "SELECTIVE_RESTRICTED" && !tender.invitedBidderEmails?.includes(user?.email)) return <p className="apply-empty">This tender is by invitation only, and you have not been invited to participate.</p>;
  if (applicationData.submitted) return <section className="apply-submitted"><h1>Application submitted successfully</h1><p>Your bid application for {tender.referenceCode} has been recorded.</p><Link to="/dashboard">Back to dashboard</Link></section>;

  return (
    <section className="apply-page">
      <header className="apply-header"><span>TENDER APPLICATION</span><h1>{tender.referenceCode} - {tender.title}</h1></header>
      <div className="apply-card">
        {restoredDraft && <div className="apply-upload-note">We restored your progress from your last session. Please re-select any files you had uploaded, as they could not be saved. {[...Object.values(restoredDraft.technicalDocsFilenames || {}), ...Object.values(restoredDraft.financialDocsFilenames || {})].join(", ")}</div>}
        <StepProgressBar currentStep={currentStep} maxStepReached={maxStepReached} onStepClick={handleStepClick} />
        {renderStep()}
        <footer className="apply-footer">
          {currentStep > 1 ? <button type="button" className="apply-button apply-button-secondary" onClick={() => setCurrentStep(currentStep - 1)}>Back</button> : <span />}
          {currentStep >= 2 && !applicationData.submitted && <button type="button" className="apply-withdraw" onClick={handleWithdraw}>Withdraw Application</button>}
          {currentStep < 5 && <button type="button" className="apply-button apply-button-primary" disabled={!isCurrentStepValid()} onClick={handleContinue}>Continue</button>}
        </footer>
      </div>
    </section>
  );
}
