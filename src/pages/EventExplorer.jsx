import React, { useState } from 'react'
import Card from '../components/Card'
import { 
  CalendarIcon, 
  MapPinIcon, 
  UsersIcon, 
  MagnifyingGlassIcon,
  ViewColumnsIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline'
import { mockEvents } from '../data/mockData'

const EventExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const categories = [
    { id: 'all', name: 'All Events', color: 'bg-gray-100 text-gray-800' },
    { id: 'Conference', name: 'Conference', color: 'bg-blue-100 text-blue-800' },
    { id: 'Workshop', name: 'Workshop', color: 'bg-green-100 text-green-800' },
    { id: 'Competition', name: 'Competition', color: 'bg-purple-100 text-purple-800' },
    { id: 'Webinar', name: 'Webinar', color: 'bg-orange-100 text-orange-800' },
    { id: 'Hackathon', name: 'Hackathon', color: 'bg-red-100 text-red-800' }
  ]

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || event.type === selectedCategory
    return matchesSearch && matchesCategory
  })

  const EventCard = ({ event, isListView = false }) => (
    <Card className={`${isListView ? 'flex items-center space-x-4' : ''}`}>
      <div className={`${isListView ? 'flex-shrink-0' : ''}`}>
        <div className={`${isListView ? 'w-16 h-16' : 'w-full h-32'} bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4`}>
          <CalendarIcon className="h-8 w-8 text-white" />
        </div>
      </div>
      <div className={`${isListView ? 'flex-1' : ''}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {event.title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs ${
            categories.find(cat => cat.id === event.type)?.color || 'bg-gray-100 text-gray-800'
          }`}>
            {event.type}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          {event.description}
        </p>
        <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            {event.date} at {event.time}
          </div>
          <div className="flex items-center">
            <MapPinIcon className="h-4 w-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center">
            <UsersIcon className="h-4 w-4 mr-2" />
            Max {event.maxParticipants} participants
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {event.organizer}
            </span>
            <span className="text-sm font-medium text-green-600">
              {event.registrationFee}
            </span>
          </div>
          <button className="btn-primary">
            Register
          </button>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Explore Events
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Discover conferences, workshops, hackathons and more
        </p>
      </div>

      {/* Search and Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              <ViewColumnsIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              <ListBulletIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-300">
          Showing {filteredEvents.length} events
        </p>
      </div>

      {/* Events Grid/List */}
      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}`}>
        {filteredEvents.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            isListView={viewMode === 'list'}
          />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <CalendarIcon className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No events found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try adjusting your search criteria or category filter
          </p>
        </div>
      )}
    </div>
  )
}

export default EventExplorer