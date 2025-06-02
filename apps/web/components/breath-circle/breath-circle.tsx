"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { t } from "@lingui/core/macro";
import { protocols, ProtocolName } from "@/lib/session/hooks/useBreathTimer";
import { type CarouselApi } from "@workspace/ui/components/carousel";
import { DotsSvg } from "./circle-dots";
import {
  useNormalizedPrediction,
  phaseLabel,
  getLabel,
  outerCircleSizeDesktop,
  baseInnerSize,
  mapPhaseToPrediction,
} from "./utils";
import AnimatedDots from "./animated-dots";
import { PhaseIndicatorCircle } from "./phase-indicator-circle";
import { MovingIndicatorCircle } from "./moving-indicator-circle";
import { useSession } from "@/providers/session-provider";

const showCircleAnimation = false;

export function BreathCircle() {
  const {
    phase,
    currentPhaseDuration: duration,
    active,
    countdown,
    prediction,
    predictionIdx,
    setSelectedProtocolName,
    triggerSessionStart,
    socketEnabled,
    socketStatus,
  } = useSession();

  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState<number | null>(null);
  const [phaseProgress, setPhaseProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const protocolNames = Object.keys(protocols) as ProtocolName[];

  const isStart = !active || !phase;

  const prevPhase = useRef<"inhale" | "exhale" | null>(null);
  useEffect(() => {
    if (phase === "inhale" || phase === "exhale") prevPhase.current = phase;
  }, [phase]);

  useEffect(() => {
    if (!active || !phase) {
      setPhaseSecondsLeft(null);
      setPhaseProgress(0);
      return;
    }

    const start = performance.now();
    let rafId: number;

    const update = () => {
      const now = performance.now();
      const elapsed = now - start;
      const remaining = Math.max(duration - elapsed, 0);
      const secondsLeft = Math.ceil(remaining / 1000);
      const progress = Math.min(elapsed / duration, 1);

      setPhaseSecondsLeft(secondsLeft);
      setPhaseProgress(progress);

      if (remaining > 0 || progress < 1) {
        rafId = requestAnimationFrame(update);
      }
    };

    update();

    return () => cancelAnimationFrame(rafId);
  }, [phase, active, duration]);

  const isExpandedHold =
    phase?.startsWith("hold") && prevPhase.current === "inhale";

  const showDots = phase === "inhale" || phase === "exhale" || isExpandedHold;
  const dotsOpacity = phase === "inhale" || phase === "exhale" ? 0.22 : 0.12;

  const maskAnimClass = useMemo(() => {
    if (!active) return "";
    if (phase === "inhale") return "mask-open";
    if (phase === "exhale") return "mask-close";
    return prevPhase.current === "inhale" ? "mask-open-end" : "mask-close-end";
  }, [active, phase]);

  const outerCircleSizeMobile = 300;

  const outerCircleSize =
    typeof window !== "undefined" && window.innerWidth < 768
      ? outerCircleSizeMobile
      : outerCircleSizeDesktop;

  const scale = useMemo(() => {
    if (!active) return 1;
    switch (phase) {
      case "inhale":
        return outerCircleSize / baseInnerSize;
      case "exhale":
        return 1;
      case "hold":
      case "holdWithout":
        return prevPhase.current === "inhale"
          ? outerCircleSize / baseInnerSize
          : 1;
      default:
        return 1;
    }
  }, [active, phase]);

  const label = useMemo(() => {
    if (countdown !== null && countdown !== undefined) {
      return countdown.toString();
    }
    return isStart ? t`Start` : phaseLabel(phase);
  }, [countdown, isStart, phase]);

  useEffect(() => {
    if (api) {
      api.on("select", () => {
        const index = api.selectedScrollSnap();
        const selectedProtocol = protocolNames[index];
        if (selectedProtocol) {
          setSelectedProtocolName(selectedProtocol);
        }
      });
    }
  }, [api, protocolNames, setSelectedProtocolName]);

  const normalizedPrediction = useNormalizedPrediction(
    phase,
    prediction!,
    predictionIdx!,
  );
  const isLiveCorrect =
    phase && normalizedPrediction === mapPhaseToPrediction[phase];

  return (
    <div className={`relative w-[300px] h-[300px] md:w-[366px] md:h-[366px]`}>
      <div className="w-full h-full" ref={containerRef}>
        <div
          className={`absolute w-[300px] h-[300px] md:w-[366px] md:h-[366px] rounded-full bg-gradient-to-b from-white/60 via-white/30 to-white/10 backdrop-blur-[70px] border border-white/20 shadow-inner dark:from-white/20 dark:via-white/10 dark:to-white/5 dark:border-white/10 ${!active ? "hidden md:block" : "block"}`}
        />

        {/* Phase indicator circles */}
        {active && showCircleAnimation && (
          <div className="absolute inset-0 z-50 pointer-events-none">
            {[0, 90, 180, 270].map((angle) => (
              <PhaseIndicatorCircle key={angle} angle={angle} />
            ))}
          </div>
        )}

        {/* Moving phase indicator */}
        {active && phase && showCircleAnimation && (
          <MovingIndicatorCircle
            active={active}
            phase={phase}
            phaseProgress={phaseProgress}
          />
        )}

        {!active && (
          <div className="absolute inset-0">
            <div
              className={`dots-field ${
                !active
                  ? "dots-field-start"
                  : phase === "inhale"
                    ? "dots-field-expand"
                    : phase === "exhale"
                      ? "dots-field-collapse"
                      : prevPhase.current === "inhale"
                        ? "dots-field-expand"
                        : "dots-field-collapse"
              }`}
              style={{ "--phase-dur": `${duration}ms` } as React.CSSProperties}
            >
              <AnimatedDots />
            </div>
          </div>
        )}

        <div
          className="absolute top-1/2 left-1/2 origin-center rounded-full overflow-hidden transition-transform"
          style={
            {
              width: baseInnerSize,
              height: baseInnerSize,
              transform: `translate(-50%,-50%) scale(${scale})`,
              transition: `transform ${duration}ms ease-in-out, background 500ms ease-out, box-shadow 500ms ease-out`,
              background: isStart ? "#FBFFFE" : "#1A1A1F",
              boxShadow: isStart
                ? "0 16px 56px rgba(255,255,255,0.8), 0 40px 160px rgba(155,155,155,0.6)"
                : "0 16px 56px rgba(0,0,0,0.6), 0 40px 160px rgba(0,0,0,0.4)",
            } as React.CSSProperties & {
              "--phase-dur": string;
            }
          }
        >
          {showDots && (
            <div className="absolute inset-0">
              <div
                className={`dots-field ${
                  !active
                    ? "dots-field-start"
                    : phase === "inhale"
                      ? "dots-field-expand"
                      : phase === "exhale"
                        ? "dots-field-collapse"
                        : prevPhase.current === "inhale"
                          ? "dots-field-expand"
                          : "dots-field-collapse"
                }`}
                style={
                  { "--phase-dur": `${duration}ms` } as React.CSSProperties
                }
              >
                <DotsSvg opacity={dotsOpacity} />
              </div>

              <div
                className={`breath-mask ${
                  phase === "inhale"
                    ? "animate-mask-open"
                    : phase === "exhale"
                      ? "animate-mask-close"
                      : prevPhase.current === "inhale"
                        ? "mask-open-end"
                        : "mask-close-end"
                }`}
                style={
                  { "--phase-dur": `${duration}ms` } as React.CSSProperties
                }
              />
            </div>
          )}

          <div
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform duration-150 z-10"
            onClick={(e) => {
              e.stopPropagation();
              if (triggerSessionStart) {
                triggerSessionStart();
              }
            }}
            style={{ pointerEvents: "auto" }}
          >
            {phaseSecondsLeft !== null && (
              <span className="text-[14px] text-white/70 leading-none mb-1">
                {phaseSecondsLeft}s
              </span>
            )}
            <span
              className={`text-[28px] font-bold tracking-wide ${
                isStart ? "text-[#525263]" : "text-white"
              }`}
            >
              {label}
            </span>

            {socketEnabled &&
              socketStatus === "Connected" &&
              normalizedPrediction !== null &&
              prediction !== undefined && (
                <span
                  className={`text-[10px] ${isLiveCorrect ? "text-green-500" : "text-red-500"}`}
                >
                  AI: {getLabel(normalizedPrediction)} ({normalizedPrediction})
                </span>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
