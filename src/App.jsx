import React, { Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import LoadingSpinner from './components/LoadingSpinner'
import ProtectedRoute from './components/ProtectedRoute'

// Lazy load components for better performance
const Landing = React.lazy(() => import('./pages/Landing'))
const Login = React.lazy(() => import('./pages/Login'))
const SignUp = React.lazy(() => import('./pages/SignUp'))
const StudentDashboard = React.lazy(() => import('./pages/StudentDashboard'))
const OrganizerDashboard = React.lazy(() => import('./pages/OrganizerDashboard'))
const InternshipExplorer = React.lazy(() => import('./pages/InternshipExplorer'))
const EventExplorer = React.lazy(() => import('./pages/EventExplorer'))
const CourseLibrary = React.lazy(() => import('./pages/CourseLibrary'))
const Notes = React.lazy(() => import('./pages/Notes'))
const Profile = React.lazy(() => import('./pages/Profile'))
const Notifications = React.lazy(() => import('./pages/Notifications'))
const ApplicationTracker = React.lazy(() => import('./pages/ApplicationTracker'))
const ResumeAnalyzer = React.lazy(() => import('./pages/ResumeAnalyzer'))
const Gamification = React.lazy(() => import('./pages/Gamification'))
const AssistantWidget = React.lazy(() => import('./pages/AssistantWidget'))
const ContactUs = React.lazy(() => import('./pages/ContactUs'))

// Organizer-specific pages
const CreateEvent = React.lazy(() => import('./pages/organizer/CreateEvent'))
const ManageEvents = React.lazy(() => import('./pages/organizer/ManageEvents'))
const ManageSubmissions = React.lazy(() => import('./pages/organizer/ManageSubmissions'))
const SendNotifications = React.lazy(() => import('./pages/organizer/SendNotifications'))
const OrganizerProfile = React.lazy(() => import('./pages/organizer/OrganizerProfile'))
const EventPreview = React.lazy(() => import('./pages/organizer/EventPreview'))

function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

function App() {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'
  const isAuthPage = ['/login', '/signup'].includes(location.pathname)
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-darkBg">
      <ScrollToTop />
      
      {!isLandingPage && (
        <>
          <Navbar />
          {!isAuthPage && <Sidebar />}
        </>
      )}
      
      <main className={`${!isLandingPage && !isAuthPage ? 'ml-0 lg:ml-64' : ''} ${!isLandingPage ? 'pt-16' : ''}`}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Student Routes */}
            <Route path="/student" element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            
            {/* Organizer Routes */}
            <Route path="/organizer" element={
              <ProtectedRoute role="organizer">
                <OrganizerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/create-event" element={
              <ProtectedRoute role="organizer">
                <CreateEvent />
              </ProtectedRoute>
            } />
            <Route path="/manage-events" element={
              <ProtectedRoute role="organizer">
                <ManageEvents />
              </ProtectedRoute>
            } />
            <Route path="/submissions/:eventId" element={
              <ProtectedRoute role="organizer">
                <ManageSubmissions />
              </ProtectedRoute>
            } />
            <Route path="/send-notifications" element={
              <ProtectedRoute role="organizer">
                <SendNotifications />
              </ProtectedRoute>
            } />
            <Route path="/organizer-profile" element={
              <ProtectedRoute role="organizer">
                <OrganizerProfile />
              </ProtectedRoute>
            } />
            <Route path="/event-preview/:id" element={<EventPreview />} />
            
            {/* Shared Routes */}
            <Route path="/internships" element={<InternshipExplorer />} />
            <Route path="/events" element={<EventExplorer />} />
            <Route path="/courses" element={<CourseLibrary />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/tracker" element={<ApplicationTracker />} />
            <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
            <Route path="/gamification" element={<Gamification />} />
            <Route path="/ai-assistant" element={<AssistantWidget />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App