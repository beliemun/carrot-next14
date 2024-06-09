import { cn } from "@/shared/utils";

interface FormInputProps {
  className?: string;
  name: string;
  icon?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string | undefined;
  required?: boolean | undefined;
  errors?: string[] | undefined;
}

export const FormInput = ({ className = "", name, icon, type, placeholder, required, errors }: FormInputProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <label className={"input input-bordered flex items-center gap-2"}>
        {icon}
        <input name={name} type={type} className="grow" placeholder={placeholder} required={required} />
      </label>
      {errors?.map((error, index) => (
        <p className="text-error text-sm" key={index}>
          {"• " + error}
        </p>
      ))}
    </div>
  );
};
