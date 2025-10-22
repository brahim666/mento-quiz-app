import React, { useState } from 'react'
import './App.css'

function App() {
  const [gameState, setGameState] = useState('welcome')
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [showExplanation, setShowExplanation] = useState(false)

  const questions = [
    {
      id: 1,
      question: "What is the primary goal of Mento Labs?",
      options: [
        "Building social media apps",
        "Creating onchain FX infrastructure with multi-currency stablecoins",
        "Developing video games",
        "Mining cryptocurrencies"
      ],
      correctAnswer: "Creating onchain FX infrastructure with multi-currency stablecoins",
      category: "Project Vision",
      explanation: "Mento Labs focuses on building decentralized foreign exchange infrastructure using multi-currency stablecoins."
    },
    {
      id: 2,
      question: "Which stablecoin is pegged to the US Dollar in Mento's ecosystem?",
      options: ["cEUR", "cUSD", "cREAL", "PUSO"],
      correctAnswer: "cUSD",
      category: "Stablecoins",
      explanation: "cUSD is Mento's US Dollar-pegged stablecoin, maintaining 1:1 parity with the US Dollar."
    },
    {
      id: 3,
      question: "What collateralization ratio does Mento use to maintain stability?",
      options: ["1:1", "2:1", "3:1", "4:1"],
      correctAnswer: "3:1",
      category: "Stability Mechanism",
      explanation: "Mento uses a 3:1 collateralization ratio to ensure stability and security of its stablecoins."
    },
    {
      id: 4,
      question: "How many countries have users of Mento stablecoins?",
      options: ["Over 50", "Over 100", "Over 140", "Over 200"],
      correctAnswer: "Over 140",
      category: "Global Reach",
      explanation: "Mento stablecoins are used by people in over 140 countries worldwide, demonstrating global adoption."
    },
    {
      id: 5,
      question: "What token is used for governance in the Mento protocol?",
      options: ["MENTO", "CELLO", "USDC", "ETH"],
      correctAnswer: "MENTO",
      category: "Governance",
      explanation: "The MENTO token is used for community governance, allowing holders to vote on protocol decisions."
    },
    {
      id: 6,
      question: "Which feature allows real-time verification of Mento's reserves?",
      options: ["Offchain audits", "Onchain transparency", "Centralized banking", "Private ledgers"],
      correctAnswer: "Onchain transparency",
      category: "Transparency",
      explanation: "Mento provides onchain transparency, allowing anyone to verify reserves in real-time."
    },
    {
      id: 7,
      question: "What is one key use case for Mento stablecoins?",
      options: ["International remittances", "Printing physical money", "Building hardware", "Social networking"],
      correctAnswer: "International remittances",
      category: "Use Cases",
      explanation: "Mento stablecoins are particularly useful for international remittances due to their low fees and fast settlement."
    },
    {
      id: 8,
      question: "How much trading volume did Mento handle in Q1 2025?",
      options: ["$500 million", "$1 billion", "$1.5 billion", "$2 billion"],
      correctAnswer: "$1.5 billion",
      category: "Trading Volume",
      explanation: "Mento processed $1.5 billion in trading volume during Q1 2025, showing significant market activity."
    },
    {
      id: 9,
      question: "Which stablecoin is pegged to the Kenyan Shilling?",
      options: ["cKES", "cNGN", "cZAR", "cGHS"],
      correctAnswer: "cKES",
      category: "African Stablecoins",
      explanation: "cKES is Mento's Kenyan Shilling-pegged stablecoin, serving the East African market."
    },
    {
      id: 10,
      question: "What makes Mento decentralized?",
      options: [
        "Controlled by a single company",
        "Governed by community consensus via MENTO token", 
        "Backed by governments only",
        "Limited to one currency"
      ],
      correctAnswer: "Governed by community consensus via MENTO token",
      category: "Decentralization",
      explanation: "Mento achieves decentralization through community governance using the MENTO token, rather than centralized control."
    }
  ]

  const startQuiz = () => {
    setGameState('quiz')
    setScore(0)
    setCurrentQuestion(0)
    setUserAnswers([])
    setShowExplanation(false)
  }

  const answerQuestion = (selectedAnswer) => {
    const currentQ = questions[currentQuestion]
    const isCorrect = selectedAnswer === currentQ.correctAnswer
    
    const newAnswer = {
      question: currentQ.question,
      selectedAnswer,
      correctAnswer: currentQ.correctAnswer,
      isCorrect,
      explanation: currentQ.explanation
    }

    setUserAnswers([...userAnswers, newAnswer])

    if (isCorrect) {
      setScore(score + 1)
    }

    setShowExplanation(true)
    
    setTimeout(() => {
      setShowExplanation(false)
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setGameState('results')
      }
    }, 3000)
  }

  const restartQuiz = () => {
    setGameState('welcome')
  }

  const getResultMessage = (percentage) => {
    if (percentage >= 90) return "🎉 Mento Expert! You're a stablecoin superstar!"
    if (percentage >= 70) return "👍 Great job! You know Mento Labs well!"
    if (percentage >= 50) return "💡 Good understanding! Keep learning about Mento!"
    return "📚 Good start! Explore more about Mento's FX infrastructure!"
  }

  return (
    <div className="App">
      <div className="container">
        {gameState === 'welcome' && (
          <div className="welcome">
            <h1>🧠 Mento Labs Quiz</h1>
            <p>Test your knowledge about Mento Labs and its revolutionary FX infrastructure!</p>
            <div className="quiz-info">
              <h3>Quiz Topics:</h3>
              <ul>
                <li>💱 Multi-currency Stablecoins</li>
                <li>🌍 Global FX Infrastructure</li>
                <li>🛡️ Stability Mechanisms</li>
                <li>🏛️ Governance & MENTO Token</li>
                <li>📊 Trading & Adoption Metrics</li>
              </ul>
            </div>
            <div className="quiz-stats">
              <p><strong>10</strong> questions • <strong>Mento Labs Focus</strong></p>
            </div>
            <button className="start-btn" onClick={startQuiz}>Start Quiz</button>
          </div>
        )}

        {gameState === 'quiz' && (
          <div className="quiz">
            <div className="quiz-header">
              <div className="progress">Question {currentQuestion + 1} of 10</div>
              <div className="score">Score: {score}</div>
            </div>
            
            <div className="question-category">{questions[currentQuestion].category}</div>
            
            <h2>{questions[currentQuestion].question}</h2>
            
            {!showExplanation ? (
              <div className="options">
                {questions[currentQuestion].options.map((option, index) => (
                  <button key={index} className="option-btn" onClick={() => answerQuestion(option)}>
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className={`explanation ${userAnswers[currentQuestion]?.isCorrect ? 'correct' : 'incorrect'}`}>
                <h3>{userAnswers[currentQuestion]?.isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h3>
                <p>{questions[currentQuestion].explanation}</p>
                <div className="next-message">Next question loading...</div>
              </div>
            )}
          </div>
        )}

        {gameState === 'results' && (
          <div className="results">
            <h1>Quiz Completed! 🎉</h1>
            
            <div className="score-card">
              <h2>Your Score</h2>
              <div className="score-circle">
                <span className="score-number">{score}/10</span>
                <span className="score-percentage">{((score / 10) * 100).toFixed(1)}%</span>
              </div>
              
              <p className="result-message">{getResultMessage((score / 10) * 100)}</p>
            </div>

            <div className="key-facts">
              <h3>Key Mento Labs Facts:</h3>
              <ul>
                <li>🌍 Used in <strong>140+ countries</strong></li>
                <li>💱 <strong>$1.5B</strong> Q1 2025 trading volume</li>
                <li>🛡️ <strong>3:1 collateralization</strong> ratio</li>
                <li>🏛️ <strong>MENTO token</strong> governance</li>
              </ul>
            </div>

            <button className="restart-btn" onClick={restartQuiz}>Take Quiz Again</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
