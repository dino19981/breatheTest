import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div>
          <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Oops! Page not found
          </h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Link href="/">
            <Button size="lg">Return Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
