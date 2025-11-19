"use client";

import { useEffect, useState } from "react";
import { getHealth, type HealthResponse } from "@/lib/apiClient";

type Status = "idle" | "loading" | "ok" | "error";

export default function HomePage() {
  const [status, setStatus] = useState<Status>("idle");
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setStatus("loading");
      setError(null);

      try {
        const result = await getHealth();
        setHealth(result);
        setStatus(result.ok ? "ok" : "error");
      } catch (err) {
        console.error(err);
        setError("Kunde inte nå backend.");
        setStatus("error");
      }
    };

    run();
  }, []);

  const statusText = (() => {
    switch (status) {
      case "idle":
        return "Väntar på status…";
      case "loading":
        return "Kontrollerar backend och databas…";
      case "ok":
        return "Allt ser bra ut! Backend och databas svarar.";
      case "error":
        return "Något strular med backend eller databasen.";
      default:
        return "";
    }
  })();

  return (
    <div className="w-full max-w-xl rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 shadow-xl">
      <h1 className="text-2xl font-semibold mb-2">Guld – app-skelett</h1>
      <p className="text-sm text-neutral-400 mb-6">
        Robust grund med frontend, backend, API-lager och databasstöd.
      </p>

      <div className="mb-4">
        <p className="text-base">{statusText}</p>
        {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3">
          <p className="font-medium mb-1">Frontend</p>
          <p className="text-neutral-400">
            Den här sidan är byggd i <strong>Next.js (App Router)</strong>.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3">
          <p className="font-medium mb-1">Backend</p>
          <p className="text-neutral-400">
            Endpointen <code className="text-xs">/api/health</code> testas vid
            sidladdning.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3">
          <p className="font-medium mb-1">API-lager</p>
          <p className="text-neutral-400">
            Frontend pratar med backend via{" "}
            <code className="text-xs">getHealth()</code> i{" "}
            <code className="text-xs">src/lib/apiClient.ts</code>.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3">
          <p className="font-medium mb-1">Databas</p>
          <p className="text-neutral-400">
            Prisma är konfigurerat i{" "}
            <code className="text-xs">prisma/schema.prisma</code> och{" "}
            <code className="text-xs">src/lib/db.ts</code>.
          </p>
        </div>
      </div>

      {health && (
        <div className="mt-6 text-xs text-neutral-500">
          <p>
            <span className="font-semibold">Rådata:</span>{" "}
            <code>{JSON.stringify(health)}</code>
          </p>
        </div>
      )}
    </div>
  );
}
