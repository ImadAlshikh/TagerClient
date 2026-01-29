"use client";
import axios from "axios";
import { useRef, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { RiErrorWarningLine } from "react-icons/ri";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function ReportButton({
  reportedId,
}: {
  reportedId: string | undefined;
}) {
  const t = useTranslations("buttons");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const submitReport = async () => {
    try {
      if (messageRef.current && reportedId) {
        setShowError(false);
        const text = messageRef.current.value;
        if (!text) return setShowError(true);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/reports/`,
          { text, reportedId },
          { withCredentials: true },
        );
        setShowModal(false);
      }
    } catch (error) {
      setShowModal(false);
    }
  };

  return (
    <div>
      <HiOutlineExclamationCircle
        className="cursor-pointer"
        size={22}
        strokeWidth={2}
        onClick={() => setShowModal((prev) => !prev)}
      />

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md bg-card-bg border-border p-0 overflow-hidden">
          <div className="p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-accent-red/20 rounded-full blur-lg opacity-40" />
                <div className="relative bg-accent-red p-4 rounded-full">
                  <RiErrorWarningLine className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-center mb-3 text-text">
              {t("report")}
            </h2>

            {/* Description */}
            <p className="text-center text-gray-600 mb-6 text-sm">
              {t("reportDialog.description")}
            </p>

            {/* Form */}
            <div className="w-full flex flex-col gap-2 mb-6">
              <label
                htmlFor="message"
                className="text-sm font-medium text-text"
              >
                {t("reportDialog.messageLabel")}
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                maxLength={100}
                ref={messageRef}
                placeholder={t("reportDialog.messagePlaceholder")}
                className="border-2 border-border focus:border-primary focus:outline-none resize-none rounded-lg w-full p-3 text-text transition-colors"
              />
              {showError && (
                <div className="text-accent-red text-sm font-medium">
                  * {t("reportDialog.messageRequired")}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex w-full gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border-2 bg-white border-border hover:border-gray-400 hover:bg-bg text-text"
              >
                {t("reportDialog.cancel")}
              </button>
              <button
                onClick={submitReport}
                className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] bg-accent-red border-2 border-accent-red hover:bg-red-600 text-white shadow-lg shadow-accent-red/30"
              >
                {t("report")}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
