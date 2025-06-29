import { useEffect, useState } from "react";

const AnimatedNumber = ({ number }) => {
  const [displayedNumber, setDisplayedNumber] = useState(number);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (number !== displayedNumber) {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        setDisplayedNumber(number);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [number]);

  return (
    <div className="animated-number">
      {isAnimating && (
        <span className="number slide-out">
          {displayedNumber.toString().padStart(2, "0")}
        </span>
      )}
      {!isAnimating && (
        <span className="number slide-in">
          {number.toString().padStart(2, "0")}
        </span>
      )}
    </div>
  );
};

export default AnimatedNumber;
