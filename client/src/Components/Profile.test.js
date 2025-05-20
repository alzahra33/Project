import Profile from "./Profile"
import { screen, render } from '@testing-library/react'
describe("test contact", () => {
    it("test image", () => {
        render(<Profile />)
        const element = screen.getByAltText("teachers logo")
        expect(element).toBeInTheDocument()
    })
    it("test heading", () => {
      render(<Profile />);
      const element = screen.getByText(/tt/i);
      expect(element).toBeInTheDocument();
    });

})
