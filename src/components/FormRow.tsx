interface FormRowProps {
  name: string;
  type?: "text" | "email" | "number" | "password" | "file";
  label?: string;
  required?: boolean;
  defaultValue?: string | number;
  accept?: string;
}

const FormRow: React.FC<FormRowProps> = ({
  name,
  type = "text",
  label,
  required = true,
  defaultValue = "",
  accept,
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
        accept={accept}
      />
    </div>
  );
};

export default FormRow;
