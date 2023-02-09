import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import {  screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockLogin from './helpers/mockLogin';

const nomeTest = 'Adriana';
const emailTest = 'email@email.com';

describe('Crie a tela de login, onde a pessoa que joga deve preencher as informações para iniciar um jogo', () => {
    it('Será validado se é possível escrever o nome da pessoa jogadora', () => {
       renderWithRouterAndRedux(<App />);

       const name = screen.getByTestId('input-player-name');
       expect(name).toBeInTheDocument();

       const email = screen.getByTestId('input-gravatar-email');
       expect(email).toBeInTheDocument();

    });
    it('Será validado se o botão "Play" está desabilitado quando a pessoa jogadora não preencher nenhum campo', () => {
        renderWithRouterAndRedux(<App />);

    const playBotao = screen.getByTestId('btn-play');
   
    expect(playBotao).toBeInTheDocument();
    expect(playBotao).toBeDisabled();

     });
     it('Será validado se o botão "Play" está desabilitado quando a pessoa jogadora escrever apenas o nome', () => {
        renderWithRouterAndRedux(<App />);

        const name = screen.getByTestId('input-player-name');
        userEvent.type(name,nomeTest);
        const playBotao = screen.getByTestId('btn-play');
        expect(playBotao).toBeDisabled();

     });

     it('Será validado se o botão "Play" está desabilitado quando a pessoa jogadora escrever apenas o email', () => {
        renderWithRouterAndRedux(<App />);

        const email = screen.getByTestId('input-gravatar-email');
        userEvent.type(email,emailTest);
        const playBotao = screen.getByTestId('btn-play');
        expect(playBotao).toBeDisabled();

     });

     it('Será validado se o botão "Play" está habilitado quando a pessoa jogadora preencher os campos de nome e email', () => {
        renderWithRouterAndRedux(<App />);

        const name = screen.getByTestId('input-player-name');
        const email = screen.getByTestId('input-gravatar-email');
        userEvent.type(email,emailTest);
        userEvent.type(name,nomeTest);
        const playBotao = screen.getByTestId('btn-play');
        expect(playBotao).not.toBeDisabled();

     });

})

describe('Crie o botão de iniciar o jogo', () => {
 it('Será validado se ao clicar no botão "Play" o jogo é iniciado salvando um token de jogador', () => {
    renderWithRouterAndRedux(<App />);


    global.fetch = jest.setTimeout(1000).fn(() =>
        Promise.resolve({
    json: () => Promise.resolve(mockLogin),
  })
);

    const name = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    userEvent.type(email,emailTest);
    userEvent.type(name,nomeTest);
    const playBotao = screen.getByTestId('btn-play');
    userEvent.click(playBotao);

    expect(fetch).toHaveBeenCalled();
     
 })
})

describe(' Crie um botão que leva a pessoa para tela de configuração', () => {
    it('Será validado se o botão existe na página', () => {
        renderWithRouterAndRedux(<App />);

    const configBotao = screen.getByTestId('btn-settings');
   
    expect(configBotao).toBeInTheDocument();
    })

    it('Será validado se a tela de configurações possui um título', () => {
        renderWithRouterAndRedux(<App />);

        const configBotao = screen.getByTestId('btn-settings');
        userEvent.click(configBotao);

        const h1 = screen.getByRole('heading', {level: 1, name: /Configuração/i} )
        expect(h1).toBeInTheDocument();

        const configH1 = screen.getByTestId('settings-title');
        expect(configH1).toBeInTheDocument();
    })
})
