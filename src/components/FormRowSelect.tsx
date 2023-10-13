interface FormRowSelectProps {
  name: string;
  label?: string;
  list: string[];
  defaultValue?: string;
}

const FormRowSelect: React.FC<FormRowSelectProps> = ({
  name,
  label,
  list,
  defaultValue = "",
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        className="form-select"
      >
        {list.map((itemValue) => (
          <option value={itemValue}>{itemValue}</option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
