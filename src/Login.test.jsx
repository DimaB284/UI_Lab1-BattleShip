import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login'; 
import '@testing-library/jest-dom';

describe('Login component test', () => {
  test('render label and button clicks check', () => {
    render(<Login />);
    
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('text entering to inputs check', async () => {
    render(<Login />);
    const user = userEvent.setup();
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    await user.type(emailInput, 'admiral@fleet.com');
    await user.type(passwordInput, 'topSecret123');

    expect(emailInput).toHaveValue('admiral@fleet.com');
    expect(passwordInput).toHaveValue('topSecret123');
  });
});