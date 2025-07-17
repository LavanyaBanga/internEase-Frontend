import React, { useState } from 'react'
import Card from '../components/Card'
import { useAuth } from '../context/AuthContext'
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  PencilIcon,
  DocumentArrowUpIcon,
  StarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

const Profile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+91 9876543210',
    location: 'Mumbai, India',
    bio: 'Passionate full-stack developer with 2+ years of experience in React and Node.js',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
    education: [
      {
        degree: 'Bachelor of Technology',
        field: 'Computer Science',
        school: 'IIT Bombay',
        year: '2020-2024'
      }
    ],
    experience: [
      {
        title: 'Software Developer Intern',
        company: 'TechCorp',
        duration: 'Jun 2023 - Aug 2023',
        description: 'Developed React applications and REST APIs'
      }
    ],
    achievements: [
      { title: 'Winner - React Hackathon 2023', date: '2023' },
      { title: 'Certified AWS Cloud Practitioner', date: '2023' },
      { title: 'Top 100 - Google Code Jam', date: '2022' }
    ]
  })

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false)
  }

  const handleAddSkill = () => {
    const skill = prompt('Enter a new skill:')
    if (skill && skill.trim()) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, skill.trim()]
      })
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(skill => skill !== skillToRemove)
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          My Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your profile information and showcase your achievements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {profileData.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {user?.role === 'student' ? 'Student' : 'Organizer'}
            </p>
            <div className="flex justify-center space-x-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.8</div>
                <div className="text-sm text-gray-500">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-gray-500">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-sm text-gray-500">Awards</div>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-primary w-full mb-4"
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            <button className="btn-secondary w-full">
              <DocumentArrowUpIcon className="h-4 w-4 mr-2" />
              Upload Resume
            </button>
          </div>
        </Card>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <UserIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{profileData.name}</span>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{profileData.email}</span>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <PhoneIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{profileData.phone}</span>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{profileData.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{profileData.bio}</p>
              )}
            </div>
            
            {isEditing && (
              <div className="mt-4">
                <button onClick={handleSave} className="btn-primary mr-2">
                  Save Changes
                </button>
                <button onClick={() => setIsEditing(false)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            )}
          </Card>

          {/* Skills */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Skills
              </h3>
              <button
                onClick={handleAddSkill}
                className="text-primary hover:text-secondary text-sm font-medium"
              >
                Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium group relative"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Achievements
            </h3>
            <div className="space-y-3">
              {profileData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <TrophyIcon className="h-6 w-6 text-yellow-500" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-500">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile