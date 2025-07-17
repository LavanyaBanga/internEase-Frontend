import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  PlayIcon, 
  CheckIcon, 
  StarIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline'

const Landing = () => {
  const [openFaq, setOpenFaq] = useState(null)

  const features = [
    {
      title: 'Smart Internship Matching',
      description: 'AI-powered algorithm matches you with the perfect internships based on your skills and interests.',
      icon: '🎯'
    },
    {
      title: 'Event Discovery',
      description: 'Discover hackathons, conferences, and networking events to boost your career.',
      icon: '🚀'
    },
    {
      title: 'Skill Development',
      description: 'Access curated courses and learning materials to enhance your technical skills.',
      icon: '📚'
    },
    {
      title: 'Application Tracking',
      description: 'Keep track of all your applications in one place with detailed status updates.',
      icon: '📊'
    },
    {
      title: 'Resume Analysis',
      description: 'Get AI-powered feedback on your resume to improve your chances of selection.',
      icon: '📝'
    },
    {
      title: 'Gamification',
      description: 'Earn XP, badges, and climb leaderboards as you progress in your career journey.',
      icon: '🏆'
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer at Google',
      content: 'internEase helped me land my dream internship at Google. The platform is amazing!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Arjun Patel',
      role: 'Data Scientist at Microsoft',
      content: 'The AI-powered matching feature is incredible. Found the perfect internship in just 2 days.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Sneha Reddy',
      role: 'Product Manager at Amazon',
      content: 'The gamification aspect made job hunting fun! Highly recommend to all students.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]

  const faqs = [
    {
      question: 'How does internEase work?',
      answer: 'internEase uses AI to match students with relevant internships and opportunities based on their skills, interests, and career goals.'
    },
    {
      question: 'Is internEase free to use?',
      answer: 'Yes, internEase is completely free for students. We believe everyone deserves access to great career opportunities.'
    },
    {
      question: 'How do I get started?',
      answer: 'Simply sign up for free, complete your profile, and start exploring thousands of internship opportunities.'
    },
    {
      question: 'Can I track my applications?',
      answer: 'Yes, our application tracker helps you monitor all your applications and their current status in one place.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer 24/7 support through our AI assistant and dedicated support team to help you with any questions.'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-darkBg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-90"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Your Gateway to
            <span className="block bg-gradient-to-r from-warning to-success bg-clip-text text-transparent">
              Dream Career
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up">
            Connect with top companies, discover amazing internships, and accelerate your career journey with AI-powered recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Link 
              to="/signup" 
              className="btn-primary text-lg px-8 py-4 bg-white text-gray-900 hover:bg-gray-100"
            >
              Get Started Free
            </Link>
            <button className="flex items-center space-x-2 text-white border-2 border-white px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-all">
              <PlayIcon className="h-5 w-5" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose internEase?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We provide everything you need to land your dream internship and kickstart your career
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-2xl group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-darkBg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of students who have found their dream internships
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card group">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Got questions? We've got answers.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  {openFaq === index ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have already found their dream internships
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing