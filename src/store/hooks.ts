import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

//useAppDispatch is used instead of useDispatch to work correctly with thunks and middleWare (It is better to chek out documentation if we are gonna need them)
//useAppSelector is the same as useSelector, but we don`t need to write additional types to state
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();