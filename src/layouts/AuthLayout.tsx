import { ReactNode } from "@tanstack/react-router";
import { BackgroundBeam } from "../components/ui/BackgroundBeam";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex bg-gradient-to-bl from-[#023298] to-[#05051F] dark:bg-gradient-to-br dark:from-[#023298]/50 dark:to-[#05051F]/50 flex-col h-[100vh] items-center justify-center text-slate-950 transition-bg">
      {children}
      <BackgroundBeam />
    </div>
  );
}
