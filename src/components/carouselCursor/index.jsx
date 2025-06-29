"use client";
import { Fragment, useEffect } from "react";
import { ChevronIcon } from "../icons";

const CarouselCursor = () => {
  useEffect(() => {
    const cursorDot = document.getElementById("cursorDot");
    const container = document.getElementById("carousel-container");

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      if (!container || !cursorDot) return;

      const bounds = container.getBoundingClientRect();

      if (
        clientX >= bounds.left &&
        clientX <= bounds.right &&
        clientY >= bounds.top &&
        clientY <= bounds.bottom
      ) {
        cursorDot.style.display = "flex";
        cursorDot.style.left = `${clientX}px`;
        cursorDot.style.top = `${clientY}px`;
      } else {
        cursorDot.style.display = "none";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Fragment>
      {/* Custom Cursor */}
      <div
        className="cursor-dot w-14 h-14 p-3 rounded-full bg-[#FFFCFA] mix-blend-difference pointer-events-none fixed z-40 transition duration-100 ease-linear flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
        id="cursorDot"
      >
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center gap-0">
          <ChevronIcon direction="left" />
          <ChevronIcon direction="right" />
        </div>
      </div>
    </Fragment>
  );
};

export default CarouselCursor;
