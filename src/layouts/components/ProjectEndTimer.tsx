"use client";

import { useCallback, useEffect, useState } from "react";

const ProjectEndTimer = ({ endDate }: { endDate: string }) => {
  const [mounted, setMounted] = useState(false);

  const calculateTimeLeft = useCallback(() => {
    const eventDate = new Date(endDate);
    const currentDate = new Date();
    const timeDiff = eventDate.getTime() - currentDate.getTime();

    if (timeDiff > 0) {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    }
    return null;
  }, [endDate]);

  const [timeLeft, setTimeLeft] =
    useState<ReturnType<typeof calculateTimeLeft>>(null);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 100);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (!mounted) {
    return (
      <div className="mb-6">
        <h3 className="h6 text-dark/80 mb-4">Project Will End</h3>
        <div className="flex gap-5 justify-between border p-3">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="size-6 bg-gray-100 animate-pulse" />
              <div className="w-10 h-3 bg-gray-100 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="h6 text-dark/80 mb-4">Project Will End</h3>
      <div className="flex gap-5 justify-between border p-4">
        <div className="text-center">
          <h5>{timeLeft ? timeLeft.days : "0"}</h5>
          <p className="text-xs text-light">
            {timeLeft?.days === 1 ? "Day" : "Days"}
          </p>
        </div>
        <div className="text-center">
          <h5>{timeLeft ? timeLeft.hours : "0"}</h5>
          <p className="text-xs text-light">
            {timeLeft?.hours === 1 ? "Hour" : "Hours"}
          </p>
        </div>
        <div className="text-center">
          <h5>{timeLeft ? timeLeft.minutes : "0"}</h5>
          <p className="text-xs text-light">
            {timeLeft?.minutes === 1 ? "Minute" : "Minutes"}
          </p>
        </div>
        <div className="text-center">
          <h5>{timeLeft ? timeLeft.seconds : "0"}</h5>
          <p className="text-xs text-light">
            {timeLeft?.seconds === 1 ? "Second" : "Seconds"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectEndTimer;
