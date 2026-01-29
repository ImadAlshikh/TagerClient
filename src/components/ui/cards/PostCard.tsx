import { PostType } from "@/utils/validator";
import Link from "next/link";
import { MdAccessTime } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";
import { formatRelativeDate } from "@/utils/Date";
import { formatMoney, calcDiscountedCents } from "@/utils/money";
import { useTranslations } from "next-intl";

export default function PostCard({
  post,
  isWide,
}: {
  post: PostType;
  isWide?: boolean;
}) {
  const t = useTranslations("cards");
  console.log(post);
  return (
    <Link
      href={`/post/${post.id}`}
      className={`flex gap-4 w-full max-h-50 ${post?.promoted ? "bg-linear-to-r from-[rgba(37,99,235,0.08)] to-white" : "bg-white"} border border-border rounded-md p-2 hover:scale-101 transition-all group duration-250`}
    >
      <div className="relative size-36!">
        <img
          src={post?.picture?.secureUrl ?? "/postPlaceholder.svg"}
          className="img bg-white rounded-md overflow-hidden size-36 object-cover"
        />
        {post.discount ? (
          <div className="absolute top-0  right-0 text-center bg-accent-green  px-2 rounded-md text-sm text-white">
            +{post?.discount}%
          </div>
        ) : null}
        {post.promoted ? (
          <div className="absolute bottom-0  right-0 text-center bg-yellow-500  px-2 rounded-md text-sm text-white">
            {t("premium")}
          </div>
        ) : null}

        <div className="size-full absolute top-0 transition-opacity duration-250 rounded-md bg-black opacity-0 group-hover:opacity-20"></div>
      </div>
      <div className="flex flex-col min-h-full grow justify-between">
        <div className="flex flex-col">
          <h3 className="title font-medium text-accent-green">{post.title}</h3>
          <div className="description text-gray max-w-full wrap-break-word line-clamp-2">
            {post.description}
          </div>
        </div>

        <div className="flex  w-full items-end justify-between  flex-wrap  py-2 gap-y-2">
          <div className="flex gap-2 items-center flex-wrap mr-auto">
            <div className="author flex items-center gap-1 max-w-[150px]">
              <img
                src={post.owner?.picture?.secureUrl || "./userPlaceholder.png"}
                className="author-img bg-border shrink-0 rounded-full aspect-square w-6"
              />
              <div className="text-sm font-light text-gray truncate">
                {post.owner!.name!}{" "}
                {post.owner?.surname !== "null" && post.owner?.surname}
              </div>
            </div>
            <div className="time flex text-sm font-light text-gray items-center shrink-0">
              <MdAccessTime size={18} className="mr-1" />
              <span className="text-gray text-xs">
                {formatRelativeDate(post.created_at!)}
              </span>
            </div>
            <div
              className={`category ${
                isWide ? "flex" : "hidden"
              } text-sm font-light text-gray items-center shrink-0`}
            >
              <TbCategory2 size={18} className="mr-1" />
              <span className="text-gray">{post.categoryName}</span>
            </div>
          </div>
          <div className="price flex flex-col items-end justify-batween place-self-end flex-1">
            {post.discount ? (
              <>
                <div className="price text-gray text-xs line-through">
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
