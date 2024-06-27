import { createSlice } from "@reduxjs/toolkit";

const BatimentDataSlice = createSlice({
  name: "BatimentData",
  initialState: {
    nextDate: "salam",
    nextDateFormat: "",
    type: "",
    closed: true,
    lot_code: "",
    last_rep: {
      formule: null,
      lumiere_alum: null,
      lumiere_extin: null,
      lumiere_durr: "0:0",
      flash_durr: "0:0",
      flash_alum: null,
      flash_extin: null,
      intensite: 0,
      intensIsLux: false,
      coloration: null,
      qty_coquille: null,
    },
  },
  reducers: {
    setNextDate: (state, action) => {
      state.nextDate = action.payload;
    },
    setNextDateFormat: (state, action) => {
      state.nextDateFormat = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setClosed: (state, action) => {
      state.closed = action.payload;
    },
    setLotCode: (state, action) => {
      state.lot_code = action.payload;
    },
    setLastRepData: (state, action) => {
      state.last_rep = action.payload;
    },
  },
});

export const {
  setNextDate,
  setNextDateFormat,
  setType,
  setClosed,
  setLotCode,
  setLastRepData,
} = BatimentDataSlice.actions;

export default BatimentDataSlice.reducer;
