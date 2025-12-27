import { MdAccessTime } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";
import { formatRelativeDate } from "@/utils/Date";
import { formatMoney, calcDiscountedCents } from "@/utils/money";
export default function PostCard() {
  return (
    <div className="flex md:flex-co gap-4 w-full max-h-50 md:in-h-95! md:mx-h-95! md:w64 bg-white border border-border rounded-md p-2 hover:scale-101 transition-all group duration-250">
      <div className="relative">
        <div className="img max-h-full! animate-pulse bg-gray-300 rounded-md size-36" />

        <div className="size-full absolute top-0 transition-opacity duration-250 rounded-md bg-black opacity-0 group-hover:opacity-20"></div>
      </div>
      <div className="flex flex-col min-h-full grow justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="title font-semibold w-74 h-3.5 bg-gray-300  rounded-md animate-pulse text-accent-green"></h3>
          <div className="flex flex-col gap-0.5">
            {Array.from({ length: 3 }).map((_: any, i) => (
              <h3
                key={i}
                className={`title font-semibold ${
                  i === 2 ? "w-50" : "w-60"
                } h-3 bg-gray-300  rounded-md animate-pulse text-accent-green`}
              ></h3>
            ))}
          </div>
        </div>

        <div className="flex  w-full items-end justify-between  py-2">
          <div className="flex gap-4 items-center">
            <div className="author flex items-center gap-1 ">
              <div className="author-img bg-gray-300 rounded-full animate-pulse size-6" />
              <div className="bg-gray-300 w-20 h-3 animate-pulse rounded-md"></div>
            </div>
            <div className="time flex text-sm font-light text-gray-500 items-center">
              <MdAccessTime size={18} className="animate-pulse" />
              <div className="bg-gray-300 w-20 h-3 animate-pulse rounded-md"></div>
            </div>
            <div className="category flex text-sm font-light text-gray-500 items-center">
              <TbCategory2 size={18} className="animate-pulse" />
              <div className="bg-gray-300 w-20 h-3 animate-pulse rounded-md"></div>
            </div>
          </div>
          <div className="bg-gray-300 w-12 h-3.5  animate-pulse rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
