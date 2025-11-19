'use client'

import { useState } from 'react'
import { Delete } from 'lucide-react'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false)

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num)
      setShouldResetDisplay(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleOperation = (op: string) => {
    const current = parseFloat(display)

    if (previousValue !== null && operation && !shouldResetDisplay) {
      calculate()
    } else {
      setPreviousValue(current)
    }

    setOperation(op)
    setShouldResetDisplay(true)
  }

  const calculate = () => {
    if (previousValue === null || operation === null) return

    const current = parseFloat(display)
    let result = 0

    switch (operation) {
      case '+':
        result = previousValue + current
        break
      case '-':
        result = previousValue - current
        break
      case '×':
        result = previousValue * current
        break
      case '÷':
        result = current !== 0 ? previousValue / current : 0
        break
    }

    setDisplay(result.toString())
    setPreviousValue(null)
    setOperation(null)
    setShouldResetDisplay(true)
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setShouldResetDisplay(false)
  }

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.')
      setShouldResetDisplay(false)
    }
  }

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

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 p-4">
      {/* Display */}
      <div className="mb-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-win11 text-right">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 h-4">
          {previousValue !== null && operation ? `${previousValue} ${operation}` : ''}
        </div>
        <div className="text-4xl font-light text-gray-800 dark:text-gray-200 truncate">
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
