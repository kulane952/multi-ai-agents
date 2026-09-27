"use client";
import { useState } from "react";

export default function SearchBox({ onStarted }: { onStarted: (query: string) => void }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const clean = query.trim();
    if (!clean) return;
    setLoading(true); setMessage("");
    try {
      const res = await fetch("/api/search", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: clean }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");
      setMessage("Workflow started. Waiting for agents...");
      onStarted(clean);
    } catch (err) { setMessage(err instanceof Error ? err.message : "Search failed"); }
    finally { setLoading(false); }
  }

  return <div>
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g. iPhone 16 Pro" className="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-white" />
      <button disabled={loading} className="rounded-xl bg-zinc-950 px-6 py-3 font-medium text-white disabled:opacity-50 dark:bg-white dark:text-zinc-950">{loading ? "Starting..." : "Search"}</button>
    </form>
    {message && <p className="mt-3 text-sm text-zinc-500">{message}</p>}
  </div>;
}
