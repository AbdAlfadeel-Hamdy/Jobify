import { HTMLInputTypeAttribute, ChangeEventHandler } from "react";

interface FormRowProps {
  name: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  required?: boolean;
  defaultValue?: string | number;
  onChange?: ChangeEventHandler;
  accept?: string;
}

const FormRow: React.FC<FormRowProps> = ({
  name,
  type = "text",
  label,
  required = true,
  defaultValue = "",
  accept,
  onChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        required={required}
        defaultValue={defaultValue}
        onChange={onChange}
        accept={accept}
      />
    </div>
  );
};

export default FormRow;
