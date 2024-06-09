import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/16/solid";

interface FormInputProps {
  icon?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string | undefined;
  required?: boolean | undefined;
  errors?: string[] | undefined;
}

export const FormInput = ({ icon, type, placeholder, required, errors }: FormInputProps) => {
  return (
    <div className="space-y-2">
      <label className="input input-bordered flex items-center gap-2">
        {icon}
        <input type={type} className="grow" placeholder={placeholder} required={required} />
      </label>
      {errors?.map((error, index) => (
        <p className="text-error text-sm" key={index}>
          {"• " + error}
        </p>
      ))}
    </div>
  );
};
