export function isDarkThemeActive(): boolean {
  return (
    localStorage.getItem("theme") === "dark" ||
    (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
}
