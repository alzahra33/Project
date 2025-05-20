import { render, screen } from '@testing-library/react';
import Book from './Book';

describe("To test element", () => {
    it('renders Submit button', () => {
        render(<Book />);
        const submitButton = screen.getByRole('button', { name: /Book/i });
        expect(submitButton).toBeInTheDocument();
    });
    it('renders Check Box', () => {
        render(<Book />);
        const Q2 = screen.getByRole('userName');
        expect(Q2).toBeInTheDocument();
    });
    it('renders Check Box', () => {
        render(<Book />);
        const Q2 = screen.getByRole('email');
        expect(Q2).toBeInTheDocument();
    });
      
})