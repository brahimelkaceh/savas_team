import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useMemo, useState, useEffect } from "react";

let base_url = "https://farmdriver.savas.ma/api/";

function SitesBar({ siteData, FetchData }) {
  const [value, setValue] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeSite = (id) => {
    setActiveTab(id);
  };
  useEffect(() => {
    siteData && FetchData(siteData[0]?.id);
  }, [siteData]);

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
        {siteData ? (
          siteData.map((site, i) => (
            <Tab
              key={site?.id}
              className={
                activeTab === i ? "btn-clicked site-button" : "site-button"
              }
              onClick={() => {
                handleChangeSite(i);
                FetchData(site?.id);
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
