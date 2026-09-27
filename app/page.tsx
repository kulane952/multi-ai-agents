"use client";
import { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox";
import ProductResults from "./components/ProductResults";
import type { ShoppingState } from "@/types/shopping";

export default function Home() {
  const [state, setState] = useState<ShoppingState | null>(null);
  const [query, setQuery] = useState("");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!query || !running) return;
    let stopped = false;
    const poll = async () => {
      try {
        const res = await fetch(`/api/search/latest?query=${encodeURIComponent(query)}`, { cache: "no-store" });
        const data = await res.json();
        if (stopped || !data.run) return;
        setState(data.run.state);
        if (["completed", "failed"].includes(data.run.status)) setRunning(false);
      } catch {}
    };
    poll();
    const timer = setInterval(poll, 2000);
    return () => { stopped = true; clearInterval(timer); };
  }, [query, running]);

  return <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white"><div className="mx-auto max-w-6xl px-6 py-16">
    <div className="mb-10"><p className="text-sm font-medium text-zinc-500">AI shopping research</p><h1 className="mt-2 text-4xl font-bold tracking-tight">Price Scout AI</h1><p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">Search products, analyze prices, check deal evidence, and compare options through a durable Inngest workflow.</p></div>
    <SearchBox onStarted={(q) => { setQuery(q); setRunning(true); }} />
    <p className="mt-3 text-sm text-zinc-500">Workflow monitor: <a className="underline" href="http://localhost:8288" target="_blank" rel="noreferrer">Inngest Dev Server</a></p>
    <div className="mt-10"><ProductResults state={state} /></div>
  </div></main>;
}
