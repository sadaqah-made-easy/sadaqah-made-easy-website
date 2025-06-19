import React, { type ReactNode } from "react";

interface TimelineProps {
  children: ReactNode;
}

const Timeline: React.FC<TimelineProps> = ({ children }) => {
  return <ul className="list-none border-l border-border pl-0">{children}</ul>;
};

export default Timeline;
