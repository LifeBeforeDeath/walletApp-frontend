import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import ErrorPage from './Error';
import { MemoryRouter } from 'react-router-dom';

describe('ErrorPage', () => {
  test('renders Oops! heading', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
    const headingElement = screen.getByText(/Oops!/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders 404 Not Found subheading', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
    const subheadingElement = screen.getByText(/404 Not Found/i);
    expect(subheadingElement).toBeInTheDocument();
  });

  test('renders error message', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
    const errorDetailsElement = screen.getByText(
      "Sorry, an error has occured, Requested page not found!"
    );
    expect(errorDetailsElement).toBeInTheDocument();
  });

  test('renders Take Me Home button with link to home page', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
    const linkElement = screen.getByRole('link', { name: /Take Me Home/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe('/');
  });
});
