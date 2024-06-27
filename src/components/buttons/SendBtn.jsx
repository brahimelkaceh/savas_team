import { AiOutlineSend } from "react-icons/ai";
import "./sendBtn.css";
const SendBtn = ({ disabled }) => {
  return (
    <button
      // className={`${disabled ? "disabled-btn" : "send-btn"}`}
      className="send-btn"
      type="submit"
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <div className="svg-wrapper-1">
        <div className="svg-wrapper">
          <AiOutlineSend />
        </div>
      </div>
      <span>Send</span>
    </button>
  );
};

export default SendBtn;
