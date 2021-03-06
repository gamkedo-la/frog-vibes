class BeatMachinePlayer {
  static tracks = []  
  BPM = 120;
  beatLength = 0.5;
  beatTimeMult = 2;
  AnimeDelta = 1;
  currentTrack = null;
  PlayTrack = (fullFilenameWithPath, bpm) => {
    this.SetBPM(bpm);
    if (this.currentTrack != null) this.currentTrack.pause();
    this.currentTrack = new Audio(fullFilenameWithPath);
    BeatMachinePlayer.tracks.push(this.currentTrack);
    this.currentTrack.play();
  };
  StopTrack = () => {
    if (this.currentTrack != null) this.currentTrack.pause();
  };
  ContinueTrack = () => {
    if (this.currentTrack != null) this.currentTrack.play();
  }
  GetBeat = () => {
    if (this.currentTrack != null)
      return (
        (this.currentTrack.currentTime + this.beatLength) * this.beatTimeMult
      );
    else {
      return 0;
    }
  };
  isRunning = () => {
    return this.currentTrack.ended;
  }
  GetTimeCode = () => {
    if (this.currentTrack != null) return this.currentTrack.currentTime;
    else {
      return 0;
    }
  };
  SetBPM = (bpm) => {
    this.BPM = bpm;
    this.beatLength = 60 / this.BPM;
    this.beatTimeMult = this.BPM / 60;
    this.AnimeDelta = this.BPM / 120;
  }
  static ToggleMuteAllTracks = () => {
    let muted = true;
    BeatMachinePlayer.tracks.forEach(track => {
      if (track.volume > 0) {
        track.volume = 0;
        muted = true;      
      }
      else {
        track.volume = 1;
        muted = false;
      }    
    });
    return muted;
  }
}

export default BeatMachinePlayer;
