import { prisma } from '@/lib/db'
import Dashboard from '@/components/Dashboard'

// Force dynamic rendering - don't try to connect to DB at build time
export const dynamic = 'force-dynamic'

async function getFintechs() {
  const fintechs = await prisma.fintech.findMany({
    orderBy: [
      { seismicStatus: 'asc' },
      { annualVolume: 'desc' }
    ]
  })
  return fintechs
}

async function getStats() {
  const fintechs = await prisma.fintech.findMany()
  
  const totalVolume = fintechs.reduce((sum, f) => sum + (f.annualVolume || 0), 0)
  const totalUsers = fintechs.reduce((sum, f) => sum + (f.totalUsers || 0), 0)
  const integrated = fintechs.filter(f => f.seismicStatus === 'integrated').length
  const totalFunding = fintechs.reduce((sum, f) => sum + (f.totalFunding || 0), 0)
  
  return {
    totalVolume,
    totalUsers,
    totalFintechs: fintechs.length,
    integrated,
    totalFunding
  }
}

export default async function Home() {
  const fintechs = await getFintechs()
  const stats = await getStats()
  
  return <Dashboard fintechs={fintechs} stats={stats} />
}
