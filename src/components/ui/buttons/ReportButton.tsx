"use client";
import { useUserStore } from "@/stores/useUserStore";
import axios from "axios";
import { useRef, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ReportButton({
  reportedId,
}: {
  reportedId: string | undefined;
}) {
  const [showModal, setShowMadal] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const submitReport = async () => {
    try {
      if (messageRef.current && reportedId) {
        setShowError(false);
        const text = messageRef.current.value;
        if (!text) return setShowError(true);
        const res = await axios.post(
          "http://localhost:3001/reports/",
          { text, reportedId },
          { withCredentials: true }
        );
        setShowMadal(false);
      }
    } catch (error) {
      setShowMadal(false);
    }
  };

  return (
    <div>
      <HiOutlineExclamationCircle
        className="cursor-pointer"
        size={22}
        strokeWidth={2}
        onClick={() => setShowMadal((prev) => !prev)}
      />
      <div
        className={`modal z-60 p-8 w-100 ${
          !showModal && "hidden"
        } fixed flex flex-col items-center gap-4 bg-white rounded-lg shadow top-1/2 left-1/2 -translate-1/2`}
      >
        <span className="font-bold text-red-500">Report</span>
        <div className="w-full flex flex-col">
          <span>message</span>
          <textarea
            name="message"
            id="message"
            rows={3}
            maxLength={100}
            ref={messageRef}
            placeholder="Message"
            className="border border-border resize-none rounded-md w-full p-2"
          ></textarea>
          <div className={`text-red-500 text-sm ${!showError && "hidden"}`}>
            *message text is required
          </div>
        </div>
        <div className="flex w-full justify-end gap-2">
          <button
            onClick={() => setShowMadal(false)}
            className="rounded-full text-center w-fit px-4 py-1 bg-border hover:bg-[#d6d6d6]"
          >
            Cancel
          </button>
          <button
            onClick={submitReport}
            className="rounded-full text-center w-fit px-4 py-1 bg-primary hover:bg-primary-dark text-white"
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
}
