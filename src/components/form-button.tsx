import { cn } from "@/shared/utils";
import Link from "next/link";

interface FormButtonProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  loading?: boolean | undefined;
  disabled?: boolean | undefined;
}

export const FormButton = ({ href, label, icon, loading, disabled }: FormButtonProps) => {
  return (
    <Link
      href={href}
      className={cn("btn w-full", disabled ? "btn-disabled" : "btn-primary", loading || disabled ? "pointer-events-none" : "")}
      aria-disabled={disabled}
    >
      {loading ? (
        <span className="loading loading-dots laoding-sm" />
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </Link>
  );
};
