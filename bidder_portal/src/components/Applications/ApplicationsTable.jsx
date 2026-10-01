import { Link, useNavigate } from "react-router-dom";
import ApplicationRow from "./ApplicationRow";
import "./ApplicationsTable.css";

export default function ApplicationsTable({ applications = [] }) {
  const navigate = useNavigate();
  function handleAction(application) {
    navigate(`/tenders/${application.tenderId}/apply`);
  }

  if (!applications.length) {
    return (
      <div className="applications-empty">
        <p>You haven't applied to any tenders yet.</p>
        <Link to="/tenders">Browse Tenders</Link>
      </div>
    );
  }

  return (
    <div className="applications-table-card">
      <div className="applications-table-scroll">
        <table className="applications-table">
          <thead>
            <tr>
              <th>TENDER ID</th>
              <th>TITLE</th>
              <th>STATUS</th>
              <th>APPLIED DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <ApplicationRow
                key={application.id}
                application={application}
                onAction={handleAction}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
