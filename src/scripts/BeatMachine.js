class BeatMachinePlayer {
  BPM = 120
  beatLength = 0.5
  beatTimeMult = 2
  AnimeDelta = 1
  currentTrack = null
  PlayTrack = (fullFilenameWithPath, bpm) => {
    this.SetBPM(bpm);
    if (this.currentTrack != null) this.currentTrack.pause();
    this.currentTrack = new Audio(fullFilenameWithPath);
    this.currentTrack.play();
  }
  StopTrack = () => {
    if (this.currentTrack != null) this.currentTrack.pause();
  }
  GetBeat = () => {
    if (this.currentTrack != null)
      return (
        (this.currentTrack.currentTime + this.beatLength) * this.beatTimeMult
      );
    else {
      return 0;
    }
  }
  GetTimeCode = () => {
    if (this.currentTrack != null) return this.currentTrack.currentTime;
    else {
      return 0;
    }
  }
  SetBPM = (bpm) => {
    this.BPM = bpm;
    this.beatLength = 60 / this.BPM;
    this.beatTimeMult = this.BPM / 60;
    this.AnimeDelta = this.BPM / 120;
  }
}

export default BeatMachinePlayer;
