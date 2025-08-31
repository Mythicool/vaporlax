import { useState } from 'react'
import { ChevronRight, RotateCcw, Sparkles, Target } from 'lucide-react'
import VaporwaveCard from './VaporwaveCard'
import VaporwaveButton from './VaporwaveButton'

interface QuizQuestion {
  id: string
  question: string
  options: {
    id: string
    text: string
    value: string
  }[]
}

interface QuizResult {
  type: string
  title: string
  description: string
  recommendations: string[]
  image: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What\'s your vaping experience level?',
    options: [
      { id: 'beginner', text: 'Complete beginner', value: 'beginner' },
      { id: 'intermediate', text: 'Some experience', value: 'intermediate' },
      { id: 'advanced', text: 'Experienced vaper', value: 'advanced' },
      { id: 'expert', text: 'Cloud chasing expert', value: 'expert' }
    ]
  },
  {
    id: '2',
    question: 'What\'s most important to you?',
    options: [
      { id: 'convenience', text: 'Convenience & simplicity', value: 'convenience' },
      { id: 'flavor', text: 'Amazing flavor variety', value: 'flavor' },
      { id: 'clouds', text: 'Big vapor clouds', value: 'clouds' },
      { id: 'customization', text: 'Customization options', value: 'customization' }
    ]
  },
  {
    id: '3',
    question: 'How often do you plan to vape?',
    options: [
      { id: 'occasional', text: 'Occasionally (social)', value: 'occasional' },
      { id: 'regular', text: 'Daily use', value: 'regular' },
      { id: 'heavy', text: 'Heavy use', value: 'heavy' },
      { id: 'chain', text: 'Chain vaping', value: 'chain' }
    ]
  },
  {
    id: '4',
    question: 'What\'s your budget range?',
    options: [
      { id: 'budget', text: 'Under $30', value: 'budget' },
      { id: 'mid', text: '$30-$60', value: 'mid' },
      { id: 'premium', text: '$60-$100', value: 'premium' },
      { id: 'luxury', text: '$100+', value: 'luxury' }
    ]
  }
]

const quizResults: { [key: string]: QuizResult } = {
  'beginner-convenience': {
    type: 'Disposable Starter',
    title: 'Perfect for Beginners!',
    description: 'You\'re looking for simplicity and convenience. Disposable vapes are your best bet!',
    recommendations: ['Elf Bar BC5000', 'Lost Vape Orion Bar', 'Geek Bar Pulse'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
  },
  'intermediate-flavor': {
    type: 'Pod System',
    title: 'Flavor Explorer',
    description: 'You want variety and great taste. Pod systems offer the best flavor experience!',
    recommendations: ['Vaporesso XROS 3', 'SMOK Nord 4', 'Uwell Caliburn G2'],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
  },
  'advanced-clouds': {
    type: 'Sub-Ohm Tank',
    title: 'Cloud Chaser',
    description: 'You\'re all about those massive clouds! Sub-ohm tanks are your weapon of choice.',
    recommendations: ['GeekVape Zeus X', 'FreeMax Mesh Pro', 'Horizon Falcon King'],
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
  },
  'expert-customization': {
    type: 'RDA/RTA',
    title: 'Master Builder',
    description: 'You want complete control. Rebuildable atomizers let you craft the perfect vape!',
    recommendations: ['Dead Rabbit V3', 'Profile Unity RTA', 'Asgard Mini RDA'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  }
}

const VapeQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<QuizResult | null>(null)

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate result
      calculateResult(newAnswers)
    }
  }

  const calculateResult = (finalAnswers: { [key: string]: string }) => {
    // Simple logic to determine result type
    const experience = finalAnswers['1'] || 'beginner'
    const priority = finalAnswers['2'] || 'convenience'
    
    const resultKey = `${experience}-${priority}`
    const calculatedResult = quizResults[resultKey] || quizResults['beginner-convenience']
    
    setResult(calculatedResult)
    setShowResult(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
    setResult(null)
  }

  if (showResult && result) {
    return (
      <section className="py-20 bg-vapor-dark-gray relative overflow-hidden">
        <div className="absolute inset-0 floating-particles opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <VaporwaveCard className="text-center p-12" glow>
            <Sparkles className="w-16 h-16 text-neon-cyan mx-auto mb-6 animate-pulse" />
            
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl mb-4">
              <span className="holographic">Your Perfect</span> <span className="chromatic-text" data-text="Match">Match</span>
            </h2>
            
            <div className="mb-8">
              <div className="aspect-video max-w-md mx-auto mb-6 rounded-lg overflow-hidden">
                <img
                  src={result.image}
                  alt={result.type}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="font-orbitron font-bold text-2xl text-neon-cyan mb-4">
                {result.title}
              </h3>
              
              <p className="font-vt323 text-lg text-gray-300 mb-6 leading-relaxed">
                {result.description}
              </p>
              
              <div className="bg-vapor-black/50 rounded-lg p-6 mb-8">
                <h4 className="font-orbitron font-bold text-white mb-4">
                  <span className="neon-text-pink">Recommended Products:</span>
                </h4>
                <div className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center justify-center gap-2 font-vt323 text-gray-300">
                      <Target className="w-4 h-4 text-neon-teal" />
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <VaporwaveButton variant="primary" size="lg">
                SHOP RECOMMENDATIONS
              </VaporwaveButton>
              <VaporwaveButton variant="ghost" onClick={resetQuiz}>
                <RotateCcw className="w-4 h-4 mr-2" />
                RETAKE QUIZ
              </VaporwaveButton>
            </div>
          </VaporwaveCard>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-vapor-dark-gray relative overflow-hidden">
      <div className="absolute inset-0 retro-grid opacity-5"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Target className="w-16 h-16 text-neon-purple mx-auto mb-6 animate-spin" style={{ animationDuration: '3s' }} />
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-4">
            <span className="holographic">Find Your</span> <span className="chromatic-text" data-text="Perfect">Perfect</span> <span className="neon-text-cyan">Vape</span>
          </h2>
          <p className="font-vt323 text-xl text-gray-400">
            Take our <span className="neon-text-pink">cybernetic quiz</span> to discover your ideal vaping setup
          </p>
        </div>

        <VaporwaveCard className="p-8" glow>
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="font-vt323 text-neon-cyan">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span className="font-vt323 text-gray-400">
                {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-vapor-dark-gray rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-neon-cyan to-neon-pink h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Current Question */}
          <div className="text-center mb-8">
            <h3 className="font-orbitron font-bold text-2xl sm:text-3xl text-white mb-8">
              {quizQuestions[currentQuestion].question}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(quizQuestions[currentQuestion].id, option.value)}
                  className="p-6 bg-vapor-black/50 hover:bg-neon-cyan/10 border border-neon-cyan/30 hover:border-neon-cyan rounded-lg transition-all duration-300 group text-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-vt323 text-lg text-gray-300 group-hover:text-neon-cyan transition-colors">
                      {option.text}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-neon-cyan transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <VaporwaveButton
              variant="ghost"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              PREVIOUS
            </VaporwaveButton>
            
            <div className="flex gap-2">
              {quizQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index <= currentQuestion ? 'bg-neon-cyan' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <VaporwaveButton
              variant="ghost"
              onClick={resetQuiz}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              RESTART
            </VaporwaveButton>
          </div>
        </VaporwaveCard>
      </div>
    </section>
  )
}

export default VapeQuiz