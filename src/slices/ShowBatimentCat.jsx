import { createSlice } from "@reduxjs/toolkit";

const ShowBatimentCatSlice = createSlice({
  name: "showBatimentCat",
  initialState: {
    batimentCatState: false,
    name: "",
    data: [],
    sites: [],
    formState: false,
    typeOfBatiment: "production",
    lotNextDate: "hello",
  },
  reducers: {
    ShowBatimentCat: (state, action) => {
      state.batimentCatState = true;
    },
    ShowSiteName: (state, action) => {
      state.name = action.payload;
    },
    ProductionData: (state, action) => {
      state.data = action.payload;
    },
    SitesDate: (state, action) => {
      state.sites = action.payload;
    },
    toggleBatimentForm: (state) => {
      state.formState = true;
    },
    toggleTypeOf: (state, action) => {
      state.typeOfBatiment = action.payload;
    },
    getNextDate: (state, action) => {
      state.lotNextDate = action.payload;
    },
  },
});

export const {
  ShowBatimentCat,
  ShowSiteName,
  ProductionData,
  SitesDate,
  toggleBatimentForm,
  toggleTypeOf,
  getNextDate,
} = ShowBatimentCatSlice.actions;
export default ShowBatimentCatSlice.reducer;
