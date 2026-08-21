import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Body, Footer, Screen, TopBar } from "@/components/viveq/Shell";
import { Btn, Card, Label } from "@/components/viveq/ui";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report Incident — VIVEQ" },
      {
        name: "description",
        content: "Review the simulated incident summary and choose whether to share evidence.",
      },
      { property: "og:title", content: "Report Incident — VIVEQ" },
      { property: "og:description", content: "Consent-based incident reporting in VIVEQ." },
    ],
  }),
  component: Report,
});

const indicators = [
  "Government impersonation",
  "Criminal allegation",
  "Digital confinement",
  "Social isolation",
  "Financial demand",
];

const willShare = [
  "Incident type",
  "Risk score",
  "Detected indicators",
  "Timestamp",
];

const willNotShare = [
  "Raw audio",
  "Raw video",
  "OTPs / passwords / banking credentials",
];

type Stage = "summary" | "preview" | "confirm" | "shared";

function Report() {
  const [stage, setStage] = useState<Stage>("summary");

  return (
    <Screen>
      <TopBar title="REPORT" back="/warning" />
      <Body className="space-y-7">
        {stage === "summary" && (
          <>
            <h1 className="font-display text-[30px] font-medium leading-[1.15] tracking-[-0.02em]">
              Report Incident
            </h1>

            <Card className="space-y-3">
              {[
                ["Incident type", "Digital-arrest scam"],
                ["Risk", "94 / 100 — CRITICAL"],
                ["Timestamp", "2026-08-21 09:41 IST (simulated)"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-4 text-[14px]">
                  <span className="text-subtle-foreground">{k}</span>
                  <span className="text-right font-medium">{v}</span>
                </div>
              ))}
            </Card>

            <div>
              <Label className="mb-2">Detected indicators</Label>
              <div className="flex flex-wrap gap-2">
                {indicators.map((d) => (
                  <span
                    key={d}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-[12px] text-muted-foreground"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <Card className="bg-surface/40">
              <p className="text-[13px] leading-[1.6] text-muted-foreground">
                Evidence sharing requires your consent. Nothing is shared unless you explicitly choose
                to share it. This is a simulated report — no data is transmitted.
              </p>
            </Card>
          </>
        )}

        {stage === "preview" && (
          <>
            <h1 className="font-display text-[24px] font-medium leading-[1.2] tracking-[-0.02em]">
              What will be shared
            </h1>

            <div>
              <Label className="mb-2">Will be shared</Label>
              <div className="space-y-2">
                {willShare.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-[12px] text-low">✓</span>
                    <span className="text-[14px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-2">Will not be shared</Label>
              <div className="space-y-2">
                {willNotShare.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-[12px] text-subtle-foreground">✕</span>
                    <span className="text-[14px] text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-surface/40">
              <p className="text-[13px] leading-[1.6] text-muted-foreground">
                Nothing is shared unless you explicitly choose to share it.
              </p>
            </Card>
          </>
        )}

        {stage === "confirm" && (
          <>
            <h1 className="font-display text-[24px] font-medium leading-[1.2] tracking-[-0.02em]">
              Share incident?
            </h1>
            <p className="text-[14px] leading-[1.6] text-muted-foreground">
              You are about to share the incident summary, risk score, detected indicators and
              timestamp. This is simulated — no data is transmitted.
            </p>
          </>
        )}

        {stage === "shared" && (
          <div className="flex flex-1 flex-col justify-center gap-4">
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <span className="flex size-16 items-center justify-center rounded-full border border-low/40 bg-low/10 text-[24px] text-low">
                  ✓
                </span>
              </div>
              <h1 className="font-display text-[28px] font-medium leading-[1.1] tracking-[-0.02em]">
                Incident shared
              </h1>
              <p className="text-[13px] text-muted-foreground">(simulated)</p>
            </div>
            <p className="mx-auto max-w-[32ch] text-center text-[14px] leading-[1.6] text-muted-foreground">
              You remain in control of this evidence.
            </p>
          </div>
        )}
      </Body>

      <Footer>
        {stage === "summary" && (
          <>
            <Btn variant="primary" onClick={() => setStage("preview")}>
              Review &amp; Share
            </Btn>
            <Btn variant="outline" to="/warning">
              Not Now
            </Btn>
          </>
        )}
        {stage === "preview" && (
          <>
            <Btn variant="primary" onClick={() => setStage("confirm")}>
              Continue
            </Btn>
            <Btn variant="outline" to="/warning">
              Not Now
            </Btn>
          </>
        )}
        {stage === "confirm" && (
          <>
            <Btn variant="primary" onClick={() => setStage("shared")}>
              Share Incident
            </Btn>
            <Btn variant="outline" onClick={() => setStage("preview")}>
              Go Back
            </Btn>
          </>
        )}
        {stage === "shared" && (
          <>
            <Btn variant="primary" to="/">
              Return Home
            </Btn>
            <Btn variant="outline" to="/warning">
              Back to Warning
            </Btn>
          </>
        )}
      </Footer>
    </Screen>
  );
}
