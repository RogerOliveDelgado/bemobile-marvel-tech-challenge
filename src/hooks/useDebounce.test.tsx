import { act, fireEvent, render, screen } from '@testing-library/react'
import React, { useState } from 'react'
import useDebounce from './useDebounce'

const TestComponent = ({ delay }: { delay: number }) => {
  const [inputValue, setInputValue] = useState('')
  const debouncedValue = useDebounce(inputValue, delay, () => {})

  return (
    <div>
      <input
        data-testid="input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p data-testid="debounced-value">{debouncedValue}</p>
    </div>
  )
}

describe('useDebounce', () => {
  jest.useFakeTimers()

  it('debounces the value after the specified delay', () => {
    render(<TestComponent delay={500} />)

    const input = screen.getByTestId('input')
    const output = screen.getByTestId('debounced-value')

    fireEvent.change(input, { target: { value: 'Hello' } })
    expect(output.textContent).toBe('')

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(output.textContent).toBe('Hello')
  })
})
