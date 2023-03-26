import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from "../home";

test('renders search bar', () => {
    render(<Home/>);
    const searchBar = screen.getByTestId('search-bar');
    expect(searchBar).toBeInTheDocument();
})

// test('api calls are made and searches are performed on btn click', async() => {
//     render(<Home/>);
//     const searchBar = screen.getByTestId('search-bar');
//     fireEvent.change(searchBar, { target: { value: 'support'}});
//     const searchBtn = screen.getByRole('button');
//     fireEvent.click(searchBtn);
//     await waitFor(() => expect(screen.getByTestId('result')).toBeInTheDocument());
// })