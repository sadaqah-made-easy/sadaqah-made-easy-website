"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCallback } from "react";
import { toast } from "sonner";

interface CopyToClipboardTooltipProps {
  text: string;
  fieldId: string;
  message?: string;
  children: React.ReactNode;
  className?: string;
}

const CopyToClipboardTooltip = ({
  text,
  message = "Click to copy",
  children,
  className = "",
}: CopyToClipboardTooltipProps) => {
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied!", {
        description: `'${text}'`,
      });
    });
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full text-left">
          <div 
            className={`cursor-pointer text-left ${className}`} 
            onClick={() => copyToClipboard(text)}
          >
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyToClipboardTooltip;