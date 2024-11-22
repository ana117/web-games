import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="grow flex flex-col items-center justify-center h-full text-5xl font-bold text-center">
      <Link href="/" className="underline-offset-8 hover:underline">
        How did you get here? 🤔 
      </Link>
    </div>
  )
}