import React, { useState } from 'react'
import Card from '../components/Card'
import { 
  BellIcon, 
  CheckIcon, 
  XMarkIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { mockNotifications } from '../data/mockData'

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState('all')

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return CheckCircleIcon
      case 'warning':
        return ExclamationTriangleIcon
      case 'error':
        return XMarkIcon
      default:
        return InformationCircleIcon
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-600'
      case 'warning':
        return 'text-yellow-600'
      case 'error':
        return 'text-red-600'
      default:
        return 'text-blue-600'
    }
  }

  const getNotificationBg = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20'
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20'
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20'
      default:
        return 'bg-blue-50 dark:bg-blue-900/20'
    }
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read
    if (filter === 'read') return notif.read
    return true
  })

  const unreadCount = notifications.filter(notif => !notif.read).length

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h1>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-primary hover:text-secondary text-sm font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          You have {unreadCount} unread notifications
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {['all', 'unread', 'read'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === tab
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'unread' && unreadCount > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type)
            const iconColor = getNotificationColor(notification.type)
            const bgColor = getNotificationBg(notification.type)
            
            return (
              <Card 
                key={notification.id}
                className={`${!notification.read ? 'border-l-4 border-l-primary' : ''} ${bgColor}`}
              >
                <div className="flex items-start space-x-3">
                  <Icon className={`h-6 w-6 ${iconColor} flex-shrink-0`} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`font-medium ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                          {notification.title}
                        </h3>
                        <p className={`text-sm ${!notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-600 dark:text-gray-400'}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-primary hover:text-secondary text-sm"
                            title="Mark as read"
                          >
                            <CheckIcon className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-red-500 text-sm"
                          title="Delete"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })
        ) : (
          <div className="text-center py-12">
            <BellIcon className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No notifications
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {filter === 'unread' 
                ? 'You have no unread notifications' 
                : filter === 'read'
                ? 'You have no read notifications'
                : 'You have no notifications yet'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications