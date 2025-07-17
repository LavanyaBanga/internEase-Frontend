import React, { useState, useEffect } from 'react'
import Card from '../../components/Card'
import { 
  BuildingOfficeIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PencilIcon,
  PhotoIcon,
  LinkIcon,
  TrophyIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import { mockOrganizerProfile } from '../../data/organizerMockData'

const OrganizerProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(mockOrganizerProfile)
  const [logoFile, setLogoFile] = useState(null)

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('organizer_profile')
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile))
    }
  }, [])

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('organizer_profile', JSON.stringify(profileData))
    setIsEditing(false)
    
    // Show success message
    const toast = document.createElement('div')
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
    toast.textContent = 'Profile updated successfully!'
    document.body.appendChild(toast)
    
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 3000)
  }

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNestedInputChange = (parent, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }))
  }

  const handleArrayInputChange = (field, index, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field) => {
    setProfileData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayItem = (field, index) => {
    setProfileData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleLogoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          logo: e.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Organization Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your organization's public profile and branding
            </p>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <PencilIcon className="h-4 w-4" />
            <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <img 
                src={profileData.logo} 
                alt="Organization logo"
                className="w-24 h-24 rounded-full object-cover mx-auto"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-secondary transition-colors">
                  <PhotoIcon className="h-4 w-4" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </label>
              )}
            </div>
            
            {isEditing ? (
              <input
                type="text"
                value={profileData.orgName}
                onChange={(e) => handleInputChange('orgName', e.target.value)}
                className="text-xl font-bold text-center w-full bg-transparent border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:border-primary mb-2"
              />
            ) : (
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {profileData.orgName}
              </h2>
            )}
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {profileData.industry}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-gray-500">Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1.2K</div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <MapPinIcon className="h-4 w-4" />
                <span>{profileData.address}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <UsersIcon className="h-4 w-4" />
                <span>{profileData.employees} employees</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <BuildingOfficeIcon className="h-4 w-4" />
                <span>Founded {profileData.founded}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  About Organization
                </label>
                {isEditing ? (
                  <textarea
                    value={profileData.about}
                    onChange={(e) => handleInputChange('about', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">{profileData.about}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <GlobeAltIcon className="h-4 w-4 text-gray-400" />
                      <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">
                        {profileData.website}
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LinkedIn
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="h-4 w-4 text-gray-400" />
                      <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <PhoneIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{profileData.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Specialties */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Specialties
            </h3>
            {isEditing ? (
              <div className="space-y-2">
                {profileData.specialties.map((specialty, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={specialty}
                      onChange={(e) => handleArrayInputChange('specialties', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={() => removeArrayItem('specialties', index)}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('specialties')}
                  className="text-primary hover:text-secondary text-sm font-medium"
                >
                  + Add Specialty
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profileData.specialties.map((specialty, index) => (
                  <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            )}
          </Card>

          {/* Social Media */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Social Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Twitter
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.socialMedia.twitter}
                    onChange={(e) => handleNestedInputChange('socialMedia', 'twitter', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <a href={profileData.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">
                    @techcorp
                  </a>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Instagram
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.socialMedia.instagram}
                    onChange={(e) => handleNestedInputChange('socialMedia', 'instagram', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <a href={profileData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">
                    @techcorp
                  </a>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  YouTube
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.socialMedia.youtube}
                    onChange={(e) => handleNestedInputChange('socialMedia', 'youtube', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <a href={profileData.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">
                    TechCorp Channel
                  </a>
                )}
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Achievements & Awards
            </h3>
            {isEditing ? (
              <div className="space-y-2">
                {profileData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => handleArrayInputChange('achievements', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cardDark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={() => removeArrayItem('achievements', index)}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('achievements')}
                  className="text-primary hover:text-secondary text-sm font-medium"
                >
                  + Add Achievement
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {profileData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <TrophyIcon className="h-5 w-5 text-yellow-500" />
                    <span className="text-gray-900 dark:text-white">{achievement}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {isEditing && (
            <Card>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrganizerProfile