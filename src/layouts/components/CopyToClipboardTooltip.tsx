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
}

const CopyToClipboardTooltip = ({
  text,
  message = "Click to copy",
  children,
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
        <TooltipTrigger>
          <p className="cursor-pointer" onClick={() => copyToClipboard(text)}>
            {children}
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyToClipboardTooltip;
