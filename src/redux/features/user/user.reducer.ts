import { createAction, createReducer } from "@reduxjs/toolkit";
import { User } from "types/user.type";

interface UserState {
  userInfo: User;
}

const initialState = {
  userInfo: {},
};

export const setUserInfo = createAction<User>("user/setUserInfo");

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUserInfo, (state, action) => {
    state.userInfo = action.payload;
  });
});

export default userReducer;
