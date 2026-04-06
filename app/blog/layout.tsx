import { AfricaPageShell } from "@/components/africa/AfricaPageShell";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AfricaPageShell>
      <div className="blog-shell-bg flex min-h-full flex-1 flex-col">{children}</div>
    </AfricaPageShell>
  );
}
