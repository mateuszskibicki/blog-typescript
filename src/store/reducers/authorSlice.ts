import { createSlice } from "@reduxjs/toolkit";

const authorSlice = createSlice({
  name: "author",
  initialState: {} as any,
  reducers: {
    getAuthorByUID(state, action) {
      const { uid, authorData } = action.payload;
      state[uid] = authorData;
    },
    setAuthorErrorTrue(state, action) {
      const { uid } = action.payload;
      state[uid] = { error: true };
    }
  }
});

export const { getAuthorByUID, setAuthorErrorTrue } = authorSlice.actions;

export default authorSlice.reducer;
