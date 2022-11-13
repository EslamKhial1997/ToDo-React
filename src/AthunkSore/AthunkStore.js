import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Database/Firebase";
import { ReportAdds, ReportDel } from "./Report";
const data = collection(db, "books");
export const insertBooks = createAsyncThunk(data, async (Data, pram) => {
  const { rejectWithValue, dispatch } = pram;
  try {
    await addDoc(data, Data);
    dispatch(ReportAdds({ insert: "Adds Is Sucsses" }));
    setTimeout(() => {
      dispatch(ReportAdds({}));
    }, 3000);
  } catch (error) {
    dispatch(ReportAdds({ insert: "Adds Is Faild" }));;
    return rejectWithValue(error.message);;
  }
});

export const deleteBooks = createAsyncThunk(data, async (e, pram) => {
  const { rejectWithValue, dispatch } = pram;
  try {
    const deletuser = doc(db, "books", e);;
    await deleteDoc(deletuser);

    dispatch(ReportDel({ Delete: "Delete Is Succsess" }));
    setTimeout(() => {
      dispatch(ReportDel({}));
    }, 5000);
    return e;
  } catch (error) {
    dispatch(ReportDel({ Delete: "Delete Is Faild" }));
    return rejectWithValue(error.message);
  }
});
const StoreSlice = createSlice({
  name: "books",
  initialState: {
    isLoading: false,
    error: null,
    userName: "",
    toggle:false
    // readBook: [],
  },
  reducers: {
    getuser: (state, action) => {
      state.userName = action.payload;
    },
    toggle: (state, action) => {
      state.toggle = action.payload;
    },
  },
  extraReducers: {
    [insertBooks.pending]: (state, action) => {
      state.error = null;
      state.isLoading = true;
    },
    [insertBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [insertBooks.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    //Delete Data From Page

    [deleteBooks.pending]: (state, action) => {
      state.error = null;
      state.isLoading = true;
    },

    [deleteBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [deleteBooks.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const Store = StoreSlice.reducer;
export const {getuserName , toggle} = StoreSlice.actions;
