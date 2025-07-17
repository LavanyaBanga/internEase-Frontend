import React, { useState } from 'react'
import Card from '../components/Card'
import { 
  MagnifyingGlassIcon, 
  StarIcon, 
  ClockIcon, 
  PlayIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'
import { mockCourses } from '../data/mockData'

const CourseLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedPrice, setSelectedPrice] = useState('all')

  const levels = [
    { id: 'all', name: 'All Levels', color: 'bg-gray-100 text-gray-800' },
    { id: 'Beginner', name: 'Beginner', color: 'bg-green-100 text-green-800' },
    { id: 'Intermediate', name: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'Advanced', name: 'Advanced', color: 'bg-red-100 text-red-800' }
  ]

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
    const matchesPrice = selectedPrice === 'all' || 
                        (selectedPrice === 'free' && course.price === 'Free') ||
                        (selectedPrice === 'paid' && course.price !== 'Free')
    return matchesSearch && matchesLevel && matchesPrice
  })

  const CourseCard = ({ course }) => (
    <Card className="group">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            <PlayIcon className="h-6 w-6 text-white" />
          </button>
        </div>
        {course.price === 'Free' && (
          <div className="absolute top-2 right-2 bg-success px-2 py-1 rounded-full text-xs font-medium text-white">
            Free
          </div>
        )}
      </div>
      
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs ${
          levels.find(level => level.id === course.level)?.color || 'bg-gray-100 text-gray-800'
        }`}>
          {course.level}
        </span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-3">
        by {course.instructor}
      </p>
      
      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center">
          <ClockIcon className="h-4 w-4 mr-1" />
          {course.duration}
        </div>
        <div className="flex items-center">
          <StarIcon className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
          {course.rating}
        </div>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        {course.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {course.topics.map((topic, index) => (
          <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
            {topic}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          {course.price}
        </span>
        <button className="btn-primary">
          Enroll Now
        </button>
      </div>
    </Card>
  )

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Course Library
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Enhance your skills with our curated course collection
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex space-x-2">
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>

        {/* Level Filter */}
        <div className="flex flex-wrap gap-2">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedLevel === level.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {level.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-300">
          Showing {filteredCourses.length} courses
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <BookOpenIcon className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No courses found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  )
}

export default CourseLibrary