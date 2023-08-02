import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

type Props = { children: ReactNode };
type BackdropProps = { handleCloseCart: () => void };

const Backdrop: React.FC<BackdropProps> = ({ handleCloseCart }) => (
  <div className={styles.backdrop} onClick={handleCloseCart}></div>
);

const ModalOverlay: React.FC<Props> = ({ children }) => (
  <div className={styles.modal}>
    <div className={styles.content}>{children}</div>
  </div>
);

const portalElement = document.getElementById("overlays")!;

export const Modal: React.FC<Props & BackdropProps> = ({
  handleCloseCart,
  children,
}) => (
  <>
    {createPortal(
      <Backdrop handleCloseCart={handleCloseCart} />,
      portalElement
    )}
    {createPortal(<ModalOverlay children={children} />, portalElement)}
  </>
);
