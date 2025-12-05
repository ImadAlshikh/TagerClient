"use client";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import React from "react";

const typeOptions: { value: string; label: string }[] = [
  { value: "", label: "-- Select --" },
  { value: "vehicles", label: "مركبات – سيارات، دراجات، شاحنات" },
  { value: "real_estate", label: "عقارات – بيع، إيجار، شقق، أراضي" },
  { value: "electronics", label: "إلكترونيات – تلفزيونات، سماعات، أجهزة صوت" },
  { value: "mobiles", label: "جوالات – هواتف جديدة ومستعملة + اكسسوارات" },
  { value: "computers", label: "كمبيوترات – لابتوبات، قطع، ملحقات" },
  { value: "fashion", label: "أزياء – ملابس، أحذية، شنط" },
  { value: "beauty", label: "عناية وجمال – عطور، منتجات شعر وبشرة" },
  { value: "furniture", label: "أثاث – غرف نوم، جلسات، ديكور" },
  { value: "home_appliances", label: "أجهزة منزلية – ثلاجات، غسالات، مطابخ" },
  { value: "pets", label: "حيوانات أليفة – بيع، تبني، مستلزمات" },
  { value: "services", label: "خدمات – صيانة، نقل، تصميم، تنظيف" },
  { value: "jobs", label: "وظائف – دوام كامل/جزئي، فريلانسر" },
  { value: "sports", label: "رياضة – أجهزة رياضية، ملابس، أدوات" },
  { value: "games", label: "ألعاب – بلايستيشن، PC، اكسسوار ألعاب" },
  { value: "collectibles", label: "مقتنيات – تحف، عملات، أشياء نادرة" },
  { value: "books", label: "كتب – تعليمية، روايات، مراجع" },
  { value: "baby", label: "مستلزمات أطفال – عربيات، ملابس، ألعاب" },
  { value: "industrial", label: "معدات صناعية – أدوات، مكائن، مستلزمات ورش" },
  { value: "business", label: "أعمال وتجارية – محلات، معدات، تصفية" },
];

export default function page() {
  return (
    <ProtectedRoute>
      <div className="bg-white p-4 rounded-md gap-4 flex flex-col md:flex-row ">
        <div className="rounded-md bg-border md:flex-1 aspect-square! w-full" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full md:flex-2"
        >
          <div className="title flex flex-col col-span-2">
            <label htmlFor="title" className="font-bold">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              className="px-2 py-2 ml-1 outline-text border border-border rounded-md focus:outline-2"
            />
          </div>
          <div className="description flex flex-col col-span-2">
            <label htmlFor="description" className="font-bold">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              rows={3}
              className="px-2 py-2 ml-1 resize-none outline-text border border-border rounded-md focus:outline-2"
            />
          </div>
          <div className="type flex flex-col col-span-2">
            <label htmlFor="type" className="font-bold">
              Type
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
          </div>
          <div className="category flex flex-col">
            <label htmlFor="category" className="font-bold">
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              className="px-2 py-2 ml-1 outline-text border border-border rounded-md focus:outline-2"
            />
          </div>
          <div className="price flex flex-col">
            <label htmlFor="price" className="font-bold">
              Price($)
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price"
              className="px-2 py-2 ml-1 outline-text border border-border rounded-md focus:outline-2"
            />
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
        </form>
      </div>
    </ProtectedRoute>
  );
}
