export default function Button({ children, onClick, className, ...props } : Readonly<{ children: React.ReactNode, onClick: () => void, className?: string }>) {
  return (
    <button className={`px-4 py-2 rounded-md text-xl font-bold bg-foreground text-background hover:bg-accent ${className}`} onClick={onClick} {...props} >
      {children}
    </button>
  )
}