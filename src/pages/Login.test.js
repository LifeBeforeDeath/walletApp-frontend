// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { MemoryRouter } from 'react-router-dom';
// import configureStore from 'redux-mock-store';
// import Login from './Login';

// const mockStore = configureStore([]);

// describe('Login component', () => {
//   let store;

//   beforeEach(() => {
//     store = mockStore({
//       user: {
//         id: '',
//         email: '',
//       },
//     });
//   });

//   it('should render the login form', () => {
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <Login />
//         </MemoryRouter>
//       </Provider>
//     );
//     const emailInput = screen.getByPlaceholderText('Email Address');
//     const passwordInput = screen.getByPlaceholderText('Password');
//     const submitButton = screen.getByRole('button', { name: 'Log In' });

//     expect(emailInput).toBeInTheDocument();
//     expect(passwordInput).toBeInTheDocument();
//     expect(submitButton).toBeInTheDocument();
//   });

//   it('should submit the form with valid credentials', async () => {
//     const loginUser = jest.fn().mockResolvedValue({ userId: '123' });
//     const navigate = jest.fn();

//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <Login loginUser={loginUser} navigate={navigate} />
//         </MemoryRouter>
//       </Provider>
//     );

//     const emailInput = screen.getByPlaceholderText('Email Address');
//     const passwordInput = screen.getByPlaceholderText('Password');
//     const submitButton = screen.getByRole('button', { name: 'Log In' });

//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password' } });

//     fireEvent.click(submitButton);

//     expect(loginUser).toHaveBeenCalledWith('test@example.com', 'password');
//     expect(localStorage.getItem('userId')).toBe('123');
//     expect(navigate).toHaveBeenCalledWith('/dashboard');
//   });

//   it('should display an error message with invalid credentials', async () => {
//     const loginUser = jest.fn().mockRejectedValue(new Error('Invalid credentials'));

//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <Login loginUser={loginUser} />
//         </MemoryRouter>
//       </Provider>
//     );

//     const emailInput = screen.getByPlaceholderText('Email Address');
//     const passwordInput = screen.getByPlaceholderText('Password');
//     const submitButton = screen.getByRole('button', { name: 'Log In' });

//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password' } });

//     fireEvent.click(submitButton);

//     const errorMessage = await screen.findByText('Invalid credentials');
//     expect(errorMessage).toBeInTheDocument();
//   });
// });
