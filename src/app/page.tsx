"use client";
import Card from "@/components/ui/postCard/PostCard";
import Hero from "@/components/layout/hero/Hero";
import NavigationBar from "@/components/ui/navigation/NavigationBar";
import AddPostButton from "@/components/ui/buttons/AddPostButton";
import { usePosts } from "@/cache/usePosts";

export default function Home() {
  const { data, isLoading, isFetching } = usePosts();

  console.log(data);
  return (
    <div className="flex bg-bg flex-col gap-4 items-center">
      <AddPostButton />
      <Hero />
      {isLoading ? (
        <div className="text-primary w-full h-full font-bold text-2xl grid place-content-center">
          Loading...{" "}
        </div>
      ) : (
        <div className="w-full flex flex-wrap gap-1 justify-center ">
          {data?.data?.data.map((a: any, i: any) => (
            <Card key={i} />
          ))}
        </div>
      )}

      <NavigationBar pagesCount={5} />
    </div>
  );
}
