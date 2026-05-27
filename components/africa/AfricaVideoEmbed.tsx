type AfricaVideoEmbedProps = {
  src: string;
  title: string;
  caption?: string;
  className?: string;
};

export function AfricaVideoEmbed({ src, title, caption, className }: AfricaVideoEmbedProps) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-950 shadow-sm dark:border-zinc-800">
        <video
          className="aspect-video w-full"
          controls
          preload="metadata"
          playsInline
          aria-label={title}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
