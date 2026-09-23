import Modal from "./Modal";
import Button from "./Button";

function ConfirmDialog({
    isOpen, onClose, onConfirm, title, message, confirmLabel = 'Confirm', variant = 'danger', loading = false,
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <p className="modal-body">{message}</p>
            <div className="modal-actions">
                <Button variant="secondary" onClick={onClose} disabled={loading}>Cancel</Button>
                <Button variant={variant} loading={loading} onClick={() => onConfirm()}>{confirmLabel}</Button>
            </div>
        </Modal>
    );
}

export default ConfirmDialog;
