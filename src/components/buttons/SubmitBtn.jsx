import { AiOutlineSend } from "react-icons/ai";
const SubmitBtn = () => {
  return (
    <button type="submit" className="edit-btn">
      <div className="svg-wrapper-1">
        <div className="svg-wrapper">
          <AiOutlineSend />
        </div>
      </div>
      <span>Submit</span>
    </button>
  );
};

export default SubmitBtn;
