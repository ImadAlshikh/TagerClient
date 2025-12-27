import NavigationButton from "../buttons/NavigationButton";

export default function NavigationBar({
  postsCount,
  limit,
}: {
  postsCount: number;
  limit: number;
}) {
  const pagesCount = Math.ceil(postsCount / limit);
  return (
    <div className="flex gap-1">
      {Array.from({ length: pagesCount }).map((_, i) => (
        <NavigationButton key={i} number={++i} />
      ))}
    </div>
  );
}
