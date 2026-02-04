import { useEffect, useState } from "react";
import "./App.css";
import { Actions } from "./reducers/actions";
import { useDispatch } from "./reducers/store";
import Home from "./scenes/Home";
import GithubService from "./services/GithubService";
import React from "react";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setRepos = (payload: any) =>
    dispatch({ type: Actions.SetRepos, payload });

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setIsLoading(true);
        const repositories = await GithubService.getRepositories("theopsall");

        const nonForkedRepositories = repositories
          .filter((repository) => !repository.fork)
          .sort((a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );

        setRepos(nonForkedRepositories);
      } catch (err) {
        console.error("Failed to fetch repositories:", err);
        setError("Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  if (error) return <div className="error">{error}</div>;

  return <Home />;
};

export default App;
