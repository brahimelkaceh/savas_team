import * as React from "react";
import { useState } from "react";

import SiteSelected from "../../components/SiteSelected";
import LotSelected from "../../components/LotSelected";
import ParamSelected from "../../components/ParamsSelected";
import ParamsList from "../../components/ParamsList";
import LotList from "../../components/LotList";

const Header = ({
  setLot,
  setData,
  param,
  setParam,
  setParamId,
  lot,
  lotId,
  setLotId,
}) => {
  const [siteId, setSiteId] = useState("");
  const [lotName, setLotName] = useState([]);

  const handleDeleteItem = (deletedItem) => {
    const updatedParamName = lotName.filter((name) => name !== deletedItem);
    setLotName(updatedParamName);
    setLot(updatedParamName);
  };

  return (
    <div className="chart-header-container">
      <SiteSelected setSiteId={setSiteId} />
      <LotSelected
        siteId={siteId}
        setLot={setLot}
        setData={setData}
        setLotName={setLotName}
        lotName={lotName}
        lotId={lotId}
        setLotId={setLotId}
      />
      <ParamSelected
        setParam={setParam}
        param={param}
        setParamId={setParamId}
      />
      {/* <LotList lot={lot} onDeleteItem={handleDeleteItem} /> */}
    </div>
  );
};

export default Header;
