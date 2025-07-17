import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Card from '../components/Card'
import Chart from '../components/Chart'
import { 
  BriefcaseIcon, 
  CalendarIcon, 
  TrophyIcon, 
  FireIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { mockInternships, mockEvents, mockUserStats } from '../data/mockData'

const StudentDashboard = () => {
  const { user } = useAuth()
  
  const stats = [
    { name: 'Applications', value: mockUserStats.applications, icon: BriefcaseIcon, color: 'text-blue-600' },
    { name: 'Interviews', value: mockUserStats.interviews, icon: CalendarIcon, color: 'text-green-600' },
    { name: 'Offers', value: mockUserStats.offers, icon: TrophyIcon, color: 'text-yellow-600' },
    { name: 'Streak', value: `${mockUserStats.streak} days`, icon: FireIcon, color: 'text-red-600' }
  ]

  const tips = [
    "Complete your profile to get better internship matches",
    "Apply to at least 5 internships per week",
    "Attend networking events to build connections",
    "Update your resume regularly with new skills"
  ]

  const progressData = [
    { month: 'Jan', applications: 3, interviews: 1 },
    { month: 'Feb', applications: 5, interviews: 2 },
    { month: 'Mar', applications: 8, interviews: 3 },
    { month: 'Apr', applications: 12, interviews: 5 },
    { month: 'May', applications: 15, interviews: 7 },
    { month: 'Jun', applications: 18, interviews: 8 }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Hi {user?.name || 'Student'} 👋</h1>
        <p className="text-white/90 mb-4">
          Welcome back! Ready to take the next step in your career journey?
        </p>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{mockUserStats.level}</div>
            <div className="text-sm text-white/80">Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{mockUserStats.xp}</div>
            <div className="text-sm text-white/80">XP</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="text-center">
              <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.name}
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Internships */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recommended for You
            </h2>
            <Link
              to="/internships"
              className="text-primary hover:text-secondary flex items-center text-sm"
            >
              View all <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockInternships.slice(0, 3).map((internship) => (
              <div key={internship.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <img 
                  src={internship.logo} 
                  alt={internship.company}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {internship.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {internship.company} • {internship.location}
                  </p>
                </div>
                <div className="text-sm text-primary font-medium">
                  {internship.stipend}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Upcoming Events
            </h2>
            <Link
              to="/events"
              className="text-primary hover:text-secondary flex items-center text-sm"
            >
              View all <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {event.date} • {event.time}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {event.type}
                  </span>
                  <span className="text-xs text-green-600 dark:text-green-400">
                    {event.registrationFee}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Your Progress
          </h2>
          <Chart 
            type="line" 
            data={progressData} 
            config={{ xKey: 'month', yKey: 'applications' }} 
          />
        </Card>

        {/* Motivational Tips */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Daily Tips
          </h2>
          <div className="space-y-3">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
          <Link
            to="/gamification"
            className="btn-primary mt-4 w-full text-center"
          >
            View Achievements
          </Link>
        </Card>
      </div>
    </div>
  )
}

export default StudentDashboard