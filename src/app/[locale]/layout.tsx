import type { Metadata } from "next";
import Header from "@/components/layout/header/Header";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/providers/QueryProvider";
import UsePathChange from "@/hooks/usePathChange";
import { SocketProvider } from "@/providers/SocketProvider";
import { UseNotificationSocket } from "@/hooks/useNotificationSocket";
import NotificationProvider from "@/providers/NotificationProvider";
import { NextIntlClientProvider } from "next-intl";
import LanguageSelectDialog from "@/components/LanguageSelectDialog";
import "../globals.css";

export const metadata: Metadata = {
  title: "Tager",
  description: "Tager - Your Ultimate Marketplace for Buying and Selling",
  icons: "/favicon.ico",
};

const interFont = Inter({ variable: "--font-inter" });
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale} dir={locale == "ar" ? "rtl" : "ltr"} className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`w-full min-h-full flex flex-col overflow-x-hidden! max-w-full relative bg-bg ${interFont.className}`}
      >
        <NextIntlClientProvider>
          <LanguageSelectDialog />
          <UsePathChange />
          <SocketProvider>
            <QueryProvider>
              <UseNotificationSocket />
              <NotificationProvider />
              <Header />
              <main className={`mt-14 h-full`}>{children}</main>
            </QueryProvider>
          </SocketProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
