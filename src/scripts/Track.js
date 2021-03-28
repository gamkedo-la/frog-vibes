import BeatMachine from "./BeatMachine";
import { updateEvent } from "./mainLoop";
import EventChannel from "./EventChannel";
const beatMachine = new BeatMachine();

class Track {
  static isMuted = false;
  track = [];
  fullTrack = [];
  hitSfx = null;
  missSfx = null;
  song = null;
  marginOfError = 0.5;
  isRunning = false;
  isStarted = false;
  Events = new EventChannel();
  constructor(song, trackList, hitSfx = null, missSfx = null) {
    this.song = song;
    // //TODO: reverse & validate
    this.track = [...trackList];
    this.fullTrack = [...trackList];
    if (hitSfx) {
      this.hitSfx = new Audio(hitSfx);
    }
    if (missSfx) {
      this.missSfx = new Audio(missSfx);
    }
    updateEvent.on("Update", this.Update);
  }
  Update = () => {
    if (this.track[0] + this.marginOfError < beatMachine.GetBeat()) {
      console.log("Missed without pressing a key!!!   " + this.track[0]);      
      this.track.shift();
    }
    if (this.isStarted && this.isRunning) {
      this.isRunning = !beatMachine.isRunning();
      if(!this.isRunning){
        this.Events.emit("Ended", { detail: "bwaap bwaaaaaa" });
      }
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
      if (this.missSfx != null && !Track.isMuted) {
        this.missSfx.play();
      }
    }
    return false;
  };
  Start() {
    beatMachine.PlayTrack(this.song, 144);
    this.isRunning = true;
    this.isStarted = true;
    // console.log(this.song);
  }
  Stop() {
    beatMachine.StopTrack();
    this.isRunning = false;
  }
  Continue() {
    beatMachine.ContinueTrack();
    this.isRunning = true;
  }
  static ToggleMuteAll() {
    Track.isMuted = BeatMachine.ToggleMuteAllTracks();    
    return Track.isMuted;
  }
}
export default Track;
