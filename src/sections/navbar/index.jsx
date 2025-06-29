import { Fragment, useEffect, useState } from "react";
import { MenuItem } from "../../components";
import { navMenuLinks } from "../../constants/navMenu";
import { ArrowRightIcon, CloseIcon, MenuIcon } from "../../components/icons";

const Navbar = ({}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrolledClasses =
    "mt-0 mx-0 pt-[21px] md:pt-10 pb-6 md:pb-10 pl-[27.6px] pr-6 md:px-16 md:shadow-md w-full";
  const defaultClasses =
    "md:mt-[21px] md:ml-5 pt-[21px] md:pt-10 pb-6 md:pb-[41px] pl-[27.6px] md:pl-[39px] pr-6 md:pr-[33px] w-full md:w-[calc(100%-40px)]";

  return (
    <Fragment>
      <nav
        className={`bg-white flex items-center justify-between transition-all duration-300 ease-in-out fixed top-0 z-50 ${
          scrolled ? scrolledClasses : defaultClasses
        } ${menuOpen ? "hidden" : "flex"}`}
      >
        <div className="hidden md:flex items-center justify-start gap-5">
          {navMenuLinks.map((link) => (
            <MenuItem key={link.id} type="button" text={link.label} />
          ))}
        </div>
        <button
          type="button"
          className="contact-button flex items-center text-base leading-[110%] pt-[10px] pb-2 pl-4 pr-3 gap-4 border border-black outline-none"
        >
          <span>Contact us</span>
          <ArrowRightIcon />
        </button>
        <button
          type="button"
          className="block md:hidden py-[17px] px-[13px] bg-[#F9F4EE]"
          onClick={() => setMenuOpen(true)}
        >
          <MenuIcon />
        </button>
      </nav>

      {/* Mobile menu */}
      <nav
        className={`mobile-menu fixed top-0 transition-[right] duration-150 ease-linear w-screen h-screen px-8 pt-6 flex items-center justify-start flex-col z-50 bg-[#fffcfae8] ${
          menuOpen ? "right-0 overflow-auto" : "right-full overflow-hidden"
        }`}
      >
        <button
          type="button"
          className="text-black font-extralight text-4xl self-end"
          onClick={() => setMenuOpen(false)}
        >
          <CloseIcon />
        </button>
        <div className="flex w-full items-center justify-center flex-col text-2xl gap-8 h-full">
          {navMenuLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              className="block text-black transition-all duration-150 hover:ml-4"
            >
              {link.label}
            </button>
          ))}
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
