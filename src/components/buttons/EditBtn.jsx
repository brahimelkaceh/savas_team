import "./editBtn.css";
import { RxUpdate } from "react-icons/rx";
import { setDisabled } from "../../slices/DisabledInput";
import { useDispatch, useSelector } from "react-redux";
const EditBtn = ({ disabled }) => {
  const dispatch = useDispatch();
  return (
    <button
      className="edit-btn"
      disabled={!disabled}
      onClick={(e) => {
        e.preventDefault();
        dispatch(setDisabled(!disabled));
      }}
    >
      <div className="svg-wrapper-1">
        <div className="svg-wrapper">
          <RxUpdate />
        </div>
      </div>
      <span>Edit</span>
    </button>
  );
};

export default EditBtn;
