import { createSlice } from "@reduxjs/toolkit";
const SearchBarSlice = createSlice({
  name: "searchBar",
  initialState: {
    searchBarstatus: false,
    isVisualize: true,
  },
  reducers: {
    openSearchBar: (state, actions) => {
      state.searchBarstatus = true;
    },
    closeSearchBar: (state) => {
      state.searchBarstatus = false;
    },
  },
});
export const { openSearchBar, closeSearchBar } = SearchBarSlice.actions;
export default SearchBarSlice.reducer;
