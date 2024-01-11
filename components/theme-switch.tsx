"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  // To avoid Hydration Mismatch - useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => setMounted(true), []);

  // To avoid layout shift - rendering placeholder image
  // more details here: https://web.dev/articles/cls
  if (!mounted) {
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        height={36}
        width={36}
        alt="Loading Light/Dark Toggle"
        priority={false}
      />
    );
  }

  if (resolvedTheme === "light") {
    return <Moon onClick={() => setTheme("dark")} />;
  }

  if (resolvedTheme === "dark") {
    return <Sun onClick={() => setTheme("light")} />;
  }
}
