"use client";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import React, { useRef, useState, useEffect } from "react";
import { postSchema } from "@/utils/validator";
import axios from "axios";
import { calcDiscountedCents, formatMoney, toCents } from "@/utils/money";
import { useUser } from "@/cache/useUser";
import { useRouter } from "next/navigation";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";

import { POST_CATEGORIES } from "@/constants/categories";

export default function NewPostPage() {
  const { data: user } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // State
  const [loading, setLoading] = useState<boolean>(false);
  const [errorFields, setErrorFields] = useState<
    { path: string; message: string }[]
  >([]);
  const [error, setError] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [discount, setDiscount] = useState<number | "">("");
  const [tags, setTags] = useState("");

  // Derived State
  const [priceCents, setPriceCents] = useState(0);
  const [discountedCents, setDiscountedCents] = useState(0);

  useEffect(() => {
    const p = typeof price === "number" ? price : 0;
    const d = typeof discount === "number" ? discount : 0;
    const pCents = toCents(p);
    setPriceCents(pCents);
    setDiscountedCents(calcDiscountedCents(pCents, d));
  }, [price, discount]);

  const handleDropFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (
      !droppedFile ||
      !droppedFile.type.startsWith("image/") ||
      !fileInputRef.current
    )
      return;
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(droppedFile);
    fileInputRef.current.files = dataTransfer.files;
    const preview = URL.createObjectURL(droppedFile);
    setImagePreview(preview);
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
  };

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setErrorFields([]);
    setError("");

    const formData = new FormData();
    if (fileInputRef.current?.files?.[0]) {
      formData.append("picture", fileInputRef.current.files[0]);
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categoryName", categoryName);
    formData.append("price", priceCents.toString());
    formData.append("discount", (discount || 0).toString());
    formData.append("tags", tags);

    // Validation
    const parsedData = postSchema.safeParse({
      title,
      description,
      categoryName: categoryName.toLowerCase(),
      price: Number(price),
      discount: Number(discount || 0),
      tags: tags.trim(),
      ownerId: user.id,
    });

    if (!parsedData.success) {
      const errors = parsedData.error.issues.map((issue) => ({
        path: issue.path[0] as string,
        message: issue.message,
      }));
      setErrorFields(errors);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (!res.data.success) {
        setLoading(false);
        setError(res.data.error || "Invalid data");
        return;
      }
      router.push(`/post/${res.data.data.id}`);
    } catch (e: any) {
      setLoading(false);
      setError(
        e.response?.data?.error || "An error occurred while creating the post"
      );
    }
  };

  const getFieldError = (fieldName: string) => {
    return errorFields.find((err) => err.path === fieldName)?.message;
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-6 p-4 md:p-8 w-full">
        <div className="flex items-center gap-3">
          <Link
            href={"/"}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaArrowLeft size={20} className="text-gray-600" />
          </Link>
          <h1 className="font-bold text-gray-900 text-2xl">Create New Post</h1>
        </div>

        <form
          onSubmit={submitPost}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column - Image Upload */}
            <div className="md:col-span-4 lg:col-span-3 space-y-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Upload Photo
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={handleDropFile}
                className="relative aspect-square w-full rounded-xl border-2 border-dashed border-gray-300 hover:border-primary/50 hover:bg-gray-50 transition-all group cursor-pointer overflow-hidden bg-gray-50 flex flex-col items-center justify-center text-center"
                onClick={() => !imagePreview && fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  name="picture"
                  id="picture"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImagePreview}
                  className="hidden"
                />

                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="bg-white/90 text-sm font-semibold px-4 py-2 rounded-full hover:bg-white transition-colors"
                      >
                        Change Photo
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview(null);
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                        }}
                        className="bg-red-500/90 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-4 flex flex-col items-center gap-2 text-gray-400">
                    <div className="bg-white p-3 rounded-full shadow-sm">
                      <FiUploadCloud size={24} className="text-primary" />
                    </div>
                    <div>
                      <span className="text-primary font-medium">
                        Click to upload
                      </span>
                      <br />
                      <span className="text-xs">or drag and drop</span>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 text-center">
                Supported formats: JPG, PNG, WEBP
              </p>
            </div>

            {/* Right Column - Form Fields */}
            <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              {/* Title */}
              <div className="col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 2020 MacBook Pro 13-inch"
                  maxLength={50}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    getFieldError("title")
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:ring-primary/20 focus:border-primary"
                  } outline-none focus:ring-4 transition-all`}
                />
                {getFieldError("title") && (
                  <p className="mt-1 text-sm text-red-500">
                    {getFieldError("title")}
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="categoryName"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    getFieldError("categoryName")
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:ring-primary/20 focus:border-primary"
                  } outline-none focus:ring-4 transition-all bg-white`}
                >
                  {POST_CATEGORIES.map(({ value, label }) => (
                    <option key={value} value={value} disabled={value === ""}>
                      {label}
                    </option>
                  ))}
                </select>
                {getFieldError("categoryName") && (
                  <p className="mt-1 text-sm text-red-500">
                    {getFieldError("categoryName")}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  min={0}
                  placeholder="0.00"
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    getFieldError("price")
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:ring-primary/20 focus:border-primary"
                  } outline-none focus:ring-4 transition-all`}
                />
                {getFieldError("price") && (
                  <p className="mt-1 text-sm text-red-500">
                    {getFieldError("price")}
                  </p>
                )}
              </div>

              {/* Discount */}
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="discount"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Discount (%)
                </label>
                <input
                  type="number"
                  id="discount"
                  value={discount}
                  onChange={(e) =>
                    setDiscount(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  min={0}
                  max={100}
                  placeholder="0"
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    getFieldError("discount")
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:ring-primary/20 focus:border-primary"
                  } outline-none focus:ring-4 transition-all`}
                />
                {getFieldError("discount") && (
                  <p className="mt-1 text-sm text-red-500">
                    {getFieldError("discount")}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Description
                </label>
                <div className="relative">
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your item in detail..."
                    maxLength={500}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all resize-none"
                  />
                  <div className="absolute right-2 bottom-2 text-xs text-gray-400 bg-white/80 px-1 rounded">
                    {description.length}/500
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="col-span-2">
                <label
                  htmlFor="tags"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Tags{" "}
                  <span className="font-normal text-gray-400 text-xs ml-1">
                    (Space separated)
                  </span>
                </label>
                <input
                  type="text"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="laptop apple macbook electronics"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Footer / Summary */}
          <div className="bg-gray-50 p-6 md:px-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Price Preview */}
              <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                    Final Price
                  </span>
                  <div className="flex items-baseline gap-2">
                    {Number(discount) > 0 && (
                      <>
                        <span className="text-sm text-gray-400 line-through decoration-red-400">
                          {formatMoney(priceCents)}
                        </span>
                        <span className="text-xs font-bold text-red-500 bg-red-50 px-1.5 rounded">
                          -{discount}%
                        </span>
                      </>
                    )}
                    <span className="text-xl font-bold text-gray-900">
                      {priceCents === 0 ? "Free" : formatMoney(discountedCents)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                <div className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-600 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                  <span>Post Cost: 5</span>
                  <img
                    src="/coin.png"
                    className="size-4"
                    draggable="false"
                    alt="coin"
                  />
                </div>

                <Link
                  href="/"
                  className="px-6 py-2.5 rounded-full text-gray-600 font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 md:flex-none px-8 py-2.5 rounded-full bg-primary text-white font-bold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 active:scale-95"
                >
                  {loading ? "Posting..." : "Create Post"}
                </button>
              </div>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center border border-red-100 animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}
