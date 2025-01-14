"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { FindPathResponse } from "@/app/types";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [path, setPath] = useState<FindPathResponse | undefined>();
  // distance

  const findPath = async () => {
    const response = await fetch("/api/find-path", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const res = await response.json();

    setPath(res);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={findPath}>Find Path</button>
        {JSON.stringify(path)}
      </main>
    </div>
  );
}
