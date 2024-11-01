import { useState, useEffect, useCallback } from "react"
import PropTypes from 'prop-types';
import Cev from "./assets/Cev_H2.mp3"
import Dsc from "./assets/Dsc_Oh.mp3"
import Heater1 from "./assets/Heater-1.mp3"
import Heater2 from "./assets/Heater-2.mp3"
import Heater3 from "./assets/Heater-3.mp3"
import Heater4 from "./assets/Heater-4.mp3"
import Heater5 from "./assets/Heater-5.mp3"
import KicknHat from "./assets/KicknHat.mp3"
import RP4Kick from "./assets/RP4_KICK.mp3"


export default function App() {

  const [powerOn, setPowerOn] = useState(true)
  // const [bankOn, setBankOn] = useState(false)
  const [volume, setVolume] = useState(50)
  const [display, setDisplay] = useState("");

  const getFileNameFromSrc = (src) => {
    const parts = src.split('/');
    return parts[parts.length - 1].split('.')[0];
  };

  const playAudio = useCallback((audioId) => {
    const audioElement = document.getElementById(audioId)
    if (audioElement && powerOn) {
      const fileName = getFileNameFromSrc(audioElement.src);
      setDisplay(fileName);
      audioElement.volume = volume / 100;
      audioElement.play()
    }
  }, [powerOn, volume]);

  // function toggleBank() {
  //   setBankOn((bankOn)=> !bankOn)
  // }

  function togglePower() {
    setPowerOn((powerOn)=> !powerOn)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay('');
    }, 1000); 

    return () => clearTimeout(timer);
  }, [display]);

  useEffect(() => {
    function handleKeyDown(event) {
      const key = event.key.toUpperCase();      
      const validKeys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
      if (validKeys.includes(key)) {
        playAudio(key);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [powerOn, playAudio]);

  return (
    <main>
      <div id="drum-machine">
        <div id="drum-pads">
          <button id="Q-pad" className="drum-pad" onClick={() => playAudio("Q")}>
            Q
            <audio src={Cev} className="clip" id="Q"></audio>
          </button>
          <button id="W-pad" className="drum-pad" onClick={() => playAudio("W")}>
            W
            <audio src={Dsc} className="clip" id="W"></audio>
          </button>
          <button id="E-pad" className="drum-pad" onClick={() => playAudio("E")}>
            E
            <audio src={Heater1} className="clip" id="E"></audio>
          </button>
          <button id="A-pad" className="drum-pad" onClick={() => playAudio("A")}>
            A
            <audio src={Heater2} className="clip" id="A"></audio>
          </button>
          <button id="S-pad" className="drum-pad" onClick={() => playAudio("S")}>
            S
            <audio src={Heater3} className="clip" id="S"></audio>
          </button>
          <button id="D-pad" className="drum-pad" onClick={() => playAudio("D")}>
            D
            <audio src={Heater4} className="clip" id="D"></audio>
          </button>
          <button id="Z-pad" className="drum-pad" onClick={() => playAudio("Z")}>
            Z
            <audio src={Heater5} className="clip" id="Z"></audio>
          </button>
          <button id="X-pad" className="drum-pad" onClick={() => playAudio("X")}>
            X
            <audio src={KicknHat} className="clip" id="X"></audio>
          </button>
          <button id="C-pad" className="drum-pad" onClick={() => playAudio("C")}>
            C
            <audio src={RP4Kick} className="clip" id="C"></audio>
          </button>
        </div>
        <div id="drum-controls">
          <PowerSwitch
            name={"Power"}
            powerOn={powerOn}
            togglePower={togglePower}
          />
          <div id="display">
            {display}
          </div>
          <VolumeControl setVolume={setVolume} setDisplay={setDisplay}/>
          {/* <BankSwitch
            name={"Bank"}
            bankOn={bankOn}
            toggleBank={toggleBank}
          /> */}
        </div>
      </div>
    </main>
  )
}

// BankSwitch.propTypes = {
//   name: PropTypes.string.isRequired,
//   bankOn: PropTypes.bool.isRequired,
//   toggleBank: PropTypes.func.isRequired
// };

// function BankSwitch({name, bankOn, toggleBank}) {
//   return (
//     <Switch
//       name={name}
//       on={bankOn}
//       toggleSwitch={toggleBank}
//     />
//   )
// }

PowerSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  powerOn: PropTypes.bool.isRequired,
  togglePower: PropTypes.func.isRequired
};

function PowerSwitch({name, powerOn, togglePower}) {
  return (
    <Switch
      name={name}
      on={powerOn}
      toggleSwitch={togglePower}
    />
  )
}

Switch.propTypes = {
  name: PropTypes.string.isRequired,
  on: PropTypes.bool.isRequired,
  toggleSwitch: PropTypes.func.isRequired
};

function Switch({name, on, toggleSwitch}) {

  const switchStyle = {
    marginLeft: on ? 'auto' : ""
  };

  return (
    <div className="switch-div">
      <span className="switch-name">{name}</span>
      <div className="switch-div--switch" onClick={()=>toggleSwitch()}>
        <div className="switch-div--switch--cursor" style={switchStyle}></div>
      </div>
    </div>
  );
}

VolumeControl.propTypes = {
  setVolume: PropTypes.func.isRequired,
  setDisplay: PropTypes.func.isRequired
}

function VolumeControl({ setVolume, setDisplay }) {
  
  function addVolume() {
    setVolume((volume) => {
      const newVolume = Math.min(volume + 5, 100);
      setDisplay(newVolume);
      return newVolume;
    });
  }

  function reduceVolume() {
    setVolume((volume) => {
      const newVolume = Math.max(volume - 5, 0);
      setDisplay(newVolume);
      return newVolume;
    });
  }

  return (
    <div id="volume-btns-container">
      <button className="volume-btns" onClick={() => reduceVolume()}>-5</button>
      <span className="volume-btns-text">Volume</span>
      <button className="volume-btns" onClick={() => addVolume()}>+5</button>
    </div>
  );
}

