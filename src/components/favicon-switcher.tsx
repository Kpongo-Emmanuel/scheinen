"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function FaviconSwitcher() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;

    // Find the existing favicon link or create a new one
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    
    // Update the href based on the current active theme
    link.href = resolvedTheme === "dark" ? "/icon-dark.png" : "/icon-light.png";
  }, [resolvedTheme]);

  return null;
}
