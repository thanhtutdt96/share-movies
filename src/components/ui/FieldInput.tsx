import { FC, HTMLInputTypeAttribute } from "react";
import { ErrorMessage, Field } from "formik";

interface Props {
  inputType: HTMLInputTypeAttribute;
  entityType: string;
  placeholder?: string;
  bordered?: boolean;
  inputClasses?: string;
  className?: string;
  wrapperClasses?: string;
  label?: string;
}
const FieldInput: FC<Props> = ({
  inputType,
  entityType,
  placeholder,
  bordered,
  inputClasses,
  wrapperClasses,
  className,
  label,
}) => {
  return (
    <div className={`${className ? className : ""}`}>
      {label && <label htmlFor={entityType}>{label}</label>}
      <div className={`flex flex-col ${wrapperClasses ? wrapperClasses : ""}`}>
        <Field
          id={entityType}
          name={entityType}
          type={inputType}
          className={`input input-sm w-full${bordered ? " input-bordered" : ""} ${
            inputClasses ? inputClasses : ""
          }`}
          placeholder={placeholder}
          data-testid={`field-input-${entityType}`}
        />
        <ErrorMessage
          name={entityType}
          render={(errorMessage) => (
            <div className="text-xs text-error mt-1" data-testid={`error-message-${entityType}`}>
              {errorMessage}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default FieldInput;
