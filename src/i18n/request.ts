import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: {
      ...(await import(`../../messages/${locale}/common.json`)).default,
      ...(await import(`../../messages/${locale}/sidebar.json`)).default,
      ...(await import(`../../messages/${locale}/header.json`)).default,
      ...(await import(`../../messages/${locale}/hero.json`)).default,
      ...(await import(`../../messages/${locale}/auth.json`)).default,
      ...(await import(`../../messages/${locale}/categories.json`)).default,
      ...(await import(`../../messages/${locale}/newpost.json`)).default,
      ...(await import(`../../messages/${locale}/profile.json`)).default,
      ...(await import(`../../messages/${locale}/pricing.json`)).default,
      ...(await import(`../../messages/${locale}/search.json`)).default,
      ...(await import(`../../messages/${locale}/post.json`)).default,
      ...(await import(`../../messages/${locale}/footer.json`)).default,
      ...(await import(`../../messages/${locale}/chat.json`)).default,
      ...(await import(`../../messages/${locale}/buttons.json`)).default,
      ...(await import(`../../messages/${locale}/cards.json`)).default,
    },
  };
});
