import { MainFooter } from "@/components/main/MainFooter";
import { MainHeader } from "@/components/main/MainHeader";

export function MainPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="africa-theme flex min-h-full flex-col bg-[#f7faf9] bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(20,184,166,0.09),transparent_55%)] text-[#1c1917] dark:bg-zinc-950 dark:bg-none dark:text-zinc-100">
      <MainHeader />
      <main className="flex-1">{children}</main>
      <MainFooter />
    </div>
  );
}
