import ContactButton from "@/components/ui/buttons/ContactButton";
import { MdAccessTime } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import TagNode from "@/components/ui/nodes/TagNode";
import { PostType } from "@/utils/validator";
import { notFound } from "next/navigation";
import axios from "axios";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  let post: PostType;
  const res = await axios.get(`http://localhost:3001/posts/${id}`, {
    withCredentials: true,
  });
  if (res.status !== 200) return notFound();
  post = res.data.data;
  return (
    <div className="p-4">
      <div className="bg-white p-4 gap-4 rounded-md flex flex-col items-center md:flex-row md:items-start">
        <div className="relative hover:scale-102 transition-all duration-250 w-full md:min-w-100 md:max-w-100 aspect-square">
          <img
            src={post.picture ?? "/postPlaceholder.svg"}
            className="rounded-md w-full md:min-w-100 md:max-w-100 aspect-square bg-border "
          />
          {post.discount ? (
            <div className="absolute top-0 right-0 text-center bg-accent-green px-2  rounded-md text-sm text-white">
              {post?.discount}%
            </div>
          ) : null}
        </div>
        <div className="flex flex-col w-full gap-3 px-2 md:px-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-accent-green font-bold text-lg">
                {post.title}
              </h2>
              <HiOutlineExclamationCircle
                className="cursor-pointer"
                size={22}
                strokeWidth={2}
              />
            </div>
            <h3 className="px-1 w-[70%]">{post.description}</h3>
          </div>

          <div className="flex justify-around items-center ">
            <div className="author flex items-center gap-1">
              <img
                src={post?.owner?.picture ?? ""}
                className="rounded-full bg-border w-6 aspect-square"
              />
              <div className="">
                {post?.owner?.name + " " + post?.owner?.surname}
              </div>
            </div>
            <div className="time flex items-center gap-1">
              <MdAccessTime size={22} />
              <span>5</span>
              minutes ago
            </div>
            <div className="price-contact flex flex-col items-end justify-batween">
              {post.discount ? (
                <>
                  <div className="price text-gray-500 text-xs line-through">
                    {post.price}$
                  </div>
                  <div className="price text-primary font-bold">
                    {post.price * (1 - post?.discount! / 100)}$
                  </div>
                </>
              ) : (
                <div className="price text-primary font-bold">
                  {post.price}$
                </div>
              )}
            </div>
          </div>
          <ContactButton id={id} ownerId={post.ownerId} />
          <div className="tags flex flex-col gap-2">
            <span className="font-bold">Tags</span>
            <div className="flex gap-1 px-2 flex-wrap">
              {post.tags?.map((word: string, index: number) => (
                <TagNode key={index} category={word} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
