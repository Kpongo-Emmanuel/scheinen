"use client";

import { useEffect } from "react";

export function FaviconSwitcher() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const updateFavicon = (e: MediaQueryListEvent | MediaQueryList) => {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = e.matches ? "/icon-dark.png" : "/icon-light.png";
    };

    // Set initial
    updateFavicon(mediaQuery);

    // Listen for OS theme changes
    mediaQuery.addEventListener("change", updateFavicon);
    return () => mediaQuery.removeEventListener("change", updateFavicon);
  }, []);

  return null;
}
