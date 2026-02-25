import {
  useDispatch as _useDispatch,
} from "react-redux";
import { GithubModel } from "services/GithubService/dtos/GithubModel";

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
  const dispatch = _useDispatch();
  return (event: IAction) => {
    dispatch(event);
  };
};
