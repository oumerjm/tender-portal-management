import Badge from "../Badge/Badge";
import { APPLICATION_STATUS_DISPLAY } from "../../utils/applicationStatusDisplay";
import { formatDate } from "../../utils/tenderDisplay";

export default function ApplicationRow({ application, onAction }) {
  const { variant, label } = APPLICATION_STATUS_DISPLAY[application.status];
  const isInProgress = application.status === "IN_PROGRESS";

  return (
    <tr className="application-row">
      <td>{application.tenderReferenceCode}</td>
      <td>{application.tenderTitle}</td>
      <td>
        <Badge variant={variant}>{label}</Badge>
      </td>
      <td>{formatDate(application.appliedDate)}</td>
      <td>
        <button
          type="button"
          className="applications-action"
          onClick={() => onAction(application)}
        >
          {isInProgress ? "Continue Application" : "View Details"}
        </button>
      </td>
    </tr>
  );
}
