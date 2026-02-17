const { PrismaClient } = require('@prisma/client')
const fs = require('fs')

const prisma = new PrismaClient()

async function main() {
  const fintechs = await prisma.fintech.findMany({
    orderBy: [
      { seismicStatus: 'asc' },
      { annualVolume: 'desc' }
    ]
  })
  
  fs.mkdirSync('data', { recursive: true })
  fs.writeFileSync('data/fintechs.json', JSON.stringify(fintechs, null, 2))
  console.log('Exported ' + fintechs.length + ' fintechs')
}

main().finally(() => prisma.$disconnect())
