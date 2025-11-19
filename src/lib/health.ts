export type HealthResponse = {
  ok: boolean;
  db: boolean;
};

export async function getHealth(): Promise<HealthResponse> {
  const res = await fetch("/api/health", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Health check failed");
  }

  return res.json();
}
