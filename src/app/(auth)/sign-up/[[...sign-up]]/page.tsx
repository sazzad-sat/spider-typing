import Routes from '@/configs/routes'
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignUp path={Routes.SignUp} />
    </main>
  )
}
