"use client";

// import { useEffect } from "react";
import { MoonStar, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  // useEffect(() => {
  //   // Initialize theme based on localStorage or default to dark
  //   const savedTheme = localStorage.getItem("theme") || "dark";
  //   setTheme(savedTheme);
  // }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
    // const newTheme: string = setTheme(newTheme);
    // localStorage.setItem("theme", newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="cursor-pointer"
    >
      {theme == "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <MoonStar className="h-5 w-5" />
      )}
    </Button>
  );
}
