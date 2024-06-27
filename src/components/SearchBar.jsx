import { FaTimes } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import "../styles/searchbar.css";
import { useState } from "react";
import DownloadBtn from "./buttons/DownloadBtn";
import ShowBtn from "./buttons/ShowBtn";
import { closeSearchBar } from "../slices/SearchBar";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
  const searchBarstatus = useSelector(
    (state) => state.openSearchBar.searchBarstatus
  );
  const dispatch = useDispatch();

  const [list, setList] = useState([
    { id: 1, name: "B1", isChecked: false },
    { id: 2, name: "B2", isChecked: false },
    { id: 3, name: "B3", isChecked: false },
  ]);
  const [semaineValue, setSemaineValue] = useState();
  const [anneeValue, setAnneeValue] = useState();
  const [showCheckboxLis, setShowCheckboxList] = useState(false);

  const handleCheckboxChange = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          item.isChecked = !item.isChecked;
          console.log(item.name);
        }
        return item;
      })
    );
  };

  return (
    <aside
      className={`${
        searchBarstatus
          ? "searchbar show-searchbar slide-in-right"
          : "slide-in-left searchdbar"
      }`}
    >
      <div className="searchbar-header">
        <button
          className="close-search-btn"
          onClick={() => {
            dispatch(closeSearchBar());
          }}
        >
          <FaTimes />
        </button>
      </div>
      <div className="searchbar-content">
        <div className="input-container c-margin">
          <select
            name="annee"
            id="annee"
            className="input"
            value={anneeValue}
            onChange={(event) => {
              setAnneeValue(event.target.value);
            }}
          >
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
          <label htmlFor="annee" className="placeholder">
            Année
          </label>
        </div>
        <div className="input-container c-margin">
          <select
            name="semaine"
            id="semaine"
            className="input"
            value={semaineValue}
            onChange={(event) => {
              setSemaineValue(event.target.value);
            }}
          >
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
          </select>
          <label htmlFor="semaine" className="placeholder">
            Semaine Civile
          </label>
        </div>
        <div className="input-container c-margin input-checkbox-container">
          <div
            className="input"
            onClick={() => setShowCheckboxList(!showCheckboxLis)}
          >
            Bâtiment <RiArrowDropDownLine className="batiment-icon" />
          </div>
          <label htmlFor="semaine" className="placeholder">
            Bâtiments
          </label>

          {list.map(
            (item) =>
              showCheckboxLis && (
                <p
                  key={item.id}
                  className="checkbox-item"
                  onClick={() => {
                    handleCheckboxChange(item.id);
                  }}
                >
                  <span>{item.name}</span>
                  <input
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={() => {
                      handleCheckboxChange(item.id);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </p>
              )
          )}
        </div>
      </div>
      <div className="searchbar-footer">
        <div className="footer-text">
          <p>
            Année : <span>{anneeValue}</span>
          </p>
          <p>
            Semaine Civile : <span> {semaineValue}</span>
          </p>
          <p>
            Bâtiment :
            {list.map((item) => {
              return item.isChecked ? (
                <span key={item.id}>{item.name},</span>
              ) : (
                ""
              );
            })}
          </p>
        </div>
        <div className="footer-btn">
          <ShowBtn />
          <DownloadBtn />
        </div>
      </div>
    </aside>
  );
};

export default SearchBar;
