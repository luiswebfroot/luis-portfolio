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

  it('displays skills', () => {
    render(<Page />)
    ;['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'].forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument()
    })
  })

  it('has a get in touch button', () => {
    render(<Page />)
    expect(screen.getByRole('button', { name: /get in touch/i })).toBeInTheDocument()
  })
})
