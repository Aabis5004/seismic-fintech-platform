'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Filter, TrendingUp, Users, DollarSign, Shield, 
  Building2, CreditCard, Landmark, Bitcoin, PieChart, Globe,
  ChevronDown, ExternalLink, Lock, Unlock, AlertTriangle
} from 'lucide-react'

type Fintech = {
  id: string
  name: string
  slug: string
  logoColor: string
  abbrev: string
  description: string
  longDescription?: string | null
  founded?: number | null
  headquarters?: string | null
  country: string
  region: string
  website?: string | null
  category: string
  subcategory?: string | null
  annualVolume?: number | null
  totalUsers?: number | null
  employees?: number | null
  totalFunding?: number | null
  valuation?: number | null
  investors: string[]
  painPoints: string[]
  seismicStatus: string
  integrationNote?: string | null
  privacyScore: number
  integrationPotential: number
  primaryMarkets: string[]
}

type Stats = {
  totalVolume: number
  totalUsers: number
  totalFintechs: number
  integrated: number
  totalFunding: number
}

const categoryIcons: Record<string, any> = {
  payments: CreditCard,
  neobank: Building2,
  lending: Landmark,
  crypto: Bitcoin,
  wealth: PieChart,
  insurance: Shield,
  infrastructure: Globe,
}

const categoryColors: Record<string, string> = {
  payments: '#635BFF',
  neobank: '#00D897',
  lending: '#FF9F43',
  crypto: '#F7931A',
  wealth: '#1EC677',
  insurance: '#FF0080',
  infrastructure: '#4A9FFF',
}

function formatNumber(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(1)}T`
  if (num >= 1e9) return `$${(num / 1e9).toFixed(0)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(0)}M`
  return `$${num.toLocaleString()}`
}

function formatUsers(num: number): string {
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`
  if (num >= 1e6) return `${(num / 1e6).toFixed(0)}M`
  if (num >= 1e3) return `${(num / 1e3).toFixed(0)}K`
  return num.toLocaleString()
}

const painPointLabels: Record<string, string> = {
  public_transaction_data: 'Public Transaction Data',
  merchant_exposure: 'Merchant Data Exposed',
  competitive_intel_leak: 'Competitive Intel Leak',
  transaction_visibility: 'Transaction Visibility',
  cross_border_tracking: 'Cross-Border Tracking',
  wallet_tracking: 'Wallet Tracking',
  on_chain_transparency: 'On-Chain Transparency',
  data_exposure: 'Data Exposure',
  fragmented_banking: 'Fragmented Banking',
  slow_underwriting: 'Slow Underwriting',
}

