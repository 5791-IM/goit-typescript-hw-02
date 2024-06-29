import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { FC } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  // overlay: {
  //   backgroundColor: "rgba(0, 0, 0, 0.75)",
  // },
};

Modal.setAppElement("#root");

export interface ImageModalProps {
  alt: string;
  regular: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

const ImageModal: FC<ImageModalProps> = ({
  alt,
  regular,
  isOpen,
  onRequestClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      overlayClassName={css.overlay}
      className={css.modal}
    >
      <img className={css.image} src={regular} alt={alt} />
      <button className={css.closeButton} onClick={onRequestClose}>
        Close
      </button>
    </Modal>
  );
};

export default ImageModal;
