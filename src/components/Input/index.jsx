/* Компоненты */
import InputTextField from "./InputTextField";
import InputUpload from "./InputUpload";
import InputDate from "./InputDate";

const Input = ({ children }) => {
  return children;
};

export default Input;

Input.TextField = InputTextField;
Input.Upload = InputUpload;
Input.Date = InputDate;