export default function Dashboard({ fintechs, stats }: { fintechs: Fintech[], stats: Stats }) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [adoptionRate, setAdoptionRate] = useState(25)
  const [selectedFintech, setSelectedFintech] = useState<Fintech | null>(null)

  const categories = useMemo(() => {
    const cats = [...new Set(fintechs.map(f => f.category))]
    return cats.sort()
  }, [fintechs])

  const filteredFintechs = useMemo(() => {
    return fintechs.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
                           f.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !selectedCategory || f.category === selectedCategory
      const matchesStatus = !selectedStatus || f.seismicStatus === selectedStatus
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [fintechs, search, selectedCategory, selectedStatus])

  const impactStats = useMemo(() => {
    const rate = adoptionRate / 100
    return {
      encryptedVolume: stats.totalVolume * rate,
      protectedUsers: Math.round(stats.totalUsers * rate),
      potentialSavings: stats.totalVolume * rate * 0.02,
      fintechsAdopting: Math.round(stats.totalFintechs * rate)
    }
  }, [adoptionRate, stats])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="border-b border-[#2a2a3a] bg-[#0a0a0f]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EAC4D5] via-[#D0A0B7] to-[#8D6477] flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#D0A0B7]">SEISMIC</h1>
                <p className="text-xs text-gray-500">Fintech Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://docs.seismic.systems" target="_blank" className="text-sm text-gray-400 hover:text-[#D0A0B7] transition">Docs</a>
              <a href="https://x.com/SeismicSys" target="_blank" className="text-sm text-gray-400 hover:text-[#D0A0B7] transition">@SeismicSys</a>
              <div className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium">
                DEVNET LIVE
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#D0A0B7]/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#D0A0B7]" />
              </div>
              <span className="text-gray-500 text-sm">Total Fintechs</span>
            </div>
            <p className="text-3xl font-bold">{stats.totalFintechs}</p>
            <p className="text-xs text-green-400 mt-1">{stats.integrated} on Seismic</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-gray-500 text-sm">Total Volume</span>
            </div>
            <p className="text-3xl font-bold text-green-400">{formatNumber(stats.totalVolume)}</p>
            <p className="text-xs text-gray-500 mt-1">Annual transaction volume</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-gray-500 text-sm">Total Users</span>
            </div>
            <p className="text-3xl font-bold text-blue-400">{formatUsers(stats.totalUsers)}</p>
            <p className="text-xs text-gray-500 mt-1">Combined user base</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-gray-500 text-sm">Total Funding</span>
            </div>
            <p className="text-3xl font-bold text-purple-400">{formatNumber(stats.totalFunding)}</p>
            <p className="text-xs text-gray-500 mt-1">Combined capital raised</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#D0A0B7]/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#D0A0B7]" />
              </div>
              <span className="text-gray-500 text-sm">Privacy Score</span>
            </div>
            <p className="text-3xl font-bold text-[#D0A0B7]">
              {Math.round(fintechs.reduce((a, f) => a + f.privacyScore, 0) / fintechs.length)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">Avg privacy need</p>
          </motion.div>
        </div>

        {/* Impact Calculator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-[#12121a] to-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Impact Calculator</h2>
              <p className="text-sm text-gray-500">What if fintechs adopted Seismic's encrypted rails?</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-[#D0A0B7]">{adoptionRate}%</p>
              <p className="text-xs text-gray-500">Adoption Rate</p>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={adoptionRate}
            onChange={(e) => setAdoptionRate(Number(e.target.value))}
            className="w-full h-2 bg-[#2a2a3a] rounded-lg appearance-none cursor-pointer mb-6"
            style={{
              background: `linear-gradient(to right, #D0A0B7 0%, #D0A0B7 ${adoptionRate}%, #2a2a3a ${adoptionRate}%, #2a2a3a 100%)`
            }}
          />

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#0a0a0f] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-400">{formatNumber(impactStats.encryptedVolume)}</p>
              <p className="text-xs text-gray-500 mt-1">Encrypted Volume</p>
            </div>
            <div className="bg-[#0a0a0f] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">{formatUsers(impactStats.protectedUsers)}</p>
              <p className="text-xs text-gray-500 mt-1">Users Protected</p>
            </div>
            <div className="bg-[#0a0a0f] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-orange-400">{formatNumber(impactStats.potentialSavings)}</p>
              <p className="text-xs text-gray-500 mt-1">Potential Savings</p>
            </div>
            <div className="bg-[#0a0a0f] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#D0A0B7]">{impactStats.fintechsAdopting}</p>
              <p className="text-xs text-gray-500 mt-1">Fintechs Adopting</p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search fintechs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#12121a] border border-[#2a2a3a] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#D0A0B7] transition"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSelectedStatus(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                !selectedStatus ? 'bg-[#D0A0B7] text-black' : 'bg-[#12121a] text-gray-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedStatus('integrated')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedStatus === 'integrated' ? 'bg-green-500 text-black' : 'bg-[#12121a] text-gray-400 hover:text-white'
              }`}
            >
              On Seismic
            </button>
            <button
              onClick={() => setSelectedStatus('potential')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedStatus === 'potential' ? 'bg-[#D0A0B7] text-black' : 'bg-[#12121a] text-gray-400 hover:text-white'
              }`}
            >
              Potential
            </button>
          </div>

          <div className="flex gap-2 ml-auto">
            {categories.map(cat => {
              const Icon = categoryIcons[cat] || Building2
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  className={`p-2 rounded-lg transition ${
                    selectedCategory === cat 
                      ? 'bg-[#D0A0B7] text-black' 
                      : 'bg-[#12121a] text-gray-400 hover:text-white'
                  }`}
                  title={cat}
                >
                  <Icon className="w-4 h-4" />
                </button>
              )
            })}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          Showing {filteredFintechs.length} of {fintechs.length} fintechs
        </p>

        {/* Fintech Grid */}
        <div className="grid grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredFintechs.map((fintech, i) => {
              const Icon = categoryIcons[fintech.category] || Building2
              return (
                <motion.div
                  key={fintech.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.02 }}
                  onClick={() => setSelectedFintech(fintech)}
                  className={`bg-[#12121a] border rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl ${
                    fintech.seismicStatus === 'integrated' 
                      ? 'border-green-500/50 hover:border-green-500' 
                      : 'border-[#2a2a3a] hover:border-[#D0A0B7]'
                  }`}
                >
                  {fintech.seismicStatus === 'integrated' && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold rounded-full">
                      ON SEISMIC
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: fintech.logoColor }}
                    >
                      {fintech.abbrev}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{fintech.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span 
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                          style={{ 
                            backgroundColor: `${categoryColors[fintech.category]}20`,
                            color: categoryColors[fintech.category]
                          }}
                        >
                          {fintech.category}
                        </span>
                        <span className="text-xs text-gray-500">{fintech.region}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{fintech.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-[#0a0a0f] rounded-lg p-2">
                      <p className="text-xs text-gray-500">Volume</p>
                      <p className="font-semibold text-sm">
                        {fintech.annualVolume ? formatNumber(fintech.annualVolume) : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-[#0a0a0f] rounded-lg p-2">
                      <p className="text-xs text-gray-500">Users</p>
                      <p className="font-semibold text-sm">
                        {fintech.totalUsers ? formatUsers(fintech.totalUsers) : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Privacy Score Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Privacy Need</span>
                      <span className="text-[#D0A0B7]">{fintech.privacyScore}%</span>
                    </div>
                    <div className="h-1.5 bg-[#2a2a3a] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#D0A0B7] to-[#EAC4D5] rounded-full transition-all"
                        style={{ width: `${fintech.privacyScore}%` }}
                      />
                    </div>
                  </div>

                  <div className={`text-xs px-3 py-2 rounded-lg ${
                    fintech.seismicStatus === 'integrated'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-[#D0A0B7]/10 text-[#D0A0B7]'
                  }`}>
                    {fintech.integrationNote}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedFintech && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedFintech(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl"
                    style={{ backgroundColor: selectedFintech.logoColor }}
                  >
                    {selectedFintech.abbrev}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold">{selectedFintech.name}</h2>
                      {selectedFintech.seismicStatus === 'integrated' && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                          ON SEISMIC
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 mt-1">{selectedFintech.description}</p>
                  </div>
                  {selectedFintech.website && (
                    <a 
                      href={selectedFintech.website}
                      target="_blank"
                      className="p-2 rounded-lg bg-[#2a2a3a] hover:bg-[#3a3a4a] transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {selectedFintech.longDescription && (
                  <p className="text-sm text-gray-300 mb-6">{selectedFintech.longDescription}</p>
                )}

                <div className="grid grid-cols-4 gap-3 mb-6">
                  <div className="bg-[#0a0a0f] rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-green-400">
                      {selectedFintech.annualVolume ? formatNumber(selectedFintech.annualVolume) : 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">Annual Volume</p>
                  </div>
                  <div className="bg-[#0a0a0f] rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-blue-400">
                      {selectedFintech.totalUsers ? formatUsers(selectedFintech.totalUsers) : 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">Users</p>
                  </div>
                  <div className="bg-[#0a0a0f] rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-purple-400">
                      {selectedFintech.totalFunding ? formatNumber(selectedFintech.totalFunding) : 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">Funding</p>
                  </div>
                  <div className="bg-[#0a0a0f] rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-orange-400">
                      {selectedFintech.employees?.toLocaleString() || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">Employees</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-400" />
                      Privacy Pain Points
                    </h4>
                    <div className="space-y-2">
                      {selectedFintech.painPoints.map(point => (
                        <div key={point} className="flex items-center gap-2 text-sm">
                          <Unlock className="w-3 h-3 text-red-400" />
                          <span className="text-gray-300">{painPointLabels[point] || point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Company Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Founded</span>
                        <span>{selectedFintech.founded || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">HQ</span>
                        <span>{selectedFintech.headquarters || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Region</span>
                        <span>{selectedFintech.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Markets</span>
                        <span>{selectedFintech.primaryMarkets.slice(0, 3).join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedFintech.investors.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Investors</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedFintech.investors.slice(0, 6).map(inv => (
                        <span key={inv} className="px-3 py-1 bg-[#2a2a3a] rounded-full text-xs">
                          {inv}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-[#2a2a3a]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Seismic Integration Potential</p>
                      <p className="text-2xl font-bold text-[#D0A0B7]">{selectedFintech.integrationPotential}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Privacy Score</p>
                      <p className="text-2xl font-bold text-green-400">{selectedFintech.privacyScore}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
