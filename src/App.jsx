import { useState, useEffect, useCallback } from "react"
import PropTypes from 'prop-types';

export default function App() {

  const [powerOn, setPowerOn] = useState(true)
  // const [bankOn, setBankOn] = useState(false)
  const [volume, setVolume] = useState(50)
  const [display, setDisplay] = useState("");

  const getFileNameFromAlt = (alt) => {
    if (alt)
      return alt.slice(0, 1).toUpperCase() + alt.slice(1);
    else
      return "Name must be defined"
  };

  const playAudio = useCallback((audioId) => {
    const audioElement = document.getElementById(audioId)
    if (audioElement && powerOn) {
      const fileName = getFileNameFromAlt(audioElement.getAttribute("data-alt"));
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
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3" className="clip" id="Q" data-alt="Heater 1" ></audio>
          </button>
          <button id="W-pad" className="drum-pad" onClick={() => playAudio("W")}>
            W
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3" className="clip" id="W" data-alt="Heater 2"></audio>
          </button>
          <button id="E-pad" className="drum-pad" onClick={() => playAudio("E")}>
            E
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3" className="clip" id="E" data-alt="Heater 3"></audio>
          </button>
          <button id="A-pad" className="drum-pad" onClick={() => playAudio("A")}>
            A
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3" className="clip" id="A" data-alt="Heater 4"></audio>
          </button>
          <button id="S-pad" className="drum-pad" onClick={() => playAudio("S")}>
            S
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3" className="clip" id="S" data-alt="Clap"></audio>
          </button>
          <button id="D-pad" className="drum-pad" onClick={() => playAudio("D")}>
            D
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3" className="clip" id="D" data-alt="Open-HH"></audio>
          </button>
          <button id="Z-pad" className="drum-pad" onClick={() => playAudio("Z")}>
            Z
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3" className="clip" id="Z" data-alt="Kick-n-Hat"></audio>
          </button>
          <button id="X-pad" className="drum-pad" onClick={() => playAudio("X")}>
            X
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3" className="clip" id="X" data-alt="Kick"></audio>
          </button>
          <button id="C-pad" className="drum-pad" onClick={() => playAudio("C")}>
            C
            <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3" className="clip" id="C" data-alt="Closed-HH"></audio>
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

