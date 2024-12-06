import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import useLocalStorage from './useLocalStorage'

const TestComponent = ({ storageKey }: { storageKey: string }) => {
  const { storedValue, setStoredValue } = useLocalStorage(
    storageKey,
    'Initial Value'
  )

  return (
    <div>
      <div data-testid="stored-value">{storedValue}</div>
      <button
        data-testid="update-button"
        onClick={() => setStoredValue('Updated')}
      >
        Update
      </button>
    </div>
  )
}

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('initializes with the correct value', () => {
    render(<TestComponent storageKey="test-key" />)

    expect(screen.getByTestId('stored-value')).toHaveTextContent(
      'Initial Value'
    )
    expect(window.localStorage.getItem('test-key')).toBe(
      JSON.stringify('Initial Value')
    )
  })

  it('updates the value and saves to localStorage', () => {
    render(<TestComponent storageKey="test-key" />)

    const updateButton = screen.getByTestId('update-button')
    fireEvent.click(updateButton)

    expect(screen.getByTestId('stored-value')).toHaveTextContent('Updated')
    expect(window.localStorage.getItem('test-key')).toBe(
      JSON.stringify('Updated')
    )
  })
})
