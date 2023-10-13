interface FormRowProps {
  name: string;
  type: "text" | "email" | "number" | "password";
  label?: string;
  required?: boolean;
  defaultValue?: string | number;
}

const FormRow: React.FC<FormRowProps> = ({
  name,
  type,
  label,
  required = true,
  defaultValue = "",
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
      />
    </div>
  );
};

export default FormRow;
