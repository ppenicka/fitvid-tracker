import React, { Component } from "react";
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import UIfx from 'uifx';
import Bell from '../../Asset/Temple Bell-SoundBible.com-756181215.mp3';



const alarmSound = new UIfx(Bell);

class Countdown extends Component {

  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        // alert("Countdown ended"); it'll not play the sound until you close the alert, so for now commented out
        alarmSound.play();
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };

  resetTimer = () => {
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: this.state.timerStart
      });
    }
  };

  adjustTimer = input => {
    const { timerTime, timerOn } = this.state;
    const max = 216000000;
    if (!timerOn) {
      if (input === "incHours" && timerTime + 3600000 < max) {
        this.setState({ timerTime: timerTime + 3600000 });
      } else if (input === "decHours" && timerTime - 3600000 >= 0) {
        this.setState({ timerTime: timerTime - 3600000 });
      } else if (input === "incMinutes" && timerTime + 60000 < max) {
        this.setState({ timerTime: timerTime + 60000 });
      } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
        this.setState({ timerTime: timerTime - 60000 });
      } else if (input === "incSeconds" && timerTime + 1000 < max) {
        this.setState({ timerTime: timerTime + 1000 });
      } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
        this.setState({ timerTime: timerTime - 1000 });
      }
    }
  };

  convertToMilliseconds = (time) => {
    const regex = /[,:;.]/;
    if(time.match(regex)===null) return Number(time)*1000;
    if(time.split(regex).length===2) {
      const seconds = Number(time.split(regex)[1])*1000;
      const minutes = Number(time.split(regex)[0])*60000;
      return Number(minutes+seconds)
    }
    if(time.split(regex).length===3) {
      const seconds = Number(time.split(regex)[2])*1000;
      const minutes = Number(time.split(regex)[1])*60000;
      const hours = Number(time.split(regex)[0])*3600000;
      return Number(hours+minutes+seconds)
    }
    return undefined;
  };

  render() {

    const { timerTime, timerStart, timerOn,} = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return (
      <div>
        <Typography variant="h6">Timer Countdown</Typography>
        <Typography variant="body1">Hr : Min : Sec</Typography>
          <div className="Countdown-display">
            <IconButton size="small" onClick={() => this.adjustTimer("incHours")}><KeyboardArrowUpIcon/></IconButton>
            <IconButton size="small" onClick={() => this.adjustTimer("incMinutes")}><KeyboardArrowUpIcon/></IconButton>
            <IconButton size="small" onClick={() => this.adjustTimer("incSeconds")}><KeyboardArrowUpIcon/></IconButton>
              <div className="Countdown-time">
                <Typography variant="body1" style={{marginLeft: "5px"}}>{hours} : {minutes} : {seconds}</Typography>
              </div>
            <IconButton size="small" onClick={() => this.adjustTimer("decHours")}><KeyboardArrowDownIcon/></IconButton>
            <IconButton size="small" onClick={() => this.adjustTimer("decMinutes")}><KeyboardArrowDownIcon/></IconButton>
            <IconButton size="small" onClick={() => this.adjustTimer("decSeconds")}><KeyboardArrowDownIcon/></IconButton>
          </div>
        {timerOn === false &&
          (timerStart === 0 || timerTime === timerStart) && (
            <Button onClick={this.startTimer}>Start</Button>
          )}
        {timerOn === true && timerTime >= 1000 && (
          <Button onClick={this.stopTimer}>Stop</Button>
          )}
        {timerOn === false &&
          (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
            <Button onClick={this.startTimer}>Resume</Button>
          )}
        {(timerOn === false || timerTime < 1000) &&
          (timerStart !== timerTime && timerStart > 0) && (
            <Button onClick={this.resetTimer}>Reset</Button>
          )}
          <br/>
          <TextField type="text" label="Set Timer" onChange={(event) => {
            this.setState({
              timerTime: (this.convertToMilliseconds(event.target.value))
            })}}></TextField>
      </div>
    );
  }
}
export default Countdown;