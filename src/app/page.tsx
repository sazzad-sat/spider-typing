import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Routes from '@/configs/routes'

export default function Home() {
  const { userId } = auth()

  if (userId) redirect(Routes.StudentDashboard)

  return (
    <main
      className="flex flex-col gap-12 min-h-screen w-full justify-center items-center "
      style={{
        background: `
        radial-gradient(circle at 37% 40%, gold 0%, transparent 20%),
        radial-gradient(circle at 60% 55%, coral 0%, transparent 20%),
        radial-gradient(circle at 41% 60%, hsl(var(--primary)) 0%, transparent 20%),
        radial-gradient(circle at 60% 35%, burlywood 0%, transparent 20%),
        #ffefd4
      `,
        backgroundPosition: '50% 50%',
      }}
    >
      <h1 className="text-black text-7xl md:text-8xl font-bold text-center px-8 mix-blend-overlay">
        SPIDY Typing
      </h1>

      <div className="flex gap-4">
        <SignUpButton mode="modal">
          <Button className="shadow-md">Sign Up</Button>
        </SignUpButton>

        <SignInButton mode="modal">
          <Button variant={'secondary'} className="mix-blend-overlay">
            Sign In
          </Button>
        </SignInButton>
      </div>
    </main>
  )
}
