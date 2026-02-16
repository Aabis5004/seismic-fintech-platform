import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Fix Specie Finance
  await prisma.fintech.update({
    where: { slug: 'specie-finance' },
    data: {
      description: "Global neobank for trade finance. Single account replacing 4+ traditional bank accounts for importers/exporters.",
      longDescription: "Led by Frankie DiGiacomo (ex-Morgan Stanley). Building on Seismic for encrypted payment rails. Provides unified liquidity, built-in controls, and local payments for importers/exporters across 124+ countries. Privacy is essential for the businesses they serve.",
      investors: ["Alliance DAO", "Venture Partners"],
      integrationNote: "Building on Seismic - Privacy for trade finance transactions",
      seismicStatus: "integrated"
    }
  })
  console.log('Updated: Specie Finance')

  // Fix Cred
  await prisma.fintech.update({
    where: { slug: 'cred' },
    data: {
      description: "Private credit service for frontier businesses using proprietary credit analytics.",
      longDescription: "Led by Julian Gay (sold previous company to AppDirect). Backed by Alliance DAO. Building on Seismic to deploy encrypted lending rails. Provides fast working capital to frontier businesses that traditional finance overlooks. Privacy is non-negotiable for the businesses they serve.",
      investors: ["Alliance DAO"],
      integrationNote: "Building on Seismic - Encrypted private credit rails",
      seismicStatus: "integrated"
    }
  })
  console.log('Updated: Cred')

  console.log('Done! Fixed Cred and Specie Finance data.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
