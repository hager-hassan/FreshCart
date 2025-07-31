import React, { useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function visibility() {
    setVisible(window.scrollY > 500);
  }

  useEffect(() => {
    const handleScroll = () => {
      visibility();
    };

    window.addEventListener("scroll", handleScroll);
    visibility();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      aria-label='scroll to top'
      onClick={goTop}
      className={`w-10 h-10 rounded-full bg-main-color fixed z-99 right-5 bottom-7 
      flex items-center justify-center transition-all duration-500 cursor-pointer 
      hover:bottom-9
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"}`}
    >
      <MdKeyboardArrowUp className="text-white text-5xl font-black" />
    </button>
  );
}
