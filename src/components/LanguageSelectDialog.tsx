"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Globe2 } from "lucide-react";

export default function LanguageSelectDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"en" | "ar" | null>(null);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("common.languageSelect");

  useEffect(() => {
    // Check if this is the first visit
    const firstOpen = localStorage.getItem("firstOpen");

    if (firstOpen === null) {
      // First visit - show the dialog
      setIsOpen(true);
    }
  }, []);

  const handleLanguageSelect = (selectedLocale: "en" | "ar") => {
    setSelectedLang(selectedLocale);

    // Small delay for animation
    setTimeout(() => {
      // Mark that the user has visited before
      localStorage.setItem("firstOpen", "false");

      // Close the dialog
      setIsOpen(false);

      // Redirect to the selected locale if different from current
      if (selectedLocale !== locale) {
        router.push("/", { locale: selectedLocale });
      }
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md bg-card-bg border-border p-0 overflow-hidden"
      >
        {/* Content */}
        <div className="p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-40" />
              <div className="relative bg-primary p-4 rounded-full">
                <Globe2 className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-3 text-text">
            {t("title")}
          </h2>

          {/* Description */}
          <p className="text-center text-gray-600 mb-8 text-sm">
            {t("description")}
          </p>

          {/* Language Selection Buttons */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleLanguageSelect("en")}
              className={`group relative overflow-hidden px-6 py-5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border-2 ${
                selectedLang === "en"
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                  : "bg-white border-border hover:border-primary/50 hover:bg-bg text-text"
              }`}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="relative flex items-center justify-center gap-3">
                <span className="text-3xl">🇬🇧</span>
                <span className="text-lg">{t("english")}</span>
              </div>
            </button>

            <button
              onClick={() => handleLanguageSelect("ar")}
              className={`group relative overflow-hidden px-6 py-5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border-2 ${
                selectedLang === "ar"
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                  : "bg-white border-border hover:border-primary/50 hover:bg-bg text-text"
              }`}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="relative flex items-center justify-center gap-3">
                <span className="text-3xl">🇸🇦</span>
                <span className="text-lg">{t("arabic")}</span>
              </div>
            </button>
          </div>

          {/* Footer decoration */}
          <div className="mt-8 flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-primary/70 animate-pulse delay-75" />
            <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse delay-150" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
