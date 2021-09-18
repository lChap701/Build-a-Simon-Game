import React from "react";
import { ERR_SOUND } from "../setup/errorSound";
import { DEFAULT_BTNS } from "../setup/defaultBtns";
import { BTN_DELAY, EFFECT_DELAY, SEC_DELAY } from "../setup/delays";
import Button from "./Button";
import Winner from "./Winner";

/**
 * Simon Component
 * @module ./react/Simon
 *
 */
class Simon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      strict: false,
      allowInput: true,
      btns: DEFAULT_BTNS,
      level: 0,
      timed: false,
      won: false,
    };

    this.playGame = this.playGame.bind(this);
    this.addStep = this.addStep.bind(this);
    this.usePattern = this.usePattern.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.validate = this.validate.bind(this);
    this.error = this.error.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  playGame() {
    if (this.state.start && !this.state.won) this.props.clearPoints();
    if (this.state.timed) clearInterval(this.timer);

    this.setState({
      start: true,
      pattern: [],
      level: 1,
      step: 0,
      won: false,
    });

    // Enable the 4 colored buttons
    const btns = [...this.state.btns];
    btns.map((btn) => (btn.disabled = false));
    this.addStep();
  }

  startTimer() {
    let secs = 0;
    this.setState({ timed: true });

    // Starts timer after the pattern is displayed
    setTimeout(() => {
      this.timer = setInterval(() => {
        if (++secs === 5000) {
          this.error();
          clearInterval(this.timer);
        }
      }, 1);
    }, SEC_DELAY * this.state.pattern.length);
  }

  addStep() {
    if (this.state.timed) clearInterval(this.timer);

    let i = Math.floor(Math.random() * this.state.btns.length);
    this.setState((state) => ({
      pattern: [...state.pattern, i],
      step: 0,
    }));

    setTimeout(() => this.usePattern(), 200);
  }

  usePattern() {
    const { pattern } = this.state;
    const btns = [...this.state.btns];
    const ACTIVE = " active";
    let i = 0;

    this.setState({ allowInput: false });
    document.activeElement.blur();

    // Runs through all step with a 1 second delay between steps
    const runSteps = setInterval(() => {
      let index = pattern[i];
      btns[index].class += ACTIVE;
      this.setState({ btns: btns });
      this.playAudio(btns[index].audio);

      setTimeout(() => {
        btns[index].class = btns[index].class.replace(ACTIVE, "");
        this.setState({ btns: btns });
      }, BTN_DELAY);

      // Checks if all steps have been ran
      if (++i === pattern.length) {
        this.setState({ allowInput: true });
        clearInterval(runSteps);
      }
    }, SEC_DELAY);

    this.startTimer();
  }

  playAudio(src) {
    // Disables all input while audio is playing
    this.setState({ allowInput: false });

    const audio = document.querySelector(`audio[src='${src}']`);
    if (src === ERR_SOUND) audio.volume = 0.75;
    audio.play();
  }

  changeMode() {
    this.setState((state) => ({
      strict: !state.strict,
    }));

    this.playGame();
  }

  validate(e) {
    const ID = parseInt(e.target.id);
    const steps = [...this.state.pattern];

    this.playAudio(this.state.btns[ID].audio);

    // For when each time a button is pressed
    setTimeout(() => document.activeElement.blur(), EFFECT_DELAY);

    // Checks if the correct step was chosen and if the player won the game
    if (steps[this.state.step] === ID) {
      this.setState((state) => ({ step: state.step + 1 }));

      setTimeout(() => {
        if (this.state.step === steps.length) {
          if (this.state.level === 20) {
            this.setState({ won: true });
            if (this.state.timed) clearInterval(this.timer);

            // Adds to the total score
            const POINTS = this.state.strict ? 30 : 20;
            this.props.addPoints(POINTS);

            // Starts a new game in 4 seconds
            setTimeout(() => this.playGame(), 4000);
          } else {
            this.setState((state) => ({ level: state.level + 1 }));
            this.addStep();
          }
        } else {
          this.setState({ allowInput: true });
        }
      }, BTN_DELAY);
    } else {
      if (this.state.timed) clearInterval(this.timer);
      this.error();
    }
  }

  error() {
    this.playAudio(ERR_SOUND);
    this.setState({ step: 0 });
    this.props.dockPoints();

    setTimeout(() => {
      if (this.state.strict) {
        this.playGame();
      } else {
        this.usePattern();
      }
    }, SEC_DELAY);
  }

  render() {
    return (
      <div
        id="simon"
        className={this.state.allowInput ? "allow-input" : "no-input"}
      >
        {this.state.won ? <Winner score={this.props.score} /> : ""}

        <div id="start">
          <h1>Simon</h1>

          <div className="btn-container">
            <button
              className="btn btn-outline-light btn-lg"
              onClick={this.playGame}
            >
              {this.state.start ? "Restart" : "Start"}
            </button>

            <button
              className="btn btn-outline-warning btn-lg"
              onClick={this.changeMode}
            >
              {this.state.strict ? "Normal" : "Strict"}
            </button>
          </div>
        </div>

        <div id="btns">
          {this.state.btns.map((btn) => {
            return (
              <Button
                id={btn.id}
                class={btn.class}
                audio={btn.audio}
                disabled={btn.disabled}
                onClick={this.validate}
              />
            );
          })}
        </div>

        <p>Level: {this.state.level}</p>
      </div>
    );
  }
}

export default Simon;
