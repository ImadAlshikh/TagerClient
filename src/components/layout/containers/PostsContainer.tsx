import { PostType } from "@/utils/validator";
import PostCard from "@/components/ui/cards/PostCard";
import NavigationBar from "@/components/ui/navigation/NavigationBar";

export default function PostsContainer({ posts }: { posts: PostType[] }) {
  const chunkSize: number = 9;
  const pagesCount: number = Math.ceil(posts.length / chunkSize);
  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      <div className="w-full flex flex-wrap gap-1">
        {posts.map((post: PostType) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
      <NavigationBar pagesCount={pagesCount} />
    </div>
  );
}
