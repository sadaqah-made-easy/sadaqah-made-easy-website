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
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    }
    return null;
  }, [endDate]);

  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof calculateTimeLeft>>(null);

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
        <h3 className="text-sm font-medium text-gray-700 mb-3">End Date</h3>
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
      <h3 className="text-sm font-medium text-gray-700 mb-3">End Date</h3>
      <div className="flex gap-5 justify-between border p-3">
        <div className="text-center">
          <div className="text-2xl font-bold">
            {timeLeft ? timeLeft.days : "0"}
          </div>
          <div className="text-xs text-gray-500">
            {timeLeft?.days === 1 ? "Day" : "Days"}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">
            {timeLeft ? timeLeft.hours : "0"}
          </div>
          <div className="text-xs text-gray-500">
            {timeLeft?.hours === 1 ? "Hour" : "Hours"}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">
            {timeLeft ? timeLeft.minutes : "0"}
          </div>
          <div className="text-xs text-gray-500">
            {timeLeft?.minutes === 1 ? "Minute" : "Minutes"}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">
            {timeLeft ? timeLeft.seconds : "0"}
          </div>
          <div className="text-xs text-gray-500">
            {timeLeft?.seconds === 1 ? "Second" : "Seconds"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEndTimer;
