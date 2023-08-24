interface FormRowProps {
  label?: string;
  name: string;
  type: "text" | "email" | "number" | "password";
  required?: boolean;
  defaultValue?: string | number;
}

const FormRow: React.FC<FormRowProps> = ({
  label,
  type,
  name,
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
