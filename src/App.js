import React from 'react';
import './App.css';

const drumSounds = [
  {
    key: "Q",
    keyCode: 81,
    link: "./assets/bass_drum.mp3",
    descr: "bass drum"
  },
  {
    key: "W",
    keyCode: 87,
    link: "./assets/snare.mp3",
    descr: "snare"
  },
  {
    key: "E",
    keyCode: 69,
    link: "./assets/drumsticks_hit.mp3",
    descr: "drumsticks hit"
  },
  {
    key: "A",
    keyCode: 65,
    link: "./assets/hi_hat_closed.mp3",
    descr: "hi-hat-closed"
  },
  {
    key: "S",
    keyCode: 83,
    link: "./assets/hi_hat_open.mp3",
    descr: "hi-hat-open"
  },
  {
    key: "D",
    keyCode: 68,
    link: "./assets/hi_hat_foot_pedal.mp3",
    descr: "hi-hat foot pedal"
  },
  {
    key: "Z",
    keyCode: 90,
    link: "./assets/floor_tom_drum.mp3",
    descr: "floor tom drum"
  },
  {
    key: "X",
    keyCode: 88,
    link: "./assets/shh.mp3",
    descr: "shh"
  },
  {
    key: "C",
    keyCode: 67,
    link: "./assets/snap.mp3",
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
