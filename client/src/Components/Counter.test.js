import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter component", () => {
  it("counter displays correct initial count", () => { 
    render(<Counter initialCount={5} />);
    const h3element = screen.getByTestId("count");
    expect(h3element).toHaveTextContent("5");
  });

  it("increments the count when the increment button is clicked", () => {
    render(<Counter initialCount={5} />);
    const h3element = screen.getByTestId("count");
    const btnelement = screen.getByTestId("increment");
    fireEvent.click(btnelement);
    expect(h3element).toHaveTextContent("6");
  });

  it("decrements the count when the decrement button is clicked", () => {
    render(<Counter initialCount={5} />);
    const h3element = screen.getByTestId("count");
    const btnelement = screen.getByTestId("decrement");
    fireEvent.click(btnelement);
    expect(h3element).toHaveTextContent("4");
  });

  it("resets the count when the restart button is clicked", () => {
    render(<Counter initialCount={5} />);
    const h3element = screen.getByTestId("count");
    const restartBtn = screen.getByTestId("restart");
    fireEvent.click(restartBtn);
    expect(h3element).toHaveTextContent("0");
  });

  it("switches the sign of the count when the switch sign button is clicked", () => {
    render(<Counter initialCount={5} />);
    const h3element = screen.getByTestId("count");
    const switchBtn = screen.getByTestId("switchsign");
    fireEvent.click(switchBtn);
    expect(h3element).toHaveTextContent("-5");
  });
});
export default Counter;

