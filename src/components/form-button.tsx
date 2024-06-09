"use client";

import { cn } from "@/shared/utils";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useFormStatus } from "react-dom";

type FormButtonType = "Button" | "Link";

interface FormButtonProps {
  className?: string;
  type: FormButtonType;
  label: string;
  href?: Url;
  icon?: React.ReactNode;
  disabled?: boolean | undefined;
  onClick?: () => Promise<void>;
}

export const FormButton = ({ className = "", type, label, href, icon, disabled, onClick }: FormButtonProps) => {
  // useFormStatus는 반드시 Action이 걸린 Form 내부에서만 사용이 가능하다.
  const { pending } = useFormStatus();

  const renderChildren = (pending: boolean | undefined) => {
    return pending ? (
      <span className="loading loading-dots laoding-sm text-primary" />
    ) : (
      <>
        {icon}
        {label}
      </>
    );
  };

  return type === "Link" && href ? (
    <Link
      href={href}
      className={cn(
        "btn",
        disabled ? "btn-disabled" : "btn-primary",
        pending || disabled ? "pointer-events-none" : "",
        className
      )}
    >
      {renderChildren(pending)}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={cn("btn", disabled ? "btn-disabled" : "btn-primary", "disabled:cursor-not-allowed", className)}
      disabled={disabled || pending}
    >
      {renderChildren(pending)}
    </button>
  );
};
