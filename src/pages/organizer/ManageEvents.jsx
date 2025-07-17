import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import { 
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UsersIcon,
  CalendarIcon,
  MapPinIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import { mockOrganizerEvents } from '../../data/organizerMockData'

const ManageEvents = () => {
  const [events, setEvents] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Load events from localStorage and merge with mock data
    const savedEvents = JSON.parse(localStorage.getItem('organizer_events') || '[]')
    const allEvents = [...mockOrganizerEvents, ...savedEvents]
    setEvents(allEvents)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live':
        return 'bg-green-100 text-green-800'
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'Expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.status === filter
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.type.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleDelete = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter(event => event.id !== eventId)
      setEvents(updatedEvents)
      
      // Update localStorage
      const savedEvents = updatedEvents.filter(event => !mockOrganizerEvents.find(mock => mock.id === event.id))
      localStorage.setItem('organizer_events', JSON.stringify(savedEvents))
    }
  }

  const handleRepublish = (eventId) => {
    const updatedEvents = events.map(event => 
      event.id === eventId ? { ...event, status: 'Live' } : event
    )
    setEvents(updatedEvents)
    
    // Update localStorage
    const savedEvents = updatedEvents.filter(event => !mockOrganizerEvents.find(mock => mock.id === event.id))
    localStorage.setItem('organizer_events', JSON.stringify(savedEvents))
  }

  const EventCard = ({ event }) => (
    <Card className="hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {event.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {event.description}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              {event.date}
            </div>
            <div className="flex items-center">
              <MapPinIcon className="h-4 w-4 mr-1" />
              {event.location}
            </div>
            <div className="flex items-center">
              <UsersIcon className="h-4 w-4 mr-1" />
              {event.currentParticipants}/{event.maxParticipants}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <Link
            to={`/event-preview/${event.id}`}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            title="Preview"
          >
            <EyeIcon className="h-4 w-4" />
          </Link>
          <button
            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
            title="Edit"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(event.id)}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Delete"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-white">{event.views || 0}</div>
              <div className="text-gray-500">Views</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-white">{event.applications || 0}</div>
              <div className="text-gray-500">Applications</div>
            </div>
          </div>
          <div className="flex space-x-2">
            {event.applications > 0 && (
              <Link
                to={`/submissions/${event.id}`}
                className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20 transition-colors"
              >
                View Applications
              </Link>
            )}
            {event.status === 'Expired' && (
              <button
                onClick={() => handleRepublish(event.id)}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm hover:bg-green-200 transition-colors"
              >
                Republish
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Manage Events
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              View and manage all your published events
            </p>
          </div>
          <Link to="/create-event" className="btn-primary flex items-center space-x-2">
            <PlusIcon className="h-5 w-5" />
            <span>Create Event</span>
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="Live">Live</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {events.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Total Events</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {events.filter(e => e.status === 'Live').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Live Events</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {events.filter(e => e.status === 'Upcoming').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Upcoming</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-gray-600 mb-1">
            {events.reduce((sum, event) => sum + (event.applications || 0), 0)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Total Applications</div>
        </Card>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <CalendarIcon className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No events found
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {filter === 'all' 
              ? 'You haven\'t created any events yet' 
              : `No events with status "${filter}"`
            }
          </p>
          <Link to="/create-event" className="btn-primary">
            Create Your First Event
          </Link>
        </div>
      )}
    </div>
  )
}

export default ManageEvents