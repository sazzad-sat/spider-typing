import { auth } from '@clerk/nextjs/server'
import { PropsWithChildren } from 'react'

export default function StudentLayout({ children }: PropsWithChildren) {
  auth().protect()

  return <>{children}</>
}
