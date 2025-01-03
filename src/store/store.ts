import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/theme';
// import modalReducer from './slices/stateModal';
// import userInfoReducer from './slices/useUserInfoStore';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    // stateModal: modalReducer,  
    // userInfo: userInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
