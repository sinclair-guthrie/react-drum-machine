import React from 'react';
import './App.css';
import bassDrum from "./assets/bass_drum.mp3";
import snare from "./assets/snare.mp3";
import drumsticksHit from "./assets/drumsticks_hit.mp3";
import hiHatClosed from "./assets/hi_hat_closed.mp3";
import hiHatOpen from "./assets/hi_hat_open.mp3";
import hiHatFootPedal from "./assets/hi_hat_foot_pedal.mp3";
import floorTomDrum from "./assets/floor_tom_drum.mp3";
import shh from "./assets/shh.mp3";
import snap from "./assets/snap.mp3";

const drumSounds = [
  {
    key: "Q",
    keyCode: 81,
    link: bassDrum,
    descr: "bass drum"
  },
  {
    key: "W",
    keyCode: 87,
    link: snare,
    descr: "snare"
  },
  {
    key: "E",
    keyCode: 69,
    link: drumsticksHit,
    descr: "drumsticks hit"
  },
  {
    key: "A",
    keyCode: 65,
    link: hiHatClosed,
    descr: "hi-hat-closed"
  },
  {
    key: "S",
    keyCode: 83,
    link: hiHatOpen,
    descr: "hi-hat-open"
  },
  {
    key: "D",
    keyCode: 68,
    link: hiHatFootPedal,
    descr: "hi-hat foot pedal"
  },
  {
    key: "Z",
    keyCode: 90,
    link: floorTomDrum,
    descr: "floor tom drum"
  },
  {
    key: "X",
    keyCode: 88,
    link: shh,
    descr: "shh"
  },
  {
    key: "C",
    keyCode: 67,
    link: snap,
    descr: "snap"
  }
];

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      lastPlayed: null
    }
    this.playSound = this.playSound.bind(this);
  }
  
  playSound(x) {
    x.currentTime = 0;
    x.play();
    this.setState ({
      lastPlayed: x.parentElement.id
    })
  }
  
  
  render() {
    return (
      <div id="drum-machine">
        <div id="display">
          Last hit: <br />
          {this.state.lastPlayed}
        </div>
        <div id="button-area">
          <Button soundIndex="0" playSound={this.playSound} />
          <Button soundIndex="1" playSound={this.playSound} />
          <Button soundIndex="2" playSound={this.playSound} />
          <Button soundIndex="3" playSound={this.playSound} />
          <Button soundIndex="4" playSound={this.playSound} />
          <Button soundIndex="5" playSound={this.playSound} />
          <Button soundIndex="6" playSound={this.playSound} />
          <Button soundIndex="7" playSound={this.playSound} />
          <Button soundIndex="8" playSound={this.playSound} />
        </div>
      </div>
    )
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeypress)
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeypress)
  }
  
  handleClick(e) {
    let var1 = e.target.firstElementChild
    this.props.playSound(var1);
  }
  
  handleKeypress(e) {
   let indexVar = drumSounds.findIndex(x => x.keyCode === e.keyCode)
   if (indexVar !== -1) {
     let elemVar = document.getElementById(drumSounds[indexVar].key)
     this.props.playSound(elemVar);
   }
  }
  
  render() {
    const soundIndex = this.props.soundIndex;
    const keyName = drumSounds[soundIndex].key;
    return (<button 
          id={drumSounds[soundIndex].descr}
          class="drum-pad btn"
          onClick={this.handleClick}
          >
          {keyName}
          <audio
            id={keyName}
            class="clip"
            src={drumSounds[soundIndex].link}
            >
          </audio>
        </button>)
  }
}

export default App;
