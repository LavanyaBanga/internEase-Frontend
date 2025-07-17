import React, { useState } from 'react'
import Card from '../components/Card'
import { 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import { mockApplications } from '../data/mockData'

const ApplicationTracker = () => {
  const [applications, setApplications] = useState(mockApplications)
  const [filter, setFilter] = useState('all')

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-800'
      case 'In Review':
        return 'bg-yellow-100 text-yellow-800'
      case 'Interview':
        return 'bg-purple-100 text-purple-800'
      case 'Selected':
        return 'bg-green-100 text-green-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Applied':
        return ClockIcon
      case 'In Review':
        return EyeIcon
      case 'Interview':
        return ClockIcon
      case 'Selected':
        return CheckCircleIcon
      case 'Rejected':
        return XCircleIcon
      default:
        return ClockIcon
    }
  }

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true
    return app.status === filter
  })

  const statusCounts = {
    all: applications.length,
    'Applied': applications.filter(app => app.status === 'Applied').length,
    'In Review': applications.filter(app => app.status === 'In Review').length,
    'Interview': applications.filter(app => app.status === 'Interview').length,
    'Selected': applications.filter(app => app.status === 'Selected').length,
    'Rejected': applications.filter(app => app.status === 'Rejected').length
  }

  const TimelineStep = ({ status, isActive, isCompleted }) => {
    const Icon = getStatusIcon(status)
    return (
      <div className="flex items-center">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
          isCompleted 
            ? 'bg-green-500 border-green-500' 
            : isActive 
            ? 'bg-primary border-primary' 
            : 'bg-gray-200 border-gray-200'
        }`}>
          <Icon className={`h-4 w-4 ${isCompleted || isActive ? 'text-white' : 'text-gray-400'}`} />
        </div>
        <span className={`ml-2 text-sm ${isActive ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-500'}`}>
          {status}
        </span>
      </div>
    )
  }

  const ApplicationCard = ({ application }) => {
    const stages = ['Applied', 'In Review', 'Interview', 'Selected']
    const currentStageIndex = stages.indexOf(application.status)
    const isRejected = application.status === 'Rejected'
    
    return (
      <Card>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {application.internshipTitle}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {application.company}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Applied: {application.appliedDate}</span>
              <span>Deadline: {application.deadline}</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
            {application.status}
          </span>
        </div>

        {/* Timeline */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Application Progress
          </h4>
          {isRejected ? (
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500">
                <XCircleIcon className="h-4 w-4 text-white" />
              </div>
              <span className="ml-2 text-sm text-red-600 font-medium">Rejected</span>
            </div>
          ) : (
            <div className="flex items-center space-x-8">
              {stages.map((stage, index) => (
                <TimelineStep
                  key={stage}
                  status={stage}
                  isActive={index === currentStageIndex}
                  isCompleted={index < currentStageIndex}
                />
              ))}
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                Next Step
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {application.nextStep}
              </p>
            </div>
            <div className="flex space-x-2">
              {application.status === 'Selected' && (
                <button className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors">
                  <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
                  Download Offer
                </button>
              )}
              <button className="flex items-center px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <EyeIcon className="h-4 w-4 mr-1" />
                View Details
              </button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Application Tracker
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track the status of all your internship applications
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Card key={status} className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {count}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {status === 'all' ? 'Total' : status}
            </div>
          </Card>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 overflow-x-auto">
          {['all', 'Applied', 'In Review', 'Interview', 'Selected', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                filter === status
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary'
              }`}
            >
              {status === 'all' ? 'All' : status}
              {statusCounts[status] > 0 && (
                <span className="ml-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                  {statusCounts[status]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))
        ) : (
          <div className="text-center py-12">
            <ClockIcon className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No applications found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {filter === 'all' 
                ? 'You haven\'t applied to any internships yet' 
                : `You have no applications with status "${filter}"`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationTracker