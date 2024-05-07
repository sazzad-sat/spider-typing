import Routes from '@/configs/routes'
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignIn path={Routes.SignIn} />
    </main>
  )
}
