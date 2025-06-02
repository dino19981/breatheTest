"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
} from "@workspace/ui/components/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Slash } from "lucide-react";

const breadcrumbMap: Record<string, string> = {
  techniques: "Breathing Techniques",
  protocols: "Health Protocols",
  benefits: "Health Benefits",
  research: "Research & History",
  "box-breathing": "Box Breathing",
  "4-7-8-breathing": "4-7-8 Breathing",
  "wim-hof": "Wim Hof Method",
  "7-11-breathing": "7-11 Breathing",
  "extended-exhale": "Extended Exhale",
  "breathing-recovery": "Breathing Recovery Exercise",
  "rhythmic-running": "Rhythmic Running Breath",
  "nasal-athletic": "Nasal Breathing for Athletes",
  "energizing-breath": "Energizing Breath",
  "bellows-breath": "Bellows Breath",
  "counting-breath": "Counting Breath Meditation",
  diaphragmatic: "Diaphragmatic Breathing",
  "control-pause": "Control Pause Test",
  "co2-tolerance": "CO₂ Tolerance Training",
  morning: "Morning Protocol",
  sleep: "Sleep Protocol",
  stress: "Stress Relief Protocol",
};

export function LearningBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Remove "learning-center" from segments if it exists
  const relevantSegments = segments.filter(
    (segment) => segment !== "learning-center",
  );

  return (
    <Breadcrumb className="flex items-center space-x-2 text-sm">
      <BreadcrumbItem>
        <Link href="/learning-center" className="hover:text-primary">
          Learning Center
        </Link>
      </BreadcrumbItem>
      {relevantSegments.map((segment, index) => {
        const href = `/learning-center/${relevantSegments
          .slice(0, index + 1)
          .join("/")}`;
        const label = breadcrumbMap[segment] || segment;

        return (
          <BreadcrumbItem key={segment} className="flex items-center">
            <Slash className="w-4 h-4 mx-2 text-muted-foreground" />
            <Link href={href} className="hover:text-primary">
              {label}
            </Link>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
