import { useState } from "react"
import PropTypes from 'prop-types';


export default function App() {

  const [display, setDisplay] = useState("")
  const [powerOn, setPowerOn] = useState(true)
  const [bankOn, setBankOn] = useState(false)


  function toggleBank() {
    setBankOn((bankOn)=> !bankOn)
  }

  function togglePower() {
    setPowerOn((powerOn)=> !powerOn)
  }

  function handleDisplay() {
    setDisplay("")
  }

  return (
    <main>
      <div id="drum-machine">
        <div id="drum-pads">
          <div className="drum-pad">Q</div>
          <div className="drum-pad">W</div>
          <div className="drum-pad">E</div>
          <div className="drum-pad">A</div>
          <div className="drum-pad">S</div>
          <div className="drum-pad">D</div>
          <div className="drum-pad">Z</div>
          <div className="drum-pad">X</div>
          <div className="drum-pad">C</div>
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
          <VolumeControl />
          <BankSwitch
            name={"Bank"}
            bankOn={bankOn}
            toggleBank={toggleBank}
          />
        </div>
      </div>
    </main>
  )
}

BankSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  bankOn: PropTypes.bool.isRequired,
  toggleBank: PropTypes.func.isRequired
};

function BankSwitch({name, bankOn, toggleBank}) {
  return (
    <Switch
      name={name}
      on={bankOn}
      toggleSwitch={toggleBank}
    />
  )
}

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

function VolumeControl() {
  return (
    <div className="bar">
      <div className="selector"></div>
    </div>
  )
}