import React from "react";

const AnimatedDots: React.FC = () => {
  const rings = [
    { number: 1, dots: 18, radius: 52, angleStep: 20, delay: 0.3333333333 },
    { number: 2, dots: 24, radius: 66, angleStep: 15, delay: 0.6666666667 },
    { number: 3, dots: 30, radius: 80, angleStep: 12, delay: 1 },
    { number: 4, dots: 36, radius: 94, angleStep: 10, delay: 1.3333333333 },
    {
      number: 5,
      dots: 42,
      radius: 108,
      angleStep: 8.5714285714,
      delay: 1.6666666667,
    },
    { number: 6, dots: 48, radius: 122, angleStep: 7.5, delay: 2 },
    {
      number: 7,
      dots: 54,
      radius: 136,
      angleStep: 6.6666666667,
      delay: 2.3333333333,
    },
    { number: 8, dots: 60, radius: 150, angleStep: 6, delay: 2.6666666667 },
    { number: 9, dots: 66, radius: 164, angleStep: 5.4545454545, delay: 3 },
    { number: 10, dots: 72, radius: 178, angleStep: 5, delay: 3.3333333333 },
  ];

  return (
    <>
      <div className="absolute w-1 h-1 left-[49.5%] top-[49.5%] bg-[#ad2fed] rounded-full animate-pulse" />
      {rings.map((ring) => (
        <div
          key={ring.number}
          className={`absolute w-20 h-20 top-1/2 left-1/2 -mt-10 -ml-10 group ring-${ring.number}`}
        >
          {Array.from({ length: ring.dots }).map((_, index) => (
            <div
              key={index}
              className={`absolute w-1.5 h-1.5 top-10 left-10 dot-${index + 1}`}
              style={{
                transform: `translate3d(0, -${ring.radius}px, 0) rotate(${index * ring.angleStep}deg)`,
                transformOrigin: `0 ${ring.radius}px`,
              }}
            >
              <div
                className="w-1.5 h-1.5 bg-white/30 rounded-full group-hover:bg-[#ad2fed] transition-colors duration-200"
                style={{
                  animation: `pulsate 2s ease-in-out ${ring.delay}s alternate infinite both`,
                }}
              />
            </div>
          ))}
        </div>
      ))}

      <style jsx>{`
        @keyframes pulsate {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes pulse {
          50% {
            transform: scale(0.2);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default AnimatedDots;
