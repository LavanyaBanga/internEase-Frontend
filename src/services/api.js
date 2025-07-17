// Mock API service for future backend integration
const API_BASE_URL = 'https://api.internease.com'

class ApiService {
  constructor() {
    this.token = localStorage.getItem('internease_token')
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, config)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Auth methods
  async login(credentials) {
    // Mock login - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { id: 1, name: 'John Doe', email: credentials.email, role: 'student' },
          token: 'mock-jwt-token'
        })
      }, 1000)
    })
  }

  async signup(userData) {
    // Mock signup - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { id: 1, ...userData },
          token: 'mock-jwt-token'
        })
      }, 1000)
    })
  }

  // Internship methods
  async getInternships(filters = {}) {
    return this.request('/internships', { method: 'GET' })
  }

  async createInternship(data) {
    return this.request('/internships', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // Event methods
  async getEvents(filters = {}) {
    return this.request('/events', { method: 'GET' })
  }

  async createEvent(data) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // Course methods
  async getCourses() {
    return this.request('/courses', { method: 'GET' })
  }

  // Application methods
  async getApplications() {
    return this.request('/applications', { method: 'GET' })
  }

  async applyToInternship(internshipId) {
    return this.request('/applications', {
      method: 'POST',
      body: JSON.stringify({ internshipId })
    })
  }

  // Profile methods
  async getProfile() {
    return this.request('/profile', { method: 'GET' })
  }

  async updateProfile(data) {
    return this.request('/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  // Notification methods
  async getNotifications() {
    return this.request('/notifications', { method: 'GET' })
  }

  async markNotificationAsRead(id) {
    return this.request(`/notifications/${id}/read`, { method: 'POST' })
  }
}

export default new ApiService()