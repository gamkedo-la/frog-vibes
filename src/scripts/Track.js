import BeatMachine from "./BeatMachine";
import { events } from "./mainLoop";
const beatMachine = new BeatMachine();
class Track {
  track = [];
  fullTrack = [];
  song = null;
  marginOfError = 0.5;
  constructor(song, trackList) {
    this.song = song;
    // //TODO: reverse & validate
    this.track = [...trackList];
    this.fullTrack = [...trackList];
    events.on("update", this.Update);
  }
  Update = ()=> {
    if (this.track[0] + this.marginOfError < beatMachine.GetBeat()) {
        console.log("MISS!!!   " + this.track[0]);
        this.track.shift();
    }
  }
    IsHit = () => {
        let beat = beatMachine.GetBeat();
        let targetBeat = this.track[0];
    if (
      beat > targetBeat - this.marginOfError &&
      beat < targetBeat + this.marginOfError
    ) {
      console.log("Hit!!!   " + this.track[0]);
      this.track.shift();
      return true;
    }
        return false;
  };
  Start() {
    beatMachine.PlayTrack(this.song, 144);
    // console.log(this.song);
  }
}
export default Track;
