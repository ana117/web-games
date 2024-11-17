import Link from "next/link";

interface CardProps {
  content: JSX.Element;
  className?: string;
  linkUrl?: string;
  linkText?: string;
}

export default function Card({ content, className, linkUrl, linkText }: Readonly<CardProps>) {
  if (linkUrl) {
    return (
      <Link href={linkUrl} className={`w-[20rem] h-[20rem] group/card ${className}`}>
        <div className="relative w-full h-full">
          <div className="absolute w-full h-full">
            {content}
          </div>
          <div className="absolute w-full h-full bg-black/50 hidden group-hover/card:flex items-center justify-center">
            <p className="text-2xl font-bold text-white">{linkText}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className={`w-[20rem] h-[20rem] ${className}`}>
      {content}
    </div>
  );
}