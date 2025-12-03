import React from "react";

export default function NotFound() {
  return (
    <div className="w-full h-full grid place-content-center gap-2">
      <div className="text-primary font-bold text-4xl text-center">404</div>
      <div className="text-primary font-bold text-xl text-center">
        Ooops...this page not found
      </div>
      <div className="text-lg">
        the page you want not found. please check the url or try again later
      </div>
      <button className="bg-primary hover:bg-primary-dark text-white rounded-full px-4 py-1  mx-auto">
        Home page
      </button>
    </div>
  );
}
