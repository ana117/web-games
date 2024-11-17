interface ClickableIconProps {
  icon: JSX.Element;
  onClick: () => void;
  className?: string;
}

export default function ClickableIcon({ icon, onClick, className}: Readonly<ClickableIconProps>) {
  return (
    <button 
      onClick={onClick} 
      className={`text-6xl p-[1rem] rounded-full bg-foreground text-background hover:bg-accent hover:scale-125 transition-transform duration-300 ${className}`}
    >
      {icon}
    </button>
  );
}