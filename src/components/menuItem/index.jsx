const MenuItem = ({ text = "", className = "", ...props }) => {
  return (
    <button
      className={`text-sm leading-[140%] border-b-2 border-b-transparent hover:border-b-black transition-colors duration-300 outline-none ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default MenuItem;
