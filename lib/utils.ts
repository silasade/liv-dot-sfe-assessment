import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast, type ExternalToast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateToast(
  type: "success" | "warning" | "error",
  message: string,
  rest?: ExternalToast,
) {
  const baseStyles = `
    !text-white
    py-[12px] px-[16px]
    rounded-[8px]
    text-[14px] leading-[18px]
    flex gap-[6px] items-center
  `;

  const colorStyles =
    type === "success"
      ? "!bg-green-500"
      : type === "warning"
        ? "!bg-blue-200"
        : "!bg-red-500";

  toast[type](message, {
    position: "top-center",
    classNames: {
      toast: `${baseStyles} ${colorStyles}`,
    },
    ...rest,
  });
}
