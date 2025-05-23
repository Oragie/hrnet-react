import CustomModal from "./index";
import partyIcon from "../../assets/img/party.png";
import "../../components/Modal/_modal.scss";

function EmployeeSuccessModal({ isOpen, onClose, employee }) {
  if (!employee) return null;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div className="modal-success">
        <img src={partyIcon} alt="Success" className="modal-icon" />
        <h2>Employee Created!</h2>
        <p className="modal-message">
          You successfully created a new employee!
        </p>
        <div className="modal-recap">
          <strong>
            {employee.firstName} {employee.lastName}
          </strong>{" "}
          is now a new employee, starting{" "}
          <strong>
            {employee.startDate
              ? new Date(employee.startDate).toLocaleDateString()
              : ""}
          </strong>{" "}
          in <strong>{employee.department}</strong>.
        </div>
        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </CustomModal>
  );
}

export default EmployeeSuccessModal;
