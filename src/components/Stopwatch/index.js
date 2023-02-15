import {Component} from 'react'

import './index.css'

const initialState = {
  timerLimitInMinutes: 0,
  timeElapsedInSeconds: 0,
  isTimerRunning: false,
}

class StopWatch extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds} = this.state

    const totalSeconds = timeElapsedInSeconds

    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  incrementSeconds = () => {
    const {isTimerRunning} = this.state

    if (isTimerRunning) {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  startTimer = () => {
    this.intervalId = setInterval(this.incrementSeconds, 1000)
    this.setState({isTimerRunning: true})
  }

  stopTimer = () => {
    this.clearTimerInterval()
    this.setState({isTimerRunning: false})
  }

  resetTimer = () => {
    this.setState(initialState)
  }

  render() {
    return (
      <div className="bg-container">
        <div className="content-container">
          <h1 className="heading">Stopwatch</h1>
          <div className="timer-container">
            <div className="timer-heading-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
                className="timer-img"
              />
              <p className="title">Timer</p>
            </div>
            <h1 className="timer">{this.getElapsedSecondsInTimeFormat()}</h1>
            <div className="button-container">
              <button
                className="button start-button"
                type="button"
                onClick={this.startTimer}
              >
                Start
              </button>
              <button
                className="button stop-button"
                type="button"
                onClick={this.stopTimer}
              >
                Stop
              </button>
              <button
                className="button reset-button"
                type="button"
                onClick={this.resetTimer}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StopWatch
