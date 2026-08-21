import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Body, Footer, Screen } from "@/components/viveq/Shell";
import { Btn, Dot } from "@/components/viveq/ui";

export const Route = createFileRoute("/call")({
  head: () => ({
    meta: [
      { title: "Incoming Call — VIVEQ" },
      {
        name: "description",
        content: "Simulated incoming call from a claimed government authority.",
      },
      { property: "og:title", content: "Incoming Call — VIVEQ" },
      { property: "og:description", content: "Simulated incoming call in the VIVEQ prototype." },
    ],
  }),
  component: IncomingCall,
});

function IncomingCall() {
  const navigate = useNavigate();
  const [declined, setDeclined] = useState(false);

  if (declined) {
    return (
      <Screen>
        <Body className="flex flex-1 flex-col justify-center gap-7">
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <span className="flex size-16 items-center justify-center rounded-full border border-border bg-card text-[24px] text-muted-foreground">
                ✕
              </span>
            </div>
            <h1 className="font-display text-[28px] font-medium leading-[1.1] tracking-[-0.02em]">
              Call declined
            </h1>
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-[12px] text-muted-foreground">
              <Dot className="bg-low" />
              Risk assessed: LOW
            </div>
          </div>

          <p className="mx-auto max-w-[32ch] text-center text-[14px] leading-[1.6] text-muted-foreground">
            The simulated interaction ended before high-risk behaviour occurred.
          </p>
        </Body>
        <Footer>
          <Btn variant="primary" to="/">
            Return Home
          </Btn>
          <Btn variant="outline" to="/simulation">
            Run Simulation Again
          </Btn>
        </Footer>
      </Screen>
    );
  }

  return (
    <Screen>
      <div className="flex flex-1 flex-col justify-between px-5 py-10 animate-in-up">
        <div className="flex items-center justify-between">
          <span className="font-display text-[13px] tracking-[0.28em]">VIVEQ</span>
          <span className="rounded-full border border-caution/40 px-2.5 py-1 text-[10px] tracking-[0.14em] text-caution">
            CONTROLLED SIMULATION
          </span>
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <div className="relative flex size-24 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-border-strong animate-ring" />
            <div className="flex size-24 items-center justify-center rounded-full border border-border bg-card font-display text-[22px] text-muted-foreground">
              GA
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] tracking-[0.2em] text-subtle-foreground">INCOMING CALL</p>
            <h1 className="font-display text-[28px] font-medium tracking-[-0.01em]">
              Government Authority
            </h1>
            <p className="font-mono text-[13px] text-muted-foreground">Unknown number</p>
          </div>
        </div>

        <div className="flex items-end justify-between px-4">
          <button
            type="button"
            onClick={() => setDeclined(true)}
            className="flex flex-col items-center gap-2"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-critical text-[oklch(0.15_0.006_260)] transition-transform active:scale-95">
              ✕
            </span>
            <span className="text-[12px] text-muted-foreground">Decline</span>
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/analysis" })}
            className="flex flex-col items-center gap-2"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-low text-[oklch(0.15_0.006_260)] transition-transform active:scale-95">
              ✓
            </span>
            <span className="text-[12px] text-muted-foreground">Accept</span>
          </button>
        </div>
      </div>
    </Screen>
  );
}
