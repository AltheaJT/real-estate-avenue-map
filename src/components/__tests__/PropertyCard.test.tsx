import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PropertyCard from '../PropertyCard'

const mockProperty = {
  id: 1,
  title: 'Test Property',
  price: '₦500,000',
  location: 'Test Location',
  bedrooms: 3,
  bathrooms: 2,
  area: 150,
  type: 'sale' as const,
  status: 'available' as const,
  image: 'test-image.jpg',
  agent: {
    name: 'Test Agent',
    phone: '+234123456789',
    email: 'agent@test.com'
  }
}

describe('PropertyCard', () => {
  it('renders property information correctly', () => {
    const { getByText } = render(<PropertyCard property={mockProperty} />)
    
    expect(getByText('Test Property')).toBeInTheDocument()
    expect(getByText('₦500,000')).toBeInTheDocument()
    expect(getByText('3')).toBeInTheDocument()
    expect(getByText('2')).toBeInTheDocument()
    expect(getByText('150')).toBeInTheDocument()
  })

  it('displays agent contact information', () => {
    const { getByText } = render(<PropertyCard property={mockProperty} />)
    
    expect(getByText('Test Agent')).toBeInTheDocument()
    expect(getByText('+234123456789')).toBeInTheDocument()
    expect(getByText('agent@test.com')).toBeInTheDocument()
  })
})