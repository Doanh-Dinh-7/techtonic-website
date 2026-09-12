"use client";

const GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_GG_FORM;

type GoogleFormEmbedProps = {
  className?: string;
  height?: number;
};

export function GoogleFormEmbed({ className, height = 900 }: GoogleFormEmbedProps) {
  return (
    <div className={className}>
      <iframe
        src={GOOGLE_FORM_URL}
        width="100%"
        height={height}
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
        title="Form dang ky TechTonic Club"
        className="rounded-xl"
        loading="lazy"
      >
        Dang tai...
      </iframe>
    </div>
  );
}
