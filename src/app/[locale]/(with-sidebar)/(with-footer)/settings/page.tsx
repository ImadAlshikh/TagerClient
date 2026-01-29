"use client";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaGlobe, FaBell } from "react-icons/fa";
import { use, useEffect, useState } from "react";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import { useRouter } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const t = useTranslations("settings");
  const [selectedLanguage, setSelectedLanguage] = useState<string>(locale);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!selectedLanguage) return;
    document.cookie = `NEXT_LOCALE=${selectedLanguage}; path=/; max-age=31536000`;
    router.replace(pathname, { locale: selectedLanguage });
  }, [selectedLanguage]);

  return (
    <ProtectedRoute>
      <div className="flex flex-col p-4 md:p-6 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link
              href={"/"}
              className="hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <FaArrowLeft
                size={20}
                className="hidden ltr:block text-gray-600"
              />{" "}
              <FaArrowRight
                size={20}
                className="hidden rtl:block text-gray-600"
              />
            </Link>
            <h1 className="font-bold text-text text-2xl">{t("page-title")}</h1>
          </div>
        </div>

        {/* Settings Content */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-border max-w-2xl">
          <div className="space-y-6">
            {/* Language Setting */}
            <div className="flex items-center justify-between pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaGlobe className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {t("language")}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {t("language-description")}
                  </p>
                </div>
              </div>
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="appearance-none w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-primary/20 focus:border-primary outline-none focus:ring-4 transition-all bg-white pr-10 text-gray-900 font-medium cursor-pointer"
                >
                  <option value="en">{t("english")}</option>
                  <option value="ar">{t("arabic")}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Notifications Setting */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FaBell className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {t("notifications")}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {t("notifications-description")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${
                  notificationsEnabled ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                    notificationsEnabled
                      ? "ltr:translate-x-7 rtl:-translate-x-7"
                      : "ltr:translate-x-1 rtl:-translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
