import { LocaleProvider } from "@/components/main/i18n/LocaleProvider";
import { MainPageShell } from "@/components/main/MainPageShell";
import { defaultLocale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages(defaultLocale);

  return (
    <LocaleProvider locale={defaultLocale} messages={messages}>
      <MainPageShell>
        <div className="blog-shell-bg flex min-h-full flex-1 flex-col">{children}</div>
      </MainPageShell>
    </LocaleProvider>
  );
}
