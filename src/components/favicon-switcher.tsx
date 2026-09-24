"use client";

import { useEffect } from "react";

export function FaviconSwitcher() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const updateFavicon = (e: MediaQueryListEvent | MediaQueryList) => {
      const v = "3"; // Cache buster
      const newHref = e.matches ? `/icon-dark.png?v=${v}` : `/icon-light.png?v=${v}`;
      
      const links = document.querySelectorAll("link[rel~='icon']");
      if (links.length > 0) {
        links.forEach(link => {
          (link as HTMLLinkElement).href = newHref;
        });
      } else {
        const link = document.createElement("link");
        link.rel = "icon";
        link.href = newHref;
        document.head.appendChild(link);
      }
    };

    // Set initial
    updateFavicon(mediaQuery);

    // Listen for OS theme changes
    mediaQuery.addEventListener("change", updateFavicon);
    return () => mediaQuery.removeEventListener("change", updateFavicon);
  }, []);

  return null;
}
