import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '@/App';

describe('App', () => {
    it('renders CountriesPage at root route', async () => {
        render(React.createElement(App));

        expect(await screen.findByText(/Where in the world\?/i)).toBeInTheDocument();
    });

    // it('renders 404 page on unknown route', () => {
    //     render(React.createElement(App));
    //
    //     expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    // });
});
