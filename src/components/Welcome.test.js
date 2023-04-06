import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WelcomePage from './Welcome';


describe('WelcomePage', () => {


  test('renders page title', () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    );
    const pageTitle = screen.getByText('My Wallet App');
    expect(pageTitle).toBeInTheDocument();
  });

  test('renders page description', () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    );
    const pageDescription = screen.getByText('Create your account to manage your daily expense and hisab kitab');
    expect(pageDescription).toBeInTheDocument();
  });

  test('renders sign up and login links', () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    );
    const signUpLink = screen.getByRole('link', { name: 'Sign Up' });
    const loginLink = screen.getByRole('link', { name: 'Login' });
    expect(signUpLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });
});
