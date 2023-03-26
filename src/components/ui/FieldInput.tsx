import { FC, HTMLInputTypeAttribute } from "react";
import { ErrorMessage, Field } from "formik";

interface Props {
  inputType: HTMLInputTypeAttribute;
  entityType: string;
  placeholder?: string;
  size?: "xs" | "md" | "sm" | "lg";
  bordered?: boolean;
  inputClasses?: string;
  className?: string;
}
const FieldInput: FC<Props> = ({
  inputType,
  entityType,
  placeholder,
  size,
  bordered,
  inputClasses,
  className,
}) => {
  return (
    <div className={`flex flex-col ${className ? className : ""}`}>
      <Field
        id={entityType}
        name={entityType}
        type={inputType}
        className={`input input-${size} w-full${bordered ? " input-bordered" : ""} ${
          inputClasses ? inputClasses : ""
        }`}
        placeholder={placeholder}
      />
      <ErrorMessage
        name={entityType}
        render={(errorMessage) => <div className="text-xs text-error mt-1">{errorMessage}</div>}
      />
    </div>
  );
};

export default FieldInput;
