export type AlertActionStyle = "default" | "primary" | "ghost" | "link";

export interface AlertAction {
  lable: string;
  style: AlertActionStyle;
  onClick?: () => void | undefined;
}

export interface AlertProps {
  visible: boolean;
  title?: string | undefined;
  message?: string | undefined;
  actions?: [AlertAction, AlertAction?];
}

export interface AlertStore extends AlertProps {
  show: (props: Omit<AlertProps, "visible">) => void;
  dismiss: () => void;
}
