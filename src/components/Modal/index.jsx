import { Modal } from "@oragie/react-modal-lib";

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {children}
    </Modal>
  );
};

export default CustomModal;
