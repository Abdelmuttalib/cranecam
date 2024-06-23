import { cn } from "@/lib/utils";

export function CompareIcon({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      fill="currentColor"
      className={cn("text-white", className)}
    >
      <path d="m20 4.01-5-.003V6h5v12h-5v2h5a2.006 2.006 0 0 0 2-2V6a1.997 1.997 0 0 0-2-1.99Z"></path>
      <path d="m4 18 5-7V4.003L4 4a2.006 2.006 0 0 0-2 2v12a2.006 2.006 0 0 0 2 2h5v-2H4Z"></path>
      <path d="M13 21h-2v2h2v-2Z"></path>
      <path d="M13 20h-2v1h2v-1Z"></path>
      <path d="M13 2h-2v2.005h2V2Z"></path>
      <path d="M13 4.005h-2V20h2V4.005Z"></path>
      <path d="M15 18h5l-5-7v7Z"></path>
    </svg>
  );
}
