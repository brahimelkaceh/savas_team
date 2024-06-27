import React, { useContext, useEffect, useState } from "react";

import LotContext from "../context/LotContext";
import Loader from "../../../components/loader/Loader";
import MultiSelect from "./MultiSelect";

const SiteBox = ({ data, mergeAllCodeLot }) => {
  const { loading } = useContext(LotContext);
  const [allLots, setAllLots] = useState([]);
  const getAllSelectedLots = (data) => {
    setAllLots((prevSelected) => [data, ...prevSelected]);
  };
  useEffect(() => {
    mergeAllCodeLot(allLots);
  }, [allLots]);
  if (loading) {
    return (
      <div className="selected-site-box">
        <Loader />
      </div>
    );
  }
  return (
    <div className="selected-sites-box">
      <div className="site-name">
        <p className="site-title">{data?.site}</p>
      </div>
      <div className="multi-bats-selected">
        {data &&
          data?.bats?.map((bat, i) => {
            return (
              <div className="selected-bats-box" key={i}>
                <div className="bat-box">
                  <p>{bat.name}</p>
                </div>
                <MultiSelect
                  lots={bat.lots}
                  getAllSelectedLots={getAllSelectedLots}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SiteBox;
