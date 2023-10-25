"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { updateThemeAppearanceClass, useThemeContext } from "@radix-ui/themes";

export default function ThemeToggle() {
  const themeContext = useThemeContext();
  return (
    <>
      {themeContext.appearance === "dark" ? (
        <MoonIcon
          height={24}
          width={24}
          className=" cursor-pointer"
          onClick={() => {
            updateThemeAppearanceClass("light");
            themeContext.onAppearanceChange("light");
          }}
        />
      ) : (
        <SunIcon
          height={24}
          width={24}
          className=" cursor-pointer"
          onClick={() => {
            updateThemeAppearanceClass("dark");
            themeContext.onAppearanceChange("dark");
          }}
        />
      )}
    </>
  );
}
