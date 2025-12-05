import Card from "@/components/ui/postCard/PostCard";
import Hero from "@/components/layout/hero/Hero";
import NavigationBar from "@/components/ui/navigation/NavigationBar";
import AddPostButton from "@/components/ui/buttons/AddPostButton";

export default function Home() {
  return (
    <div className="flex bg-bg flex-col gap-4 items-center">
      <AddPostButton />
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
