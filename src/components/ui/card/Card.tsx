import React from "react";

export default function MobileCard() {
  return (
    <div className="flex md:flex-col gap-4 max-md:max-h-40 md:max-w-64 bg-white border border-border rounded-md p-2">
      {/*change it to img */}
      <div className="img bg-border rounded-md aspect-square min-w-32! md:w-full! animate-pulse "></div>
      <div className="flex flex-col">
        <h3 className="title font-semibold text-accent-green"></h3>
        <div className="description line-clamp-2">
          and this is a description for this cardand this is a description for
          this car and this is a desc r i p t i on for this cardand this is a
          description for this card
        </div>
        <div className="flex  justify-between items-start  py-2">
          <div className="author flex items-center gap-1 ">
            <div className="author-img bg-border rounded-full aspect-square w-6"></div>
            <div className="text-sm font-light">Imad Alshikh</div>
          </div>
          <div className="price-contact flex flex-col gap-1 items-center justify-batween">
            <div className="price text-primary font-bold">152$</div>
            {/* <button
              type="button"
              className="text-white bg-primary hover:bg-primary-dark px-4  rounded-md"
            >
              contact
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
