import { PostType } from "@/utils/validator";
import Link from "next/link";

export default function Card({ post }: { post: PostType }) {
  return (
    <Link
      href={`/product/${post.id}`}
      className="flex md:flex-co gap-4 w-full max-h-50 md:in-h-95! md:mx-h-95! md:w64 bg-white border border-border rounded-md p-2 hover:scale-101 transition-all group duration-250"
    >
      <div className="relative">
        <img
          src={post?.picture ?? "./placeholder.svg"}
          className="img max-h-full! bg-border rounded-xs overflow-hidden aspect-square min-w-36! max-w-36"
        />
        {post.discount ? (
          <div className="absolute top-0  right-0 text-center bg-accent-green px-2 rounded-md text-sm text-white">
            {post?.discount}%
          </div>
        ) : null}

        <div className="w-full h-full absolute top-0 transition-opacity duration-250 rounded-xs bg-black opacity-0 group-hover:opacity-20"></div>
      </div>
      <div className="flex flex-col h-full grow justify-between">
        <div className="flex flex-col">
          {" "}
          <h3 className="title font-semibold text-accent-green">
            {post.title}
          </h3>
          <div className="description max-w-full wrap-break-word line-clamp-2">
            {post.description}
          </div>
        </div>

        <div className="flex  w-full items-end justify-between  py-2">
          <div className="author flex items-center gap-1 ">
            <img
              src={post.owner?.picture || "./userPlaceholder.svg"}
              className="author-img bg-border rounded-full aspect-square w-6"
            />
            <div className="text-sm font-light">
              {post.owner!.name!}{" "}
              {post.owner?.surname !== "null" && post.owner?.surname}
            </div>
          </div>
          <div className="price-contact flex flex-col items-end justify-batween">
            {post.discount ? (
              <>
                <div className="price text-gray-500 text-xs line-through">
                  {post.price}$
                </div>
                <div className="price text-primary font-bold">
                  {post.price * (1 - post?.discount! / 100) == 0
                    ? "Free"
                    : post.price * (1 - post?.discount! / 100) + "$"}
                </div>
              </>
            ) : (
              <div className="price text-primary font-bold">
                {post.price ? post.price + "$" : "Free"}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
