import PreviousPerformance from '@/components/typing-performance/PreviousPerformance'
import TodaysPerformance from '@/components/typing-performance/TodaysPerformance'
import { UserButton } from '@clerk/nextjs'
import { typingPerformance } from '@/db/schema/typingPerformance'
import { and, eq } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import db from '@/db'
import TodaysPerformanceHeader from '@/components/typing-performance/TodaysPerformanceHeader'
import { TodayPerformanceTable } from '@/components/typing-performance/TodayPerformanceTable'

export default function StudentPage() {
  return (
    <main className="bg-background">
      <div className="container px-6 pb-12 mt-6 max-w-screen-md">
        <PageHeader />

        <PageContent />
      </div>
    </main>
  )
}

function PageHeader() {
  return (
    <header className="flex items-center justify-between pb-2 border-b border-neutral-300">
      <h1 className="text-4xl font-bold">
        <span className="text-primary">SPIDY</span> Typing
      </h1>

      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: {
              height: '2.5rem',
              width: '2.5rem',
            },
          },
        }}
      />
    </header>
  )
}

async function PageContent() {
  const { userId } = auth().protect()

  const todayPerfs = await db
    .select()
    .from(typingPerformance)
    .where(
      and(eq(typingPerformance.practiceDate, new Date()), eq(typingPerformance.userId, userId))
    )

  return (
    <div className="mt-8">
      <TodaysPerformance performances={todayPerfs}>
        <TodaysPerformanceHeader />

        <TodayPerformanceTable />
      </TodaysPerformance>

      <PreviousPerformance />
    </div>
  )
}
