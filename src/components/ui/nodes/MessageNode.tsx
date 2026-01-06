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
          break-anywhere
          wrap-anywhere
          whitespace-pre-wrap
          overflow-hidden
          rounded-2xl py-1 px-3 text-sm
          shadow-sm
          max-w-1/2
          ${
            isOwner
              ? "bg-primary text-white rounded-br-none"
              : "bg-gray-200 text-black rounded-bl-none"
          }
        `}
      >
        <div className={`leading-relaxed ${isOwner && "text-white"}`}>
          {text}
        </div>

        <div
          className={`
            text-[10px]  text-right
            ${isOwner ? "text-gray-200/80" : "text-gray"}
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
