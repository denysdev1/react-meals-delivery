import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

type Props = { children: ReactNode };

const Backdrop = () => <div className={styles.backdrop}></div>;

const ModalOverlay: React.FC<Props> = ({ children }) => (
  <div className={styles.modal}>
    <div className={styles.content}>{children}</div>
  </div>
);

const portalElement = document.getElementById("overlays")!;

export const Modal: React.FC<Props> = ({ children }) => (
  <>
    {createPortal(<Backdrop />, portalElement)}
    {createPortal(<ModalOverlay children={children} />, portalElement)}
  </>
);
