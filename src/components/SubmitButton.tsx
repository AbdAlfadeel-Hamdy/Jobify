import { useNavigation } from "react-router-dom";

interface SubmitButtonProps {
  text?: string;
  loadingText?: string;
  formBtn?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text = "Submit",
  loadingText = "Submitting...",
  formBtn,
}) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      className={`btn btn-block ${formBtn && "form-btn"}`}
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? loadingText : text}
    </button>
  );
};

export default SubmitButton;
