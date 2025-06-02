import { Fredoka } from "next/font/google";
import Script from "next/script";

import "@workspace/ui/globals.css";
import { Providers } from "@/providers/providers";
import { Header } from "@/components/header";
import { getSegmentSnippet } from "@/lib/segmentSnippet";
import { BackgroundWrapper } from "@/components/background-wrapper";
import ProtectedPage from "@/components/ProtectedPage";
import { SideNav } from "@/components/navigation/side-nav";
import { AnimatedRoute } from "@/components/animated-route";

const fontFredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-sans",
});

const segmentKey = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY!;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedPage>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${fontFredoka.variable} font-sans antialiased`}>
          <Script
            id="segment-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: getSegmentSnippet(segmentKey),
            }}
          />
          <Providers>
            <BackgroundWrapper>
              <SideNav>
                <AnimatedRoute>{children}</AnimatedRoute>
              </SideNav>
            </BackgroundWrapper>
          </Providers>
        </body>
      </html>
    </ProtectedPage>
  );
}
