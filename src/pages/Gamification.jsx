import React from 'react'
import Card from '../components/Card'
import { useAuth } from '../context/AuthContext'
import { 
  TrophyIcon, 
  StarIcon, 
  FireIcon,
  ChartBarIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { mockUserStats, mockBadges } from '../data/mockData'

const Gamification = () => {
  const { user } = useAuth()
  
  const levelProgress = (mockUserStats.xp % 300) / 300 * 100
  const nextLevelXP = (mockUserStats.level * 300) - mockUserStats.xp
  
  const achievements = [
    { name: 'First Application', description: 'Applied to your first internship', xp: 50, completed: true },
    { name: 'Profile Complete', description: 'Completed your profile 100%', xp: 100, completed: true },
    { name: 'Networking Star', description: 'Attended 3 events', xp: 150, completed: true },
    { name: 'Interview Pro', description: 'Cleared 5 interviews', xp: 200, completed: false },
    { name: 'Skill Master', description: 'Completed 10 courses', xp: 250, completed: false },
    { name: 'Industry Expert', description: 'Got hired by top company', xp: 500, completed: false }
  ]

  const leaderboard = [
    { rank: 1, name: 'Priya Sharma', xp: 2450, level: 8 },
    { rank: 2, name: 'Arjun Patel', xp: 2100, level: 7 },
    { rank: 3, name: 'Sneha Reddy', xp: 1890, level: 6 },
    { rank: 4, name: 'Rahul Kumar', xp: 1750, level: 5 },
    { rank: 5, name: 'You', xp: mockUserStats.xp, level: mockUserStats.level },
    { rank: 6, name: 'Vikram Singh', xp: 1100, level: 4 },
    { rank: 7, name: 'Anita Gupta', xp: 950, level: 3 },
    { rank: 8, name: 'Rohan Desai', xp: 800, level: 3 }
  ]

  const XPBar = ({ current, max, label }) => {
    const percentage = (current / max) * 100
    return (
      <div className="w-full">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
          <span>{label}</span>
          <span>{current}/{max}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }

  const BadgeCard = ({ badge }) => (
    <div className={`p-4 rounded-lg border-2 ${badge.earned ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'}`}>
      <div className="text-center">
        <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${badge.earned ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
          <TrophyIcon className={`h-6 w-6 ${badge.earned ? 'text-white' : 'text-gray-500'}`} />
        </div>
        <h3 className={`font-medium mb-1 ${badge.earned ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
          {badge.name}
        </h3>
        <p className={`text-sm ${badge.earned ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400'}`}>
          {badge.description}
        </p>
      </div>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Gamification
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track your progress, earn badges, and climb the leaderboard
        </p>
      </div>

      {/* Level and XP Overview */}
      <Card className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{mockUserStats.level}</div>
            <div className="text-white/90">Current Level</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{mockUserStats.xp}</div>
            <div className="text-white/90">Total XP</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{mockUserStats.streak}</div>
            <div className="text-white/90">Day Streak</div>
          </div>
        </div>
        <div className="mt-6">
          <XPBar current={mockUserStats.xp % 300} max={300} label="Progress to Next Level" />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Achievements
          </h2>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${achievement.completed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                  {achievement.completed ? (
                    <TrophyIcon className="h-5 w-5 text-white" />
                  ) : (
                    <div className="w-2 h-2 bg-gray-500 rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${achievement.completed ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                    {achievement.name}
                  </h3>
                  <p className={`text-sm ${achievement.completed ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                </div>
                <div className={`text-sm font-medium ${achievement.completed ? 'text-green-600' : 'text-gray-400'}`}>
                  +{achievement.xp} XP
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Badges */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Earned Badges
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {mockBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Global Leaderboard
        </h2>
        <div className="space-y-2">
          {leaderboard.map((player, index) => (
            <div key={index} className={`flex items-center space-x-4 p-3 rounded-lg ${player.name === 'You' ? 'bg-primary/10 border border-primary' : 'bg-gray-50 dark:bg-gray-800'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                player.rank === 1 ? 'bg-yellow-500 text-white' :
                player.rank === 2 ? 'bg-gray-400 text-white' :
                player.rank === 3 ? 'bg-orange-500 text-white' :
                'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                {player.rank}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className={`font-medium ${player.name === 'You' ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>
                    {player.name}
                  </h3>
                  {player.name === 'You' && (
                    <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                      You
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Level {player.level}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900 dark:text-white">
                  {player.xp.toLocaleString()} XP
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Gamification