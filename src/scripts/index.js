import '../styles/index.scss';
import BeatMachinePlayer from "./BeatMachine";


if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

console.log('webpack starterkit');
document.onkeypress=function(e){
    BeatMachinePlayer.PlayTrack("public/audio/track1.wav", 144);
};