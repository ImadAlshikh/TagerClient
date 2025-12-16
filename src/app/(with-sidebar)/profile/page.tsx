"use client";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { useUserStore } from "@/stores/useUserStore";
import { useLayoutEffect, useRef, useState } from "react";
import axios from "axios";

export default function page() {
  const { user } = useUserStore();
  const [imagePreview, setImagePreview] = useState(user?.picture);
  const [error, setError] = useState<string>();
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    setImagePreview(user?.picture);
  }, [user]);
  const handleImagePreview = () => {
    if (fileInputRef.current) {
      const file = fileInputRef.current.files?.[0];
      if (!file) return;
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      setSaveButtonDisabled(true);
      const res = await axios.put(
        "http://localhost:3001/users/profile",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(res.data);
      if (!res.data.success) {
        setError(res.data.message);
      }
      setSaveButtonDisabled(false);
    } catch (error) {
      setSaveButtonDisabled(false);
    }
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex items-center gap-1">
        <Link href={"/"}>
          <FaArrowLeft size={18} />
        </Link>
        <span className="font-medium text-primary text-xl">Profile</span>
      </div>
      <div className="bg-white rounded-md p-4 flex flex-col gap-2">
        <div className="w-full text-center text-xl">Personal Info</div>
        <form
          onSubmit={handleSave}
          className="flex flex-col items-center md:flex-row md:items-start gap-4 w-full"
        >
          <div className="rounded-full  relative group bg-border md:flex-1 aspect-square! w-34  h-34">
            <input
              type="file"
              name="picture"
              id="picture"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImagePreview}
              className="hidden"
            />
            <div className="absolute rounded-full bg-black opacity-0 group-hover:opacity-35 transition-opacity duration-250  w-full h-full"></div>
            <button
              onClick={() => fileInputRef?.current?.click()}
              className="bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-250 absolute text-white rounded-full px-2 py-1 self-center left-1/2 top-1/2 -translate-1/2"
            >
              Change
            </button>
            <img
              src={imagePreview}
              draggable={false}
              className="select-none bg-cover w-full h-full rounded-full border border-border"
            />
          </div>
          <div className="flex flex-col  w-full gap-2">
            <div className="flex flex-col h-fit grow">
              <div>Name*</div>
              <input
                type="text"
                name="name"
                className="border rounded-md   border-border px-2 py-1  h-fit"
                placeholder="Name"
                defaultValue={user?.name}
              />
            </div>
            <div className="flex flex-col h-fit grow">
              <div>Surname</div>
              <input
                type="text"
                name="surname"
                className="border rounded-md   border-border px-2 py-1  h-fit"
                placeholder="Surname"
                defaultValue={user?.surname}
              />
            </div>{" "}
            <div className="flex flex-col h-fit grow">
              <div>Phone</div>
              <input
                type="text"
                name="phone"
                className="border rounded-md   border-border px-2 py-1  h-fit"
                placeholder="Phone"
                defaultValue={user?.phone}
              />
            </div>
            <div className="flex flex-col h-fit grow">
              <div>Address</div>
              <input
                type="text"
                name="address"
                className="border rounded-md   border-border px-2 py-1  h-fit"
                placeholder="Address"
                defaultValue={user?.address}
              />
            </div>
            <button
              type="submit"
              disabled={saveButtonDisabled}
              className="bg-primary hover:bg-primary-dark disabled:bg-border disabled:cursor-not-allowed disabled:text-text  text-white font-bold px-8 rounded-full py-1 col-span-2 place-self-end"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
