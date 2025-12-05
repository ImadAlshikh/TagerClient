"use client";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import React, { use, useRef, useState } from "react";
import { postSchema } from "@/utils/validator";
import { useUserStore } from "@/stores/useUserStore";
import axios from "axios";

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
  const { user } = useUserStore();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorFields, setErrorFields] = useState<
    { path: string; message: string }[]
  >([]);

  const submitPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!formRef.current || !user) return null;
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    const parsedData = postSchema.safeParse({
      ...data,
      ownerId: user.id,
      price: Number(data.price),
      discount: Number(data.discount),
    });
    if (!parsedData.success) {
      const errors: { path: string; message: string }[] =
        parsedData.error.issues.map((issue) => ({
          path: issue.path[0] as string,
          message: issue.message,
        }));
      setIsLoading(false);
      return setErrorFields(errors);
    }
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3001/posts/",
        parsedData.data,
        { withCredentials: true }
      );
      if (!res.data.success) {
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 px-2">
          <Link href={"/"}>
            <FaArrowLeft size={18} />
          </Link>
          <span className="font-bold text-primary text-xl">New Post</span>
        </div>

        <div className="bg-white p-4 rounded-md gap-4 flex flex-col md:flex-row ">
          <div className="rounded-md bg-border md:flex-1 aspect-square! w-full h-fit" />
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full md:flex-2"
          >
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
                  {errorFields.find((error) => error.path === "title")?.message}
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
            <div className="type flex flex-col col-span-2">
              <label htmlFor="type" className="font-bold">
                Type*
              </label>
              <select
                name="type"
                id="type"
                className="px-2 py-2 ml-1 outline-text border border-border rounded-md focus:outline-2"
              >
                {typeOptions.map(({ value, label }, index) => (
                  <option key={index} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {errorFields.filter((error) => error.path === "type") && (
                <span className="text-sm text-red-500">
                  {errorFields.find((error) => error.path === "type")?.message}
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
                onChange={(e) => {
                  if (!e.target.value) {
                    e.target.value = "0";
                  }
                  if (Number(e.target.value) < 0) {
                    e.target.value = "0";
                  }

                  const priceDiv = document.getElementById(
                    "price-preview"
                  ) as HTMLDivElement;
                  const discountedPriceDiv = document.getElementById(
                    "discountedPrice-preview"
                  ) as HTMLElement;
                  const discountInput = document.getElementById(
                    "discount"
                  ) as HTMLInputElement;

                  if (priceDiv && discountedPriceDiv) {
                    priceDiv.textContent = e.target.value + "$";
                    const discountedPrice =
                      Number(e.target.value) *
                      (1 - Number(discountInput.value) / 100);

                    discountedPriceDiv.textContent =
                      discountedPrice == 0
                        ? "Free"
                        : discountedPrice.toString() + "$";
                  }
                }}
              />
              {errorFields.filter((error) => error.path === "price") && (
                <span className="text-sm text-red-500">
                  {errorFields.find((error) => error.path === "price")?.message}
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
                onChange={(e) => {
                  if (!e.target.value) {
                    e.target.value = "0";
                  }
                  if (Number(e.target.value) < 0) {
                    e.target.value = "0";
                  } else if (Number(e.target.value) > 100) {
                    e.target.value = "100";
                  }
                  const priceDiv = document.getElementById(
                    "price-preview"
                  ) as HTMLDivElement;
                  const discountedPriceDiv = document.getElementById(
                    "discountedPrice-preview"
                  ) as HTMLElement;
                  const discountDiv = document.getElementById(
                    "discount-preview"
                  ) as HTMLElement;
                  const priceInput = document.getElementById(
                    "price"
                  ) as HTMLInputElement;
                  if (priceDiv && discountedPriceDiv) {
                    discountDiv.textContent = e.target.value + "%";
                    const discountedPrice =
                      Number(priceInput.value) *
                      (1 - Number(e.target.value) / 100);

                    discountedPriceDiv.textContent =
                      discountedPrice == 0
                        ? "Free"
                        : discountedPrice.toString() + "$";
                  }
                }}
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
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary-dark disabled:bg-border disabled:text-text  text-white font-bold px-8 rounded-full py-1  col-start-2"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
