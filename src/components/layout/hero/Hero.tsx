import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  return (
    <div className="w-full bg-linear-to-br from-blue-50 to-white rounded-3xl p-8 md:p-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8 shadow-sm border border-blue-100 overflow-hidden relative">
      <div className="flex flex-col items-center md:items-start gap-6 flex-1 text-center md:text-left z-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
            {t.rich("heading", {
              bold: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h1>
          <p className="text-lg text-gray-600 max-w-lg">{t("subheading")}</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
          <Link
            href="/new-post"
            className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5"
          >
            {t("start-selling")}
          </Link>
          <button
            onClick={() =>
              document
                .getElementById("posts-container")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-white text-gray-700 font-bold py-3 px-8 rounded-full border border-gray-200 hover:bg-gray-50 transition-all hover:border-gray-300"
          >
            {t("explore")}
          </button>
        </div>

        <div className="flex items-center gap-6 mt-2 opacity-80">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">10k+</span>
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
              {t("active-users")}
            </span>
          </div>
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">50k+</span>
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
              {t("items-listed")}
            </span>
          </div>
        </div>
      </div>

      <div className="hidden lg:block flex-1 relative w-full max-w-lg md:max-w-xl z-10">
        <img
          src="/hero.png"
          alt="Tager Marketplace"
          className="w-full h-auto object-contain drop-shadow-xl animate-in slide-in-from-right-4 fade-in duration-1000"
        />
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent skew-x-12 translate-x-1/4"></div>
    </div>
  );
}
