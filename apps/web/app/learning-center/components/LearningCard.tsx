import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

interface LearningCardProps {
  title: string;
  description: string;
  content: string;
  linkHref: string;
  linkText: string;
}

export function LearningCard({
  title,
  description,
  content,
  linkHref,
  linkText,
}: LearningCardProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow justify-between">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {content}
        </p>
        <Button asChild className="w-full">
          <Link href={linkHref}>{linkText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
