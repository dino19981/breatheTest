"use client";

import { GlassBlock } from "@workspace/ui/components/glass-block";
import { X, Info } from "lucide-react";
import * as React from "react";
import InhaleIcon from "@/public/icons/InhaleIcon.svg";
import HoldIcon from "@/public/icons/HoldIcon.svg";
import ExhaleIcon from "@/public/icons/ExhaleIcon.svg";
import { protocols, ProtocolName } from "@/lib/session/hooks/useBreathTimer";
import { t } from "@lingui/core/macro";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@workspace/ui/components/carousel";
import { useSession } from "@/providers/session-provider";
import { SettingsMenu } from "@/app/components/settings-menu/settings-menu";

type PhaseKey = "inhale" | "exhale" | "hold" | "holdWithout";

const phaseIconMap: Record<PhaseKey, React.ElementType> = {
  inhale: InhaleIcon,
  exhale: ExhaleIcon,
  hold: HoldIcon,
  holdWithout: HoldIcon,
};

export function SessionHeaderMenu() {
  const {
    stopSession,
    isSessionActive,
    selectedProtocolName,
    setSelectedProtocolName,
    selectedProtocol,
  } = useSession();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [api, setApi] = React.useState<CarouselApi>();
  const phases = Object.entries(selectedProtocol).map(([label, value]) => ({
    label: label as PhaseKey,
    value,
    icon: phaseIconMap[label as PhaseKey] ?? HoldIcon,
  }));

  const width = 80 * phases.length + 32;
  const protocolNames = Object.keys(protocols) as ProtocolName[];

  React.useEffect(() => {
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

  return (
    <header className="flex flex-col items-center gap-0 md:gap-4">
      <div className="relative w-full flex justify-between gap-4">
        <GlassBlock className="min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center md:static md:mr-3">
          <button
            type="button"
            className="w-full h-full flex items-center justify-center rounded-full text-gray-500 dark:text-gray-300 hover:bg-white/5 dark:hover:bg-white/10 transition p-1.5"
            aria-label="Info"
          >
            <Info className="w-[18px] h-[18px]" />
          </button>
        </GlassBlock>

        <div className="relative flex items-center gap-4">
          {isSessionActive ? (
            <GlassBlock className="min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center md:static md:ml-3">
              <button
                onClick={stopSession}
                className="w-full h-full flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-white/5 dark:hover:bg-white/10 transition p-1.5"
                aria-label="Close"
              >
                <X className="w-[18px] h-[18px]" />
              </button>
            </GlassBlock>
          ) : (
            <SettingsMenu />
          )}

          {dropdownOpen && (
            <ul className="absolute z-10 mt-2 left-1/2 -translate-x-1/2 w-[200px] rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
              {protocolNames.map((name) => (
                <li key={name}>
                  <button
                    onClick={() => {
                      setSelectedProtocolName(name);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      selectedProtocolName === name
                        ? "bg-gray-100 dark:bg-gray-700 font-semibold"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Carousel
        className={`w-full max-w-[320px] md:max-w-[400px] ${isSessionActive ? "pointer-events-none opacity-50" : ""}`}
        opts={{
          loop: true,
          slidesToScroll: 1,
        }}
        setApi={setApi}
      >
        <CarouselContent className="gap-2">
          {protocolNames.map((name) => {
            const currentProtocol = protocols[name];
            const protocolPhases = Object.entries(currentProtocol).map(
              ([phase, duration]) => ({
                phase: phase as PhaseKey,
                duration,
                icon: phaseIconMap[phase as PhaseKey] ?? HoldIcon,
              }),
            );

            return (
              <CarouselItem key={name}>
                <div className="flex flex-col items-center gap-2">
                  <h3 className="text-lg font-semibold text-[#7A7A8C] dark:text-gray-300">
                    {name}
                  </h3>
                  <div className="flex items-center justify-center gap-4">
                    {protocolPhases.map(({ phase, duration, icon: Icon }) => (
                      <div
                        key={phase}
                        className="flex flex-col items-center min-w-[40px]"
                      >
                        <Icon className="h-8 w-8 text-[#7A7A8C] dark:text-gray-300" />
                        <span className="text-sm text-[#7A7A8C] dark:text-gray-400">
                          {duration / 1000}s
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious
          className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 dark:bg-gray-700/50 dark:hover:bg-gray-600/50 border-0 text-gray-600 dark:text-gray-300 ${isSessionActive ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
        />
        <CarouselNext
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 dark:bg-gray-700/50 dark:hover:bg-gray-600/50 border-0 text-gray-600 dark:text-gray-300 ${isSessionActive ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
        />
      </Carousel>

      <span className="sr-only" aria-live="polite">
        {t`Current breathing protocol loaded`}
      </span>
    </header>
  );
}
