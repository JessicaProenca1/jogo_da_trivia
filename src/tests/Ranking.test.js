import App from '../App';
import Ranking from '../pages/Ranking';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import {  screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe(' Crie um botão que leva a pessoa para tela de configuração', () => {
    it('Será validado se o botão existe na página', () => {
      renderWithRouterAndRedux(<Ranking />);

      const configBotao = screen.getByTestId('btn-go-home');
   
      expect(configBotao).toBeInTheDocument();
    })

    it('Será validado se a tela de configurações possui um título', () => {
      renderWithRouterAndRedux(<Ranking />);

      const h1 = screen.getByRole('heading', {level: 1, name: /Ranking/i} )
      expect(h1).toBeInTheDocument();

      const configH1 = screen.getByTestId('ranking-title');
      expect(configH1).toBeInTheDocument();

      const configBotao = screen.getByTestId('btn-go-home');
      userEvent.click(configBotao);

      const name = screen.getByTestId('input-player-name');
      expect(name).toBeInTheDocument();

    })
})
