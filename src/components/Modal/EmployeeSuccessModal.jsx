import CustomModal from "./index";
import partyIcon from "../../assets/img/congratz.gif";
import "../../components/Modal/_modal.scss";

function EmployeeSuccessModal({ isOpen, onClose, employee }) {
  if (!employee) return null;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div className="modal-success">
        <button className="modal-close-x" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <img src={partyIcon} alt="Success" className="modal-icon" />
        <div className="modal-header">Employee Created!</div>
        <p className="modal-message">
          You successfully created a new employee!
        </p>
        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </CustomModal>
  );
}

export default EmployeeSuccessModal;
