import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import { closeDrop } from "../../slices/UserDrop";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/navbar/Navbar";

function AddGuide() {
  const status = useSelector((state) => state.toggleLeftBar.status);

  const isVisualize = useSelector((state) => state.openSearchBar.isVisualize);
  const dropState = useSelector((state) => state.userDrop.dropState);

  const dispatch = useDispatch();
  return (
    <>
      <main className={status === true ? "page page-with-sidebar " : "page"}>
        {/* <Topbar
          isVisualize={!isVisualize}
          onClick={() => dropState && dispatch(closeDrop())}
        />
        <Sidebar /> */}
        <Navbar />
        <h1>Add Guide</h1>
      </main>
    </>
  );
}

export default AddGuide;
