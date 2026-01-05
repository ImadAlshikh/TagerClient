"use client";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import PostCard from "@/components/ui/cards/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useUser } from "@/cache/useUser";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import PostsContainer from "@/components/layout/containers/PostsContainer";

export default function page() {
  const { data: user, isLoading, refetch } = useUser();
  const [imagePreview, setImagePreview] = useState(user?.picture);
  const [error, setError] = useState<string>();
  const [editMode, setEditMode] = useState<boolean>();
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    setImagePreview(user?.picture ?? "/userPlaceholder.png");
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
      setSaveButtonDisabled(true);
      const formData = new FormData(e.currentTarget);
      const res = await axios.put(
        "${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (!res.data.success) {
        setError(res.data.message);
      }
      setSaveButtonDisabled(false);
      refetch();
    } catch (error) {
      setSaveButtonDisabled(false);
    }
  };
  return (
    <ProtectedRoute>
      <div className="flex flex-col p-4">
        <div className="flex items-center gap-1">
          <Link href={"/"}>
            <FaArrowLeft size={18} />
          </Link>
          <span className="font-medium text-text text-xl">My Profile</span>
        </div>
        <Tabs defaultValue="personal-info">
          <TabsList className="flex border-b border-border bg-transparent gap-0">
            <TabsTrigger
              value="personal-info"
              className="px-4 py-2 font-medium text-text/70 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary hover:text-text transition-colors"
            >
              Personal Info
            </TabsTrigger>
            <TabsTrigger
              value="posts"
              className="px-4 py-2 font-medium text-text/70 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary hover:text-text transition-colors"
            >
              Posts
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personal-info">
            <div className="bg-white rounded-md p-4 mt-2 flex flex-col gap-2">
              <form
                onSubmit={handleSave}
                className="flex flex-col items-center md:flex-row md:items-start gap-4 w-full"
              >
                <div className="flex flex-col items-center">
                  <div className="rounded-full  relative group  md:flex-1 aspect-square! size-34">
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
                      className="select-none bg-cover min-w- rounded-full border border-border"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">coins: </span>
                    <div className="flex items-center">
                      <img src="./coin.png" className="size-5" />
                      <span className="font-semibold">
                        {user?.wallet.freePoints + user?.wallet.paidPoints}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  w-full gap-2">
                  <FaEdit
                    size={18}
                    className="self-end"
                    onClick={() => setEditMode((prev) => !prev)}
                  />
                  <div className="flex flex-col h-fit grow">
                    <div>Name*</div>
                    <input
                      disabled={!editMode}
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
                      disabled={!editMode}
                      type="text"
                      name="surname"
                      className="border rounded-md   border-border px-2 py-1  h-fit"
                      placeholder="Surname"
                      defaultValue={user?.surname}
                    />
                  </div>
                  <div className="flex flex-col h-fit grow">
                    <div>Phone</div>
                    <input
                      disabled={!editMode}
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
                      disabled={!editMode}
                      type="text"
                      name="address"
                      className="border rounded-md   border-border px-2 py-1  h-fit"
                      placeholder="Address"
                      defaultValue={user?.address}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!editMode || saveButtonDisabled}
                    className="bg-primary hover:bg-primary-dark disabled:bg-border disabled:cursor-not-allowed disabled:text-text  text-white font-bold px-8 rounded-full py-1 col-span-2 place-self-end"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="posts">
            <div className="bg-white rounded-md p-4">
              <div className="flex justify-end items-center mb-2">
                <Link
                  href={"/profile/posts"}
                  className="text-sm hover:underline hover:text-primary"
                >
                  show all
                </Link>
              </div>
              <PostsContainer loading={isLoading} posts={user?.posts} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
