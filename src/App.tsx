import { useEffect, useReducer } from "react";
import "./App.css";
import { Actions } from "./reducers/actions";
import { useDispatch } from "./reducers/store";
import Terminal from "./components/Terminal";
import GithubService from "./services/GithubService";
import React from "react";

interface FetchState {
  isLoading: boolean;
  error: string | null;
}

type FetchAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS' }
  | { type: 'FETCH_ERROR'; error: string };

function fetchReducer(state: FetchState, action: FetchAction): FetchState {
  switch (action.type) {
    case 'FETCH_START':
      return { isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { isLoading: false, error: null };
    case 'FETCH_ERROR':
      return { isLoading: false, error: action.error };
  }
}

const App: React.FC = () => {
  const reduxDispatch = useDispatch();
  const [state, dispatch] = useReducer(fetchReducer, { isLoading: true, error: null });

  useEffect(() => {
    const fetchRepositories = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const repositories = await GithubService.getRepositories("theopsall");

        const nonForkedRepositories = repositories
          .filter((repository) => !repository.fork)
          .sort((a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );

        reduxDispatch({ type: Actions.SetRepos, payload: nonForkedRepositories });
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        console.error("Failed to fetch repositories:", err);
        dispatch({ type: 'FETCH_ERROR', error: "Failed to load projects" });
      }
    };

    fetchRepositories();
  }, []);

  if (state.error) return <div className="error">{state.error}</div>;

  return <Terminal />;
};

export default App;
