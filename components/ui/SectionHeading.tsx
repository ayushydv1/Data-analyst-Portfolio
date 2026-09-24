import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <p className="mb-4 flex items-center gap-3 font-sans text-xs font-medium tracking-[0.22em] text-accent uppercase">
        <span className="tabular-nums text-muted">{index}</span>
        <span className="h-px w-8 bg-accent/50" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="font-display max-w-3xl text-3xl leading-[1.1] font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
        {title}
      </h2>
    </div>
  );
}
