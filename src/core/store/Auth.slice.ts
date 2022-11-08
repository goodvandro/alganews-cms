import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserService } from "goodvandro-alganews-sdk";
import AuthService from "../../auth/Authorization.service";

type PA<T> = PayloadAction<T>;

interface AuthState {
  user: User.Detailed | null;
  fetching: boolean;
}

const initialState: AuthState = {
  user: null,
  fetching: false,
};

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (userId: number, { rejectWithValue, dispatch }) => {
    try {
      const user = await UserService.getDetailedUser(userId);

      if (user.role !== "EDITOR") {
        window.alert("Você não tem permissão para acessar esse sistema");
        AuthService.imperativelySendToLogout();
        return;
      }
      dispatch(storeUser(user));
    } catch (err) {
      console.log(err);
      return rejectWithValue({ ...(err as object) });
    }
  }
);

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    storeUser(state, action: PA<User.Detailed>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { storeUser, clearUser } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
