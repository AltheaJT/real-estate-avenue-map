import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import Navbar from '../Navbar'

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Navbar', () => {
  it('renders the logo', () => {
    const { getByText } = renderNavbar()
    expect(getByText('PropertyHub')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    const { getByText } = renderNavbar()
    expect(getByText('Properties')).toBeInTheDocument()
    expect(getByText('Map')).toBeInTheDocument()
    expect(getByText('About')).toBeInTheDocument()
  })
})