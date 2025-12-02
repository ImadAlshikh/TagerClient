import ContactButton from "@/components/ui/buttons/ContactButton";
import { MdAccessTime } from "react-icons/md";
import KeywordNode from "@/components/ui/nodes/KeywordNode";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div>
      <div className="bg-white p-4 gap-4 rounded-md flex flex-col items-center md:flex-row md:items-start">
        <div className="rounded-md w-full md:w-150 aspect-square bg-border " />
        <div className="flex flex-col gap-3 px-2 md:px-10">
          <h2 className="text-accent-green font-bold text-lg">
            Lorem ipsum dolor, sit amet consectetur adipisicing.
          </h2>
          <h3 className="px-1 w-[70%]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora,
            suscipit minus aut deserunt dolorum fuga eligendi non dignissimos
            perspiciatis explicabo praesentium! Minus repudiandae quia
            architecto.
          </h3>
          <div className="flex justify-around items-center ">
            <div className="author flex items-center gap-1">
              <div className="rounded-full bg-border w-6 aspect-square" />
              <div className="">Imad Alshikh</div>
            </div>
            <div className="time flex items-center gap-1">
              <MdAccessTime size={22} />
              <span>5</span>
              minutes ago
            </div>
            <div className="price text-primary text-lg font-bold">168$</div>
          </div>
          <ContactButton />
          <div className="keywords flex flex-col gap-2">
            <span className="font-bold">Keywords</span>
            <div className="flex gap-1 px-2 flex-wrap">
              {"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe enim cumque ipsa nisi rem magni, voluptates dicta molestias suscipit ad."
                .split(" ")
                .map((word) => (
                  <KeywordNode category={word} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
