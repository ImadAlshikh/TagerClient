import ContactButton from "@/components/ui/buttons/ContactButton";
import { MdAccessTime } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";
import { PostType } from "@/utils/validator";
import { notFound } from "next/navigation";
import TagNode from "@/components/ui/nodes/TagNode";
import ReportButton from "@/components/ui/buttons/ReportButton";
import { formatRelativeDate } from "@/utils/Date";
import { calcDiscountedCents, formatMoney } from "@/utils/money";
import RelatedPosts from "@/components/RelatedPosts";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3001/posts/${id}`, {
    next: { revalidate: 120, tags: [`post-${id}`] },
    credentials: "include",
  }).then((res) => res.json());
  if (!res?.success) return notFound();
  const post: PostType = res.data;

  return (
    <div className="p-4">
      <div className="bg-white p-4 gap-4 rounded-md flex flex-col items-center md:flex-row md:items-start">
        <div className="relative bg-white hover:scale-102 transition-all duration-250 md:size-60 aspect-square">
          <img
            src={post.picture?.secureUrl ?? "/postPlaceholder.svg"}
            className="rounded-md bg-white aspect-square bg-border "
          />
          {post.discount ? (
            <div className="absolute top-0 right-0 text-center bg-accent-green px-2  rounded-md text-sm text-white">
              +{post?.discount}%
            </div>
          ) : null}
        </div>
        <div className="flex flex-col w-full gap-3 px-2 md:px-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-accent-green font-medium text-lg">
                {post.title}
              </h2>
              <ReportButton reportedId={post?.id} />
            </div>
            <h3 className="px-1 w-[70%] text-gray">{post.description}</h3>
          </div>

          <div className="flex justify-end   items-center flex-wrap">
            <div className="author flex items-center gap-1 flex-1">
              <img
                src={post?.owner?.picture?.secureUrl || "/userPlaceholder.png"}
                className="rounded-full bg-border w-6 aspect-square"
              />
              <div className="text-gray">
                {post?.owner?.name}
                {post?.owner?.surname ? ` ${post.owner.surname}` : ""}
              </div>
            </div>
            <div className="time flex text-gray items-center gap-1 flex-1">
              <MdAccessTime size={20} />
              <span className="text-gray text-nowrap">
                {formatRelativeDate(post.created_at!)}
              </span>
            </div>
            <div className="time flex items-center text-gray gap-1 flex-1">
              <TbCategory2 size={20} />
              <span className="text-inherit">{post.categoryName}</span>
            </div>
            <div className="price-contact flex flex-col items-end justify-batween">
              {post.discount ? (
                <>
                  <div className="price text-accent-green text-xs">
                    {post.discount}%
                  </div>
                  <div className="price text-gray text-xs line-through">
                    {formatMoney(post.price)}
                  </div>
                  <div className="price text-primary font-semibold">
                    {formatMoney(
                      calcDiscountedCents(post.price, post.discount!)
                    )}
                  </div>
                </>
              ) : (
                <div className="price text-primary font-semibold">
                  {formatMoney(calcDiscountedCents(post.price, post.discount!))}
                </div>
              )}
            </div>
          </div>
          <ContactButton id={id} ownerId={post.ownerId} />

          <div className="tags flex flex-col gap-2">
            <span className="font-semibold">Tags</span>
            <div className="flex gap-1 px-2 flex-wrap">
              {post.tags?.map((word: string, index: number) =>
                word.length ? <TagNode key={index} category={word} /> : null
              )}
            </div>
          </div>
        </div>
      </div>
      <RelatedPosts
        category={post.categoryName || ""}
        currentPostId={post.id!}
      />
    </div>
  );
}
