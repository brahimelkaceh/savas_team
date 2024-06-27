import { createSlice } from "@reduxjs/toolkit";

const LeftBarSlice = createSlice({
  name: "LeftBar",
  initialState: {
    status: false,
    showing: 0,
    guideid: 0,
    siteName: [],
    inputs: false,
    id: "",
    userName: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    role: "",
    site: "",
    siteId: "",
    editModal: false,
    lotTableId: null,
    msgContent: "--",
  },
  reducers: {
    getMsgContent: (state, action) => {
      state.msgContent = action.payload;
    },
    getLotId: (state, action) => {
      state.lotTableId = action.payload;
    },
    toggleLeftBar: (state, action) => {
      state.status = action.payload;
    },
    showingColmun: (state, action) => {
      state.showing = action.payload;
    },
    getguideId: (state, action) => {
      state.guideid = action.payload;
    },
    getSites: (state, action) => {
      state.siteName = action.payload;
    },
    clearInputs: (state, action) => {
      state.inputs = action.payload;
    },
    userId: (state, action) => {
      state.id = action.payload;
    },
    userData: (state, action) => {
      state.userName = action.payload;
    },
    userEmail: (state, action) => {
      state.email = action.payload;
    },
    userPhone: (state, action) => {
      state.phone = action.payload;
    },
    userFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    userLastName: (state, action) => {
      state.lastName = action.payload;
    },
    userRole: (state, action) => {
      state.role = action.payload;
    },
    userSite: (state, action) => {
      state.site = action.payload;
    },
    userSiteId: (state, action) => {
      state.siteId = action.payload;
    },
    handleCloseEditModal: (state, action) => {
      state.editModal = action.payload;
    },
  },
});
export const {
  showingColmun,
  toggleLeftBar,
  getguideId,
  getSites,
  clearInputs,
  userId,
  userData,
  userEmail,
  userPhone,
  userFirstName,
  userLastName,
  userRole,
  userSite,
  userSiteId,
  handleCloseEditModal,
  getLotId,
  getMsgContent,
} = LeftBarSlice.actions;
export default LeftBarSlice.reducer;
