import { useState, useEffect, useRef } from "react";
import { textContentData } from "../../constants/data";

const TextContent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after animation triggers
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before fully in view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-accent pt-[82px] md:pt-[153px] pb-9 md:pb-[100px] pl-[53px] pr-[49px]"
    >
      <h2
        className={`
          mb-5 md:mb-12 tracking-[-1px] leading-[30px] md:leading-[72px] 
          text-3xl md:text-7xl text-center text-black
          transition-all duration-1000 ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        {textContentData.title}
      </h2>
      <p
        className={`
          text-[#7A7777] text-center max-w-[748px] mx-auto 
          leading-[100%] md:text-2xl
          transition-all duration-1000 ease-out delay-1000
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        {textContentData.content}
      </p>
    </section>
  );
};

export default TextContent;
