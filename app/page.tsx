import Dashboard from '@/components/Dashboard'
import fintechsData from '@/data/fintechs.json'

export default function Home() {
  const fintechs = fintechsData as any[]
  
  const stats = {
    totalVolume: fintechs.reduce((sum: number, f: any) => sum + (f.annualVolume || 0), 0),
    totalUsers: fintechs.reduce((sum: number, f: any) => sum + (f.totalUsers || 0), 0),
    totalFintechs: fintechs.length,
    integrated: fintechs.filter((f: any) => f.seismicStatus === 'integrated').length,
    totalFunding: fintechs.reduce((sum: number, f: any) => sum + (f.totalFunding || 0), 0)
  }
  
  return <Dashboard fintechs={fintechs} stats={stats} />
}
