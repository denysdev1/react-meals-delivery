import { ReactNode } from "react";
import styles from "./Card.module.css";

export const Card: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className={styles.card}>{children}</div>
);
