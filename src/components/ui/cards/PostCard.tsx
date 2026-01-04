import { PostType } from "@/utils/validator";
import Link from "next/link";
import { MdAccessTime } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";
import { formatRelativeDate } from "@/utils/Date";
import { formatMoney, calcDiscountedCents } from "@/utils/money";
export default function PostCard({
  post,
  isWide,
}: {
  post: PostType;
  isWide?: boolean;
}) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="flex gap-4 w-full max-h-50 bg-white border border-border rounded-md p-2 hover:scale-101 transition-all group duration-250"
    >
      <div className="relative min-w-36! size-36!">
        <img
          src={post?.picture?.secureUrl ?? "/postPlaceholder.svg"}
          className="img max-h-full! bg-border rounded-md overflow-hidden  size-36 object-cover"
        />
        {post.discount ? (
          <div className="absolute top-0  right-0 text-center bg-accent-green  px-2 rounded-md text-sm text-white">
            {post?.discount}%
          </div>
        ) : null}

        <div className="size-full absolute top-0 transition-opacity duration-250 rounded-md bg-black opacity-0 group-hover:opacity-20"></div>
      </div>
      <div className="flex flex-col min-h-full grow justify-between">
        <div className="flex flex-col">
          <h3 className="title font-medium text-accent-green">{post.title}</h3>
          <div className="description text-gray-500 max-w-full wrap-break-word line-clamp-2">
            {post.description}
          </div>
        </div>

        <div className="flex  w-full items-end justify-between  flex-wrap  py-2">
          <div className="flex gap-4 items-center">
            <div className="author flex items-center gap-1 flex-1">
              <img
                src={post.owner?.picture?.secureUrl || "./userPlaceholder.png"}
                className="author-img bg-border rounded-full aspect-square w-6"
              />
              <div className="text-sm font-light text-gray-500 text-nowrap truncate ">
                {post.owner!.name!}{" "}
                {post.owner?.surname !== "null" && post.owner?.surname}
              </div>
            </div>
            <div className="time flex text-sm font-light text-gray-500 items-center flex-1">
              <MdAccessTime size={18} />
              <span className="text-gray-500">
                {formatRelativeDate(post.created_at!)}
              </span>
            </div>
            <div
              className={`category ${
                isWide ? "flex" : "hidden"
              } text-sm font-light text-gray-500 items-center`}
            >
              <TbCategory2 size={18} />
              <span className="text-gray-500">{post.categoryName}</span>
            </div>
          </div>
          <div className="price flex flex-col items-end justify-batween place-self-end flex-1">
            {post.discount ? (
              <>
                <div className="price text-gray-500 text-xs line-through">
                  {formatMoney(post.price)}
                </div>
                <div className="price text-primary font-semibold">
                  {formatMoney(calcDiscountedCents(post.price, post.discount!))}
                </div>
              </>
            ) : (
              <div className="price text-primary font-semibold">
                {formatMoney(calcDiscountedCents(post.price, post.discount!))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
