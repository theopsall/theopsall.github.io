import React, { useEffect } from "react";
import { Actions } from "../../reducers/actions";
import { useDispatch, useSelector } from "../../reducers/store";
import { Button } from "../ui/button";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode);
  const setIsDarkMode = (payload: any) =>
    dispatch({ type: Actions.SetDarkMode, payload });
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={handleThemeChange}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-toggle-button"
    >
      {isDarkMode ? <FiSun /> : <FiMoon />}
    </Button>
  );
};

export default ThemeToggle;
