import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services/authServices";
import { logoutUser } from "../services/authServices";
import { loginService } from "../services/authServices";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  success: false,
  error: false,
  loading: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    const data = await authService(user);

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error[0]);
    }

    return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutUser();
});

export const LoginIsUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    const data = await loginService(user);

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error[0]);
    }

    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = null;
        state.user = null;
      })
      .addCase(LoginIsUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(LoginIsUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(LoginIsUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
