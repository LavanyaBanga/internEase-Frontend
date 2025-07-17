import React, { useState } from 'react'
import Card from '../components/Card'
import { 
  MapPinIcon, 
  ClockIcon, 
  BanknotesIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon
} from '@heroicons/react/24/outline'
import { mockInternships } from '../data/mockData'

const InternshipExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'all',
    location: 'all',
    stipend: 'all'
  })
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  const getDeadlineColor = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24))
    
    if (daysLeft <= 3) return 'bg-red-100 text-red-800'
    if (daysLeft <= 7) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  const filteredInternships = mockInternships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedFilters.type === 'all' || internship.type === selectedFilters.type
    const matchesLocation = selectedFilters.location === 'all' || internship.location === selectedFilters.location
    
    return matchesSearch && matchesType && matchesLocation
  })

  const InternshipCard = ({ internship, isListView = false }) => (
    <Card className={`${isListView ? 'flex items-center space-x-4' : ''}`}>
      <div className={`${isListView ? 'flex-shrink-0' : ''}`}>
        <img 
          src={internship.logo} 
          alt={internship.company}
          className={`${isListView ? 'w-16 h-16' : 'w-full h-48'} object-cover rounded-lg mb-4`}
        />
      </div>
      <div className={`${isListView ? 'flex-1' : ''}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {internship.title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs ${getDeadlineColor(internship.deadline)}`}>
            {new Date(internship.deadline).toLocaleDateString()}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          {internship.company}
        </p>
        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <MapPinIcon className="h-4 w-4 mr-1" />
            {internship.location}
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-1" />
            {internship.duration}
          </div>
          <div className="flex items-center">
            <BanknotesIcon className="h-4 w-4 mr-1" />
            {internship.stipend}
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {internship.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {internship.requirements.map((req, index) => (
            <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
              {req}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {internship.type}
          </span>
          <button className="btn-primary">
            Apply Now
          </button>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Explore Internships
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Discover amazing internship opportunities from top companies
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Filters</span>
            </button>
            <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                <ListBulletIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={selectedFilters.type}
                  onChange={(e) => setSelectedFilters({...selectedFilters, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <select
                  value={selectedFilters.location}
                  onChange={(e) => setSelectedFilters({...selectedFilters, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Locations</option>
                  <option value="Remote">Remote</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stipend Range
                </label>
                <select
                  value={selectedFilters.stipend}
                  onChange={(e) => setSelectedFilters({...selectedFilters, stipend: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Ranges</option>
                  <option value="0-10000">₹0 - ₹10,000</option>
                  <option value="10000-20000">₹10,000 - ₹20,000</option>
                  <option value="20000+">₹20,000+</option>
                </select>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-300">
          Showing {filteredInternships.length} internships
        </p>
      </div>

      {/* Internships Grid/List */}
      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}`}>
        {filteredInternships.map((internship) => (
          <InternshipCard 
            key={internship.id} 
            internship={internship} 
            isListView={viewMode === 'list'}
          />
        ))}
      </div>

      {filteredInternships.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <MagnifyingGlassIcon className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No internships found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  )
}

export default InternshipExplorer