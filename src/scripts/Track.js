import BeatMachine from "./BeatMachine";
import { updateEvent } from "./mainLoop";
import EventChannel from "./EventChannel";
const beatMachine = new BeatMachine();

class Track {
  static isMuted = false;
  track = [];
  fullTrack = [];
  hitSfx = null;
  song = null;
  marginOfError = 0.5;
  Events = new EventChannel();
  constructor(song, trackList, hitSfx = null) {
    this.song = song;
    // //TODO: reverse & validate
    this.track = [...trackList];
    this.fullTrack = [...trackList];
    if (hitSfx) {
      this.hitSfx = new Audio(hitSfx);
    }
    updateEvent.on("Update", this.Update);
  }
  Update = () => {
    if (this.track[0] + this.marginOfError < beatMachine.GetBeat()) {
      console.log("Missed without pressing a key!!!   " + this.track[0]);      
      this.track.shift();
    }
  };
  IsHit = () => {
    let beat = beatMachine.GetBeat();
    let targetBeat = this.track[0];
    if (
      beat > targetBeat - this.marginOfError &&
      beat < targetBeat + this.marginOfError
    ) {
      console.log("Hit!!!   " + targetBeat);
      this.Events.emit("Hit", { detail: targetBeat });
      this.track.shift();
      if (this.hitSfx != null && !Track.isMuted) {
        this.hitSfx.play();
      }
      return true;
    }
    else {
      targetBeat = targetBeat ? targetBeat : "Track ended!";
      console.log("Hit missed!!!   " + targetBeat);
      this.Events.emit("Miss", { detail: targetBeat });
      if (this.track[0] + this.marginOfError < beatMachine.GetBeat()) {
        this.track.shift();
      }
    }
    return false;
  };
  Start() {
    beatMachine.PlayTrack(this.song, 144);
    // console.log(this.song);
  }
  Stop() {
    beatMachine.StopTrack();
  }
  Continue() {
    beatMachine.ContinueTrack();
  }
  static ToggleMuteAll() {
    Track.isMuted = BeatMachine.ToggleMuteAllTracks();    
    return Track.isMuted;
  }
}
export default Track;
