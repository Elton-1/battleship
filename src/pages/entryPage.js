import header from '../components/header';
import difficultyPage from './difficultyPage';
import playerVsPlayer from './playerVsPlayer';
const body = document.querySelector('body');

export default () => {
  body.classList.remove('transition');
  header();

  const btnContainer = document.createElement('div');

  btnContainer.classList.add('btn-container');

  const btnPlayerVsPlayer = document.createElement('button');
  const btnPlayerVsBot = document.createElement('button');

  btnPlayerVsPlayer.textContent = 'Player vs Player';
  btnPlayerVsPlayer.classList.add('player-vs-player-btn');

  btnPlayerVsBot.textContent = 'Player vs Bot';
  btnPlayerVsBot.classList.add('player-vs-bot-btn');

  btnContainer.appendChild(btnPlayerVsPlayer);
  btnContainer.appendChild(btnPlayerVsBot);

  body.appendChild(btnContainer);

  btnPlayerVsPlayer.onclick = () => {
    body.innerHTML = '';
    body.classList.add('transition');

    playerVsPlayer(10, 10);
  };

  btnPlayerVsBot.onclick = () => {
    body.innerHTML = '';
    body.classList.add('transition');
    
    difficultyPage();
  };
};
