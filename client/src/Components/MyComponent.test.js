import { render, screen } from "@testing-library/react";
import MyComponent from "./MyComponent";

describe("test contact", () => {
    it("renders the submit button", () => {
        render(<MyComponent />);
        const e1 = screen.getByTestId("e1");
        expect(e1).toBeInTheDocument();
      });
      

})


