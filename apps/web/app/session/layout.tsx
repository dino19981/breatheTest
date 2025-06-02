import { SessionProvider } from "@/providers/session-provider";

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
