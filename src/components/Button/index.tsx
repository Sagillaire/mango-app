import { FC, ReactNode } from "react";
import "./styles.css";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

export const Button: FC<Props> = ({ children, onClick }) => {
  return <button onClick={onClick} className="button">{children}</button>;
};
