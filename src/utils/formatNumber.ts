export const formatNumber = (
  number: number,
  locale: string,
  options?: Intl.NumberFormatOptions,
) => {
  return new Intl.NumberFormat(locale == "ar" ? "ar-EG" : "en-US").format(
    number,
  );
};
