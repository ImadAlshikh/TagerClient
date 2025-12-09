export default function MessageNode({
  text,
  time,
  isOwner,
}: {
  text: string;
  time: string;
  isOwner: boolean;
}) {
  return (
    <div
      className={`w-full flex ${
        isOwner ? "justify-end" : "justify-start"
      } px-2`}
    >
      <div
        className={`
          max-w-[75%]
          break-words
          whitespace-pre-wrap
          overflow-hidden
          rounded-2xl py-1 px-3 text-sm
          shadow-sm
          ${
            isOwner
              ? "bg-primary text-white rounded-br-none"
              : "bg-gray-200 text-black rounded-bl-none"
          }
        `}
      >
        <div className={`leading-relaxed ${isOwner&&"text-white"}`}>{text}</div>

        <div
          className={`
            text-[10px]  text-right
            ${isOwner ? "text-gray-200/80" : "text-gray-500"}
          `}
        >
          {new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
