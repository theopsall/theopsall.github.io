import {
  useDispatch as _useDispatch,
} from "react-redux";
import type { Dispatch } from "redux";
import type { GithubModel } from "@/services/GithubService/dtos/GithubModel";

export interface IState {
  displayedScreen: string;
  repos: GithubModel[];
  darkMode: boolean;
}

export interface IAction {
  type: string;
  payload?: any;
}

export const useDispatch = () => {
  const dispatch = _useDispatch<Dispatch<IAction>>();
  return (event: IAction) => {
    dispatch(event);
  };
};
