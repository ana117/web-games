interface RpsIconProps {
  icon: JSX.Element;
  isPlayer: boolean;
  className?: string;
}

export default function RpsIcon({ icon, isPlayer, className }: Readonly<RpsIconProps>) {
  return (
    <div className={`text-[6rem] sm:text-[8rem] md:text-[12rem] ${isPlayer ? "rotate-90" : "-rotate-90 -scale-x-100"} ${className}`}>
        {icon}
    </div>
  );
}