import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from "../home";

test('renders search bar', () => {
    render(<Home/>);
    const searchBar = screen.getByTestId('search-bar');
    expect(searchBar).toBeInTheDocument();
})


