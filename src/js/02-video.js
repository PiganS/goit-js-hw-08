import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeRef = document.querySelector('#vimeo-player');
const player = new Player(iframeRef);

player.on('timeupdate', throttle(saveCurrentBrowsingTime, 1000));

function saveCurrentBrowsingTime(event) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(event.seconds)
  );
}

try {
  const savedTime = JSON.parse(
    localStorage.getItem('videoplayer-current-time')
  );
  if (savedTime !== null) {
    player.setCurrentTime(savedTime);
  }
} catch (error) {
  console.error(error.name, error.message);
}
