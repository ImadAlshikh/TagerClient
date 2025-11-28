import Card from "@/components/ui/postCard/PostCard";
import Hero from "@/components/layout/hero/Hero";
import NavigationBar from "@/components/ui/navigation/NavigationBar";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Hero />
      <div className="w-full flex flex-wrap gap-1 justify-center ">
        {Array.from({ length: 20 }).map((l, i) => (
          <Card key={i} />
        ))}
      </div>
      <NavigationBar pagesCount={5} />
    </div>
  );
}
