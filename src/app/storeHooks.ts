import { useDispatch, useSelector as rawUseSelector, type TypedUseSelectorHook } from "react-redux";
import store from "./store";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
