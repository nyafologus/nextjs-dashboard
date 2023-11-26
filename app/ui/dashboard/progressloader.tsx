"use client";
import React, { useEffect, useState, useRef } from "react";

type ProgressLoaderProps = {
  isProgressActive: boolean;
};
const ProgressLoader: React.FC<ProgressLoaderProps> = ({
  isProgressActive,
}) => {
  const progressPathRef = useRef<SVGPathElement | null>(null);
  const [pathLength, setPathLength] = useState<number>(0);

  useEffect(() => {
    const progressPath = progressPathRef.current;
    if (!progressPath) return;

    const length = progressPath.getTotalLength();
    setPathLength(length);

    progressPath.style.transition = "none";
    progressPath.style.strokeDasharray = `${length} ${length}`;
    progressPath.style.strokeDashoffset = `${length}`;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = "stroke-dashoffset 10ms linear";

    const updateProgress = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = length - (scroll * length) / height;
      progressPath.style.strokeDashoffset = `${progress}`;
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, [pathLength]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`progress-wrap ${isProgressActive ? "active-progress" : ""}`}
      onClick={handleScrollToTop}
    >
      <svg
        className="progress-circle svg-content"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
      >
        <path
          ref={progressPathRef}
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
        />
      </svg>
    </div>
  );
};
export default ProgressLoader;
