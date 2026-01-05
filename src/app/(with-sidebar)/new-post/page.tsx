"use client";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import React, { useRef, useState } from "react";
import { postSchema } from "@/utils/validator";
import axios from "axios";
import { calcDiscountedCents, formatMoney, toCents } from "@/utils/money";
import { useUser } from "@/cache/useUser";
import { useRouter } from "next/navigation";

const typeOptions: { value: string; label: string }[] = [
  { value: "", label: "-- Select --" },
  { value: "vehicles", label: "Vehicles – Cars, Motorcycles, Trucks" },
  { value: "real_estate", label: "Real Estate – Rent & Sale" },
  { value: "electronics", label: "Electronics – TVs, Audio, Devices" },
  { value: "mobiles", label: "Mobile Phones & Accessories" },
  { value: "computers", label: "Computers – Laptops, Parts, Peripherals" },
  { value: "fashion", label: "Fashion – Clothing, Shoes, Bags" },
  { value: "beauty", label: "Beauty & Personal Care" },
  { value: "furniture", label: "Furniture & Home Decor" },
  { value: "home_appliances", label: "Home Appliances" },
  { value: "pets", label: "Pets & Pet Supplies" },
  { value: "services", label: "Services – Maintenance, Design, Cleaning" },
  { value: "jobs", label: "Jobs – Full-time, Part-time, Freelance" },
  { value: "sports", label: "Sports & Fitness Equipment" },
  { value: "games", label: "Gaming – Consoles, PC, Accessories" },
  { value: "collectibles", label: "Collectibles & Antiques" },
  { value: "books", label: "Books & Educational Material" },
  { value: "baby", label: "Baby & Kids Supplies" },
  { value: "industrial", label: "Industrial Equipment & Tools" },
  { value: "business", label: "Business & Commercial Equipment" },
];

