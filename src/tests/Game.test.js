import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const nomeTest = "Joao";
const emailTest = 'trybe@test.com';


describe('Crie um header que deve conter as informações da pessoa jogadora', () => {
    it('Será validado se a imagem do Gravatar está presente no header', () => {
        renderWithRouterAndRedux(<App />);

        const name = screen.getByTestId('input-player-name');
        const email = screen.getByTestId('input-gravatar-email');
        userEvent.type(email,emailTest);
        userEvent.type(name,nomeTest);
        const playBotao = screen.getByTestId('btn-play');

        const gravatar = screen.getByTestId('header-profile-picture');
        expect(gravatar).toBeInTheDocument();
    });

    it('Será validado se o nome da pessoa está presente no header', () => {
        renderWithRouterAndRedux(<App />);

        const name = screen.getByTestId('input-player-name');
        const email = screen.getByTestId('input-gravatar-email');
        userEvent.type(email,emailTest);
        userEvent.type(name,nomeTest);
        const playBotao = screen.getByTestId('btn-play');

        const playerName = screen.getByTestId('header-player-name')
        expect(playerName).toBeInTheDocument();
    });

    it('Será validado se o placar zerado está presente no header', () => {
        renderWithRouterAndRedux(<App />);

        const name = screen.getByTestId('input-player-name');
        const email = screen.getByTestId('input-gravatar-email');
        userEvent.type(email,emailTest);
        userEvent.type(name,nomeTest);
        const playBotao = screen.getByTestId('btn-play');

        const score = screen.getByTestId('header-score', { name: /0/i });
        expect(score).toBeInTheDocument();
    });
});