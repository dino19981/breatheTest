import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

interface BreathingTechniqueCardProps {
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  benefits: string;
  pattern: string;
  href: string;
  variant?: "default" | "outline" | "secondary";
}

export function BreathingTechniqueCard({
  title,
  description,
  difficulty,
  benefits,
  pattern,
  href,
  variant = "default",
}: BreathingTechniqueCardProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          {description}
        </CardDescription>
        <Badge className="mt-2" variant={variant}>
          {difficulty}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col justify-between flex-grow">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{benefits}</p>
          <p className="text-sm mt-2 text-gray-900 dark:text-gray-100">
            {pattern}
          </p>
        </div>
        <Button asChild className="mt-4 w-full">
          <Link href={href}>Learn {title}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
