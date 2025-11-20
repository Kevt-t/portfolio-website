'use client'

import { useState } from 'react'
import { Delete } from 'lucide-react'

const Button = ({ children, onClick, className = '', span = false }: any) => (
  <button
    onClick={onClick}
    className={`
      ${span ? 'col-span-2' : ''} h-14 rounded-win11-sm
      bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
      text-gray-800 dark:text-gray-200 font-medium smooth-transition
      active:scale-95 ${className}
    `}
  >
    {children}
  </button>
)

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [easterEggClicks, setEasterEggClicks] = useState(0)

  const easterEggMessages = [
    "There's more interesting things ya know",
    "This is the least cool thing here",
    "Ok you're getting the silent treatment now",
    "..."
  ]

  const handleEasterEggClick = () => {
    const messageIndex = Math.min(easterEggClicks, easterEggMessages.length - 1)
    setDisplay(easterEggMessages[messageIndex])
    setEasterEggClicks(easterEggClicks + 1)
  }

  const handleNumber = (num: string) => {
    handleEasterEggClick()
  }

  const handleOperation = (op: string) => {
    handleEasterEggClick()
  }

  const calculate = () => {
    handleEasterEggClick()
  }

  const handleClear = () => {
    handleEasterEggClick()
  }

  const handleBackspace = () => {
    handleEasterEggClick()
  }

  const handleDecimal = () => {
    handleEasterEggClick()
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 p-4">
      {/* Display */}
      <div className="mb-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-win11 text-right">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 h-4">
          {/* Placeholder for operation history if needed */}
        </div>
        <div className="text-4xl font-light text-gray-800 dark:text-gray-200 truncate pb-1">
          {display}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2">
        <Button onClick={handleClear} className="bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50">
          C
        </Button>
        <Button onClick={handleBackspace}>
          <Delete className="w-5 h-5 mx-auto" />
        </Button>
        <Button onClick={() => handleOperation('÷')}>÷</Button>
        <Button onClick={() => handleOperation('×')}>×</Button>

        <Button onClick={() => handleNumber('7')}>7</Button>
        <Button onClick={() => handleNumber('8')}>8</Button>
        <Button onClick={() => handleNumber('9')}>9</Button>
        <Button onClick={() => handleOperation('-')}>−</Button>

        <Button onClick={() => handleNumber('4')}>4</Button>
        <Button onClick={() => handleNumber('5')}>5</Button>
        <Button onClick={() => handleNumber('6')}>6</Button>
        <Button onClick={() => handleOperation('+')}>+</Button>

        <Button onClick={() => handleNumber('1')}>1</Button>
        <Button onClick={() => handleNumber('2')}>2</Button>
        <Button onClick={() => handleNumber('3')}>3</Button>
        <Button onClick={calculate} className="row-span-2 bg-blue-500 hover:bg-blue-600 text-white">
          =
        </Button>

        <Button onClick={() => handleNumber('0')} span>0</Button>
        <Button onClick={handleDecimal}>.</Button>
      </div>
    </div>
  )
}
