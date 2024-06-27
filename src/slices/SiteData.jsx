import { createSlice } from "@reduxjs/toolkit";

const SiteDataSlice = createSlice({
  name: "SiteData",
  initialState: {
    siteId: "",
    siteName: "",
    sitePhone: "",
    region: "",
    batName: "",
    batId: "",
    batType: "",
    batSite: "",
    renderData: new Date().toString(),
    refreshData: new Date().toString(),
    batimentName: "",
  },
  reducers: {
    getSiteData: (state, action) => {
      state.siteId = action.payload;
    },
    getSiteName: (state, action) => {
      state.siteName = action.payload;
    },
    getSitePhone: (state, action) => {
      state.sitePhone = action.payload;
    },
    getSiteRegion: (state, action) => {
      state.region = action.payload;
    },
    getBatName: (state, action) => {
      state.batName = action.payload;
    },
    getBatId: (state, action) => {
      state.batId = action.payload;
    },
    getBatType: (state, action) => {
      state.batType = action.payload;
    },
    getBatSite: (state, action) => {
      state.batSite = action.payload;
    },
    getRenderData: (state, action) => {
      state.renderData = action.payload;
    },
    getBatimentName: (state, action) => {
      state.batimentName = action.payload;
    },
    getRefreshData: (state, action) => {
      state.refreshData = action.payload;
    },
  },
});
export const {
  getSiteData,
  getSiteName,
  getSitePhone,
  getSiteRegion,
  getBatName,
  getBatId,
  getBatType,
  getBatSite,
  getRenderData,
  getBatimentName,
  getRefreshData,
} = SiteDataSlice.actions;
export default SiteDataSlice.reducer;
