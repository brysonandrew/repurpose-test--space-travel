"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/wizard");
    }, 1200);

    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_60%)]">
      <div className="bg-glass w-full max-w-md px-10 py-12 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Intergalactic Travel Agency
        </h1>

        <p className="mt-3 text-sm text-zinc-400">
          Book your next off-world journey
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="text-xs text-zinc-500">
            Preparing your booking experience…
          </div>

          <button
            onClick={() => router.replace("/wizard")}
            className="text-sm underline underline-offset-4 hover:opacity-80"
          >
            Skip
          </button>
        </div>
      </div>
    </main>
  );
}
