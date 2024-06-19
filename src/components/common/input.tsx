import { cn } from "@/lib/utils";
import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

interface InputProps {
  className?: string;
  name: string;
  icon?: React.ReactNode;
  errors?: string[] | undefined;
}

const Input = (
  {
    className = "",
    errors,
    name,
    icon,
    ...rest
  }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div className={cn("space-y-2", className)}>
      <label className={"input input-bordered flex items-center gap-2"}>
        {icon}
        <input ref={ref} name={name} className="grow" {...rest} />
      </label>
      {errors?.map((error, index) => (
        <p className="text-error text-sm" key={index}>
          {"• " + error}
        </p>
      ))}
    </div>
  );
};

export default forwardRef(Input);
