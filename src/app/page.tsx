import MobileCard from "@/components/ui/card/Card";
import Hero from "@/components/layout/hero/Hero";
import NavigationBar from "@/components/ui/navigation/NavigationBar";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Hero />
      <div className="w-full flex flex-wrap gap-1 justify-center ">
        {Array.from({ length: 20 }).map((l, i) => (
          <MobileCard key={i} />
        ))}
      </div>
      <NavigationBar pagesCount={5} />
    </div>
  );
}
