import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FrontPage from '../FrontPage';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';


const navigate = vi.fn();

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe('FrontPage', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <FrontPage />
      </BrowserRouter>
    );

    // Check if all buttons are rendered
    expect(screen.getByText('Bookings')).toBeInTheDocument();
    expect(screen.getByText('Add Student')).toBeInTheDocument();
    expect(screen.getByText('Create Session')).toBeInTheDocument();
    expect(screen.getByText('Week Templates')).toBeInTheDocument();
    expect(screen.getByText('Create Week Template')).toBeInTheDocument();
  });

  it('navigates to the correct path when buttons are clicked', () => {
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useNavigate: () => navigate,
      };
    });

    render(
      <BrowserRouter>
        <FrontPage />
      </BrowserRouter>
    );

    // Simulate button clicks and test navigation
    fireEvent.click(screen.getByText('Bookings'));
    expect(navigate).toHaveBeenCalledWith('/bookings');

    fireEvent.click(screen.getByText('Add Student'));
    expect(navigate).toHaveBeenCalledWith('/add-student');

    // Repeat for other buttons...
  });
});
