import NavigationButton from "../buttons/NavigationButton";

export default function NavigationBar({ pagesCount }: { pagesCount: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: pagesCount }).map((_, i) => (
        <NavigationButton key={i} number={++i} />
      ))}
    </div>
  );
}
