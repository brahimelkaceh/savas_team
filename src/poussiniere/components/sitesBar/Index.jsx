import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useMemo, useState, useEffect } from "react";

function SitesBar({ sites, setSiteId, fetchLotData }) {
  const [value, setValue] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeSite = (id) => {
    setActiveTab(id);
  };
  useEffect(() => {
    sites && setSiteId(sites[0]?.id);
  }, [sites]);

  return (
    <div className="sites-bar">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="secondary scrollable force example"
      >
        {sites ? (
          sites.map((site, i) => (
            <Tab
              key={i}
              className={
                activeTab === i ? "btn-clicked site-button" : "site-button"
              }
              onClick={() => {
                handleChangeSite(i);
                setSiteId(site?.id);
                fetchLotData(site?.id);
              }}
              label={site?.name}
            />
          ))
        ) : (
          <Tab label="Aucun site" />
        )}
      </Tabs>
    </div>
  );
}

export default SitesBar;
