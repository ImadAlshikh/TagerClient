"use client";
import Link from "next/link";
import { FaArrowLeft, FaEdit, FaCoins, FaGift } from "react-icons/fa";
import { useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useUser } from "@/cache/useUser";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import PostsContainer from "@/components/layout/containers/PostsContainer";

export default function ProfilePage() {
  const { data: user, isLoading, refetch } = useUser();
  const [imagePreview, setImagePreview] = useState(user?.picture);
  const [error, setError] = useState<string>();
  const [editMode, setEditMode] = useState<boolean>(false);
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
        "http://localhost:3001/users/profile",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (!res.data.success) {
        setError(res.data.message);
      } else {
        setEditMode(false);
      }
      setSaveButtonDisabled(false);
      refetch();
    } catch (error) {
      setSaveButtonDisabled(false);
      setError("Failed to update profile");
    }
  };

  const totalCredits =
    (user?.wallet?.freePoints || 0) + (user?.wallet?.paidPoints || 0);

  return (
    <ProtectedRoute>
      <div className="flex flex-col p-4 md:p-6 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link
              href={"/"}
              className="hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <FaArrowLeft size={18} />
            </Link>
            <h1 className="font-bold text-text text-2xl">My Profile</h1>
          </div>
        </div>

        <Tabs defaultValue="personal-info">
          <TabsList className="flex border-b border-border bg-transparent gap-0 mb-6">
            <TabsTrigger
              value="personal-info"
              className="px-6 py-3 font-medium text-text/70 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary hover:text-text transition-colors"
            >
              Personal Info
            </TabsTrigger>
            <TabsTrigger
              value="posts"
              className="px-6 py-3 font-medium text-text/70 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary hover:text-text transition-colors"
            >
              My Posts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal-info">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-border flex flex-col items-center gap-4">
                  <div className="relative group">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImagePreview}
                      className="hidden"
                    />
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 relative">
                      <img
                        src={imagePreview}
                        draggable={false}
                        className="w-full h-full object-cover"
                        alt="Profile"
                      />
                      {editMode && (
                        <>
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity" />
                          <button
                            type="button"
                            onClick={() => fileInputRef?.current?.click()}
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium"
                          >
                            Change
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900">
                      {user?.name} {user?.surname}
                    </h2>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>

                  {/* Wallet Section */}
                  <div className="w-full mt-4">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600">
                          Total Credits
                        </span>
                        <div className="flex items-center gap-1.5">
                          <img
                            src="/coin.png"
                            className="size-6"
                            alt="Credits"
                          />
                          <span className="text-2xl font-bold text-primary">
                            {totalCredits}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <FaGift className="text-green-600" size={14} />
                            <span>Free Points</span>
                          </div>
                          <span className="font-semibold text-gray-900">
                            {user?.wallet?.freePoints || 0}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <FaCoins className="text-yellow-600" size={14} />
                            <span>Paid Points</span>
                          </div>
                          <span className="font-semibold text-gray-900">
                            {user?.wallet?.paidPoints || 0}
                          </span>
                        </div>
                      </div>

                      <Link
                        href="/credits"
                        className="mt-4 w-full block text-center bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                      >
                        Load Credits
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Personal Information
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditMode((prev) => !prev)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        editMode
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-primary/10 text-primary hover:bg-primary/20"
                      }`}
                    >
                      <FaEdit size={16} />
                      {editMode ? "Cancel" : "Edit"}
                    </button>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1.5">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          disabled={!editMode}
                          type="text"
                          name="name"
                          required
                          className="border border-border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:bg-gray-50 disabled:text-gray-600 transition-colors"
                          placeholder="Enter your name"
                          defaultValue={user?.name}
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1.5">
                          Surname
                        </label>
                        <input
                          disabled={!editMode}
                          type="text"
                          name="surname"
                          className="border border-border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:bg-gray-50 disabled:text-gray-600 transition-colors"
                          placeholder="Enter your surname"
                          defaultValue={user?.surname}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1.5">
                        Email
                      </label>
                      <input
                        disabled
                        type="email"
                        value={user?.email}
                        className="border border-border rounded-lg px-3 py-2.5 bg-gray-50 text-gray-600 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Email cannot be changed
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1.5">
                        Phone
                      </label>
                      <input
                        disabled={!editMode}
                        type="tel"
                        name="phone"
                        className="border border-border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:bg-gray-50 disabled:text-gray-600 transition-colors"
                        placeholder="Enter your phone number"
                        defaultValue={user?.phone}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1.5">
                        Address
                      </label>
                      <input
                        disabled={!editMode}
                        type="text"
                        name="address"
                        className="border border-border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:bg-gray-50 disabled:text-gray-600 transition-colors"
                        placeholder="Enter your address"
                        defaultValue={user?.address}
                      />
                    </div>

                    {editMode && (
                      <div className="flex justify-end pt-4">
                        <button
                          type="submit"
                          disabled={saveButtonDisabled}
                          className="bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-2.5 rounded-lg transition-colors"
                        >
                          {saveButtonDisabled ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="posts">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  My Posts
                </h3>
                <Link
                  href={"/profile/posts"}
                  className="text-sm text-primary hover:text-primary-dark hover:underline font-medium transition-colors"
                >
                  View All →
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
