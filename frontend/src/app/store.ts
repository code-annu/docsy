import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/state/auth-slice";
import profileReducer from "../features/profile/state/profile-slice";
import documentReducer from "../features/documents/state/document-slice";
import collaborationReducer from "../features/collaborations/state/collaboroation-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    document: documentReducer,
    collaboration: collaborationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
