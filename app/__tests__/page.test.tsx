import { render, screen } from '@testing-library/react'
import Page from '../page'

describe('Portfolio page', () => {
  it('displays full name as heading', () => {
    render(<Page />)
    expect(screen.getByRole('heading', { name: /luis fu/i })).toBeInTheDocument()
  })

  it('displays job title', () => {
    render(<Page />)
    expect(screen.getByText(/software developer/i)).toBeInTheDocument()
  })

  it('displays location', () => {
    render(<Page />)
    expect(screen.getByText(/auckland, new zealand/i)).toBeInTheDocument()
  })

  it('displays all five skills', () => {
    render(<Page />)
    ;['React', 'Node.js', 'Python', 'PostgreSQL', 'AWS'].forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument()
    })
  })

  it('has a get in touch link pointing to the correct email', () => {
    render(<Page />)
    const link = screen.getByRole('link', { name: /get in touch/i })
    expect(link).toHaveAttribute('href', 'mailto:webfroot@hotmail.com')
  })
})
