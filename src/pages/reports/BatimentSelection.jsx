import { useMemo, useState, useEffect } from "react";
import UseFetchData from "../../hooks/UseFetchData";
import FormHeader from "./Components/FormHeader";
import { useData } from "./context/DataProvider";
import { getBatName, getBatimentName } from "../../slices/SiteData";
import { useSelector, useDispatch } from "react-redux";
const BatimentSelection = ({
  BatimentIdent,
  siteId,
  batimentId,
  setBatimentId,
  getBatData,
}) => {
  let renderData = useSelector((state) => state.getSiteData.renderData);
  const { dispatch } = useData();

  useEffect(() => {
    setBatimentId("");
  }, [renderData]);
  // const apiUrl
  return (
    <div className="batiment-selection">
      <label>
        <select
          required
          // ref={typeRef}
          value={batimentId}
          id="production"
          className="input"
          onChange={(e) => {
            setBatimentId(e.target.value);
            dispatch(getBatimentName(e.target.value));
            getBatData(e.target.value);
          }}
        >
          <option value="">--</option>

          {BatimentIdent?.map((batiment) => {
            return (
              <option key={batiment.id} value={batiment.id} className="input">
                {batiment.batiment} ({batiment?.code})
              </option>
            );
          })}
        </select>
        <span> Selectionez un bâtiment*</span>
      </label>
    </div>
  );
};

export default BatimentSelection;
