import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Card from '../components/Card'
import Chart from '../components/Chart'
import { 
  PlusIcon, 
  BriefcaseIcon, 
  CalendarIcon, 
  UserGroupIcon,
  EyeIcon,
  PaperAirplaneIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { mockOrganizerStats, mockRecentActivity } from '../data/organizerMockData'

const OrganizerDashboard = () => {
  const { user } = useAuth()
  
  const stats = [
    { name: 'Total Events', value: mockOrganizerStats.totalEvents, icon: CalendarIcon, color: 'text-blue-600', change: '+12%' },
    { name: 'Total Applicants', value: mockOrganizerStats.totalApplicants, icon: UserGroupIcon, color: 'text-green-600', change: '+23%' },
    { name: 'Live Posts', value: mockOrganizerStats.livePosts, icon: EyeIcon, color: 'text-purple-600', change: '+8%' },
    { name: 'Pending Reviews', value: mockOrganizerStats.pendingReviews, icon: ClockIcon, color: 'text-orange-600', change: '-5%' }
  ]

  const quickActions = [
    { 
      name: 'Create Event', 
      icon: CalendarIcon, 
      href: '/create-event', 
      color: 'bg-blue-500',
      description: 'Organize hackathons, workshops, and conferences'
    },
    { 
      name: 'Post Internship', 
      icon: BriefcaseIcon, 
      href: '/internships', 
      color: 'bg-green-500',
      description: 'Find talented interns for your organization'
    },
    { 
      name: 'Send Notifications', 
      icon: PaperAirplaneIcon, 
      href: '/send-notifications', 
      color: 'bg-purple-500',
      description: 'Notify participants about updates'
    },
    { 
      name: 'Manage Events', 
      icon: UserGroupIcon, 
      href: '/manage-events', 
      color: 'bg-orange-500',
      description: 'View and manage all your events'
    }
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'application':
        return UserGroupIcon
      case 'event':
        return CalendarIcon
      case 'milestone':
        return CheckCircleIcon
      default:
        return ClockIcon
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'application':
        return 'text-blue-600'
      case 'event':
        return 'text-green-600'
      case 'milestone':
        return 'text-purple-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'Organizer'} 👋</h1>
        <p className="text-white/90 mb-4">
          Manage your events, track applications, and connect with talented students.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/create-event" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <PlusIcon className="h-5 w-5" />
            <span>Create Event</span>
          </Link>
          <Link to="/send-notifications" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <PaperAirplaneIcon className="h-5 w-5" />
            <span>Send Update</span>
          </Link>
          <Link to="/manage-events" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Manage Events</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const isPositive = stat.change.startsWith('+')
          
          return (
            <Card key={index} className="relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value.toLocaleString()}
                  </p>
                  <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Link
                  key={index}
                  to={action.href}
                  className="group p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`${action.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {action.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </Card>

        {/* Application Trends */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Application Trends
          </h2>
          <Chart 
            type="line" 
            data={mockOrganizerStats.monthlyViews} 
            config={{ xKey: 'month', yKey: 'applications' }} 
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <Link
              to="/manage-events"
              className="text-primary hover:text-secondary text-sm font-medium"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {mockRecentActivity.map((activity) => {
              const Icon = getActivityIcon(activity.type)
              const iconColor = getActivityColor(activity.type)
              
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className={`p-2 rounded-full bg-white dark:bg-cardDark`}>
                    <Icon className={`h-4 w-4 ${iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                  {activity.eventId && (
                    <Link
                      to={`/submissions/${activity.eventId}`}
                      className="text-xs text-primary hover:text-secondary"
                    >
                      View
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </Card>

        {/* Event Types Distribution */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Event Types Distribution
          </h2>
          <Chart 
            type="pie" 
            data={mockOrganizerStats.eventTypes} 
            config={{ yKey: 'value' }} 
          />
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Monthly Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">3.2K</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Views</div>
            <div className="text-xs text-green-600 mt-1">+15% from last month</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Registration Rate</div>
            <div className="text-xs text-green-600 mt-1">+5% from last month</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Average Rating</div>
            <div className="text-xs text-green-600 mt-1">+0.2 from last month</div>
          </div>
        </div>
        <Chart 
          type="bar" 
          data={mockOrganizerStats.monthlyViews} 
          config={{ xKey: 'month', yKey: 'views' }} 
        />
      </Card>
    </div>
  )
}

export default OrganizerDashboard