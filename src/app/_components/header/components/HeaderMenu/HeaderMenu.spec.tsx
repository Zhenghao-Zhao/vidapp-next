import { screen, render } from "@testing-library/react"
import HeaderMenu from "./HeaderMenu"
import Providers from "@/app/_contexts/providers";

describe('renders elements correctly', () => {
  it('renders login button correctly', async () => {
    const setIsOpen = jest.fn();
    render(<HeaderMenu setIsOpen={setIsOpen} />, {wrapper: Providers})
    const button = await screen.findByRole('button', {name: 'Sign in'})
    expect(button).toBeInTheDocument();
  })
})