"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function FaviconSwitcher() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;

    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    
    // resolvedTheme "dark" = website is dark. We use the white icon (icon-dark.png).
    // resolvedTheme "light" = website is light. We use the black icon (icon-light.png).
    link.href = resolvedTheme === "dark" ? "/icon-dark.png" : "/icon-light.png";
  }, [resolvedTheme]);

  return null;
}
