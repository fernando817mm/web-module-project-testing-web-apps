import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = 'Fer';
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, firstName);
    const error = screen.getByTestId('error');
    expect(error).toHaveTextContent('Error: firstName must have at least 5 characters.');
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
    const error = screen.queryAllByTestId('error');
    expect(error[0]).toHaveTextContent('Error: firstName must have at least 5 characters.');
    expect(error[1]).toHaveTextContent('Error: lastName is a required field.');
    expect(error[2]).toHaveTextContent('Error: email must be a valid email address.');
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstName = 'Fernando';
    const lastName = 'Martinez';
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const submitButton = screen.getByRole('button');
    userEvent.type(firstNameInput, firstName);
    userEvent.type(lastNameInput, lastName);
    userEvent.click(submitButton);
    const error = screen.getByTestId('error');
    expect(error).toHaveTextContent('Error: email must be a valid email address.');
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const firstName = 'Fernando';
    const lastName = 'Martinez';
    const email = 'fernando817mm';
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button');
    userEvent.type(firstNameInput, firstName);
    userEvent.type(lastNameInput, lastName);
    userEvent.type(emailInput, email);
    userEvent.click(submitButton);
    const error = screen.getByTestId('error');
    expect(error).toHaveTextContent('Error: email must be a valid email address.');
});

test('renders "lastName is a required field" if a last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const firstName = 'Fernando';
    const email = 'fernando817mm@gmail.com';
    const firstNameInput = screen.getByLabelText(/first name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button');
    userEvent.type(firstNameInput, firstName);
    userEvent.type(emailInput, email);
    userEvent.click(submitButton);
    const error = screen.getByTestId('error');
    expect(error).toHaveTextContent('Error: lastName is a required field.');
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstName = 'Fernando';
    const lastName = 'Martinez';
    const email = 'fernando817mm@gmail.com';
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button');
    userEvent.type(firstNameInput, firstName);
    userEvent.type(lastNameInput, lastName);
    userEvent.type(emailInput, email);
    userEvent.click(submitButton);
    const firstDisplay = screen.getByTestId('firstnameDisplay');
    const lastDisplay = screen.getByTestId('lastnameDisplay');
    const emailDisplay = screen.getByTestId('emailDisplay');
    const messageDisplay = screen.queryByTestId('messageDisplay');
    expect(firstDisplay).toHaveTextContent(firstName);
    expect(lastDisplay).toHaveTextContent(lastName);
    expect(emailDisplay).toHaveTextContent(email);
    expect(messageDisplay).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const firstName = 'Fernando';
    const lastName = 'Martinez';
    const email = 'fernando817mm@gmail.com';
    const message = 'n/a';
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button');
    userEvent.type(firstNameInput, firstName);
    userEvent.type(lastNameInput, lastName);
    userEvent.type(emailInput, email);
    userEvent.type(messageInput, message);
    userEvent.click(submitButton);
    const firstDisplay = screen.getByTestId('firstnameDisplay');
    const lastDisplay = screen.getByTestId('lastnameDisplay');
    const emailDisplay = screen.getByTestId('emailDisplay');
    const messageDisplay = screen.queryByTestId('messageDisplay');
    expect(firstDisplay).toHaveTextContent(firstName);
    expect(lastDisplay).toHaveTextContent(lastName);
    expect(emailDisplay).toHaveTextContent(email);
    expect(messageDisplay).toBeInTheDocument();
});