export default function page() {
  const { data: user } = useUser();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    "./postPlaceholder.svg"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [priceCents, setPriceCents] = useState<number>(0);
  const [errorFields, setErrorFields] = useState<
    { path: string; message: string }[]
  >([]);
  const [error, setError] = useState<string>();
  const router = useRouter();

  const handleDropFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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

  const submitPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!formRef.current || !user) return null;
    const formData = new FormData(formRef.current);
    formData.set("price", priceCents.toString());
    var data = Object.fromEntries(formData.entries());
    const parsedData = postSchema.safeParse({
      ...data,
      ownerId: user.id,
      discount: Number(data.discount),
      price: Number(data.price),
      tags: (data.tags as string).trim(),
      categoryName: (data.categoryName as string).toLowerCase(),
    });
    if (!parsedData.success) {
      const errors: { path: string; message: string }[] =
        parsedData.error.issues.map((issue) => ({
          path: issue.path[0] as string,
          message: issue.message,
        }));
      setLoading(false);

      return setErrorFields(errors);
    }
    setLoading(true);
    try {
      const res = await axios.post("process.env.BACKEND_URL/posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (!res.data.success) {
        return setError(res.data.error || "Invalid data");
      }
      setLoading(false);
      router.push(`/post/${res.data.data.id}`);
    } catch (e: any) {
      setLoading(false);

      return setError(e.response.data.error || "Invalid data");
    }
  };

  return (
    <ProtectedRoute>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropFile}
        className="flex flex-col gap-2 p-4"
      >
        <div className="flex items-center gap-1 px-2">
          <Link href={"/"}>
            <FaArrowLeft size={18} />
          </Link>
          <span className="font-medium text-text text-xl">New Post</span>
        </div>

        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
          }}
          onChange={(e) => {
            const form = e.currentTarget;
            const price = Number(
              (form.elements.namedItem("price") as HTMLInputElement).value || 0
            );
            const discount = Number(
              (form.elements.namedItem("discount") as HTMLInputElement).value ||
                0
            );
            const priceCents = toCents(price);
            const discountedCents = calcDiscountedCents(priceCents, discount);
            setPriceCents(priceCents);

            document.getElementById("price-preview")!.textContent =
              formatMoney(priceCents);
            document.getElementById("discount-preview")!.textContent =
              discount + "%";
            document.getElementById("discountedPrice-preview")!.textContent =
              formatMoney(discountedCents);
          }}
        >
          <div className="bg-white p-4 rounded-md gap-4 flex flex-col md:flex-row items-center md:items-start">
            <div className="rounded-md relative group  aspect-square! size-full md:size-60 h-full flex flex-col justify-center">
              <input
                type="file"
                name="picture"
                id="picture"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImagePreview}
                className="hidden"
              />
              <div className="absolute bg-black opacity-0 group-hover:opacity-35 transition-opacity duration-250  w-full h-full"></div>
              <button
                onClick={() => fileInputRef?.current?.click()}
                className="bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-250 absolute text-white rounded-full px-2 py-1 self-center left-1/2 top-1/2 -translate-1/2"
              >
                Choose
              </button>
              <img
                src={imagePreview}
                draggable={false}
                className="select-none h-full object-cover"
              />
              {fileInputRef.current?.value && (
                <div
                  onClick={() => {
                    setImagePreview("./postPlaceholder.svg");
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="text-center w-full! hover:text-primary cursor-pointer absolute top-full"
                >
                  Delete
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full md:flex-2">
              <div className="title flex flex-col col-span-2">
                <label htmlFor="title" className="font-bold">
                  Title*
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  maxLength={50}
                  className="px-2 py-2 ml-1 outline-text border border-border rounded-md focus:outline-2"
                />
                {errorFields.filter((error) => error.path === "title") && (
                  <span className="text-sm text-red-500">
                    {
                      errorFields.find((error) => error.path === "title")
                        ?.message
                    }
                  </span>
                )}
              </div>
              <div className="description flex flex-col col-span-2 relative">
                <label htmlFor="description" className="font-bold">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Description"
                  onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                    const target = e.currentTarget;
                    const div = document.getElementById("dl") as HTMLDivElement;
                    if (div)
                      div.innerText = target.value.length.toString() + "/500";
                  }}
                  maxLength={500}
                  rows={3}
                  className="px-2 py-2 ml-1 resize-none outline-text border border-border rounded-md focus:outline-2"
                />

                <div id="dl" className="absolute bottom-0 right-1 text-sm">
                  0/500
                </div>
              </div>
              <div className="categoryName flex flex-col col-span-2">
                <label htmlFor="categoryName" className="font-bold">
                  Category*
                </label>
                <select
                  name="categoryName"
                  id="categoryName"
                  className="px-2 py-2 ml-1 outline-text border border-border rounded-md focus:outline-2"
                >
                  {typeOptions.map(({ value, label }, index) => (
                    <option key={index} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                {errorFields.filter(
                  (error) => error.path === "categoryName"
                ) && (
                  <span className="text-sm text-red-500">
                    {
                      errorFields.find((error) => error.path === "categoryName")
                        ?.message
                    }
                  </span>
                )}
              </div>
              <div className="price flex flex-col">
                <label htmlFor="price" className="font-bold">
                  Price($)*
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  min={0}
                  placeholder="Price"
                  className="px-2 py-2 ml-1 outline-text border border-border rounded-md focus:outline-2"
                />
                {errorFields.filter((error) => error.path === "price") && (
                  <span className="text-sm text-red-500">
                    {
                      errorFields.find((error) => error.path === "price")
                        ?.message
                    }
                  </span>
                )}
              </div>
              <div className="discount flex flex-col">
                <label htmlFor="discount" className="font-bold">
                  Discount(0-100%)
                </label>
                <input
                  type="number"
                  name="discount"
                  id="discount"
                  min={0}
                  max={100}
                  placeholder="Discount"
                  className="px-2 py-2 ml-1 outline-text border border-border rounded-md focus:outline-2"
                />
                {errorFields.filter((error) => error.path === "discount") && (
                  <span className="text-sm text-red-500">
                    {
                      errorFields.find((error) => error.path === "discount")
                        ?.message
                    }
                  </span>
                )}
              </div>
              <div className="tags flex flex-col col-span-2">
                <label htmlFor="tags" className="font-bold">
                  Tags
                  <span className="text-sm font-normal">(space saparated)</span>
                </label>
                <textarea
                  name="tags"
                  id="tags"
                  placeholder="Tags"
                  rows={3}
                  className="px-2 py-2 ml-1 resize-none outline-text border border-border rounded-md focus:outline-2"
                />
              </div>
              <div className="flex justify-between items-center col-span-2">
                <div className="flex items-center gap-1">
                  <div className="flex flex-col">
                    <div
                      id="price-preview"
                      className="font-bold text-text text-sm line-through"
                    >
                      0$
                    </div>
                    <div
                      id="discount-preview"
                      className="font-bold text-accent-green text-sm "
                    >
                      0%
                    </div>
                  </div>
                  <div
                    id="discountedPrice-preview"
                    className="font-bold text-primary text-lg"
                  >
                    Free
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <div className="flex items-center gap-0.5 ">
                    <span>cost:5</span>
                    <img src="/coin.png" className="size-5" draggable="false" />
                  </div>
                  <Link
                    href={"/"}
                    type="button"
                    className="bg-border items-center flex  hover:bg-[#d6d6d6] font-bold px-4 rounded-full py-1  col-start-1"
                  >
                    Cancel
                  </Link>
                  <button
                    onClick={(e) => submitPost(e)}
                    type="button"
                    disabled={loading}
                    className="bg-primary hover:bg-primary-dark disabled:bg-border disabled:cursor-not-allowed disabled:text-text  text-white font-bold px-8 rounded-full py-1  col-start-2"
                  >
                    Post
                  </button>
                  {error && (
                    <span className="text-accent-red text-sm absolute bottom-3 right-8 ">
                      {error}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}
