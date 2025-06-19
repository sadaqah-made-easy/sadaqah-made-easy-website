import React, { type ReactNode } from "react";

interface EventProps {
  date: string;
  title: string;
  children?: ReactNode;
  isDimmed?: boolean;
}

const Event: React.FC<EventProps> = ({
  date,
  title,
  isDimmed = false,
  children,
}) => {
  return (
    <li
      className={`ml-10 my-0 rounded-md p-8 sm:[&>p]:pl-6 sm:[&>p]:m-0 mb-6 relative ${isDimmed ? "bg-secondary/10" : "bg-primary/5"}`}
    >
      <div
        className={`absolute -left-11 -ml-0.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border border-white ${isDimmed ? "bg-secondary" : "bg-primary"}`}
      ></div>
      <div className="flex items-center gap-2 flex-wrap">
        <h3 className="text-lg font-semibold text-text-dark">{title}</h3>
        {date && (
          <time className="text-sm font-normal leading-none text-text bg-dark/5 py-2 px-3 rounded-sm">
            {date}
          </time>
        )}
      </div>

      {children}
    </li>
  );
};

export default Event;
