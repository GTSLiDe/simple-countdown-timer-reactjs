import React, { Component } from "react";
//import react redux library
import { connect } from "react-redux";

class timerForm extends Component {
  constructor() {
    super();
    //declare initial state
    this.state = {
      timerInterval: null,
      errorMessage: null
    };
  }

  render() {
    //render the timer form
    return this.timerForm();
  }

  //submit function
  handleSubmit = e => {
    //prevent page reload
    e.preventDefault();

    //validate timer form
    if (!this.validateForm()) {
      return;
    }
    //remove any existing interval if any
    clearInterval(this.state.timerInterval);
    //reset time data
    this.props.resetTimerData();

    //initialize countdown timer
    this.initCountdown();
  };

  //on change function
  handleOnChange = e => {
    const target = e.target;
    //set start time
    if (target.name === "startTime") {
      this.props.setStartTime(target.value);
    }
    //set end time
    if (target.name === "endTime") {
      this.props.setEndTime(target.value);
    }
  };

  initCountdown = e => {
    //set countdown timer value
    this.props.setTimerValue(this.calculateTime());
    //start countdown timer
    this.startCountdown();
  };

  startCountdown = e => {
    //initialize and set timerInterval state
    this.setState({
      timerInterval: setInterval(() => {
        //stop count down if countdownValue is 0
        if (!this.props.countdownValue) {
          clearInterval(this.state.timerInterval);
          return;
        }
        //reduce the countdownValue by 1
        this.props.reduceTimerValue();
      }, 1000)
    });
  };

  validateForm = e => {
    //remove existing error message
    this.setState({ errorMessage: "" });

    //validate start time value
    if (
      !this.props.startTime ||
      !this.props.startTime.match(/^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/)
    ) {
      //set error message
      this.setState({
        errorMessage: "Start time is not valid!"
      });
      return false;
    }

    //validate end time value
    if (
      !this.props.endTime ||
      !this.props.endTime.match(/^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/)
    ) {
      //set error message
      this.setState({
        errorMessage: "End time is not valid!"
      });
      return false;
    }

    //validate start time and end time interval
    if (this.calculateTime() <= 0) {
      //set error message
      this.setState({
        errorMessage: "Start time has to be greater than end time!"
      });
      return false;
    }
    return true;
  };

  convertStringToDate(timeString) {
    //retrieve individual hour, minute and second by splitting the string
    const time = timeString.split(":");
    const TimeDate = new Date();
    //set hour value
    TimeDate.setHours(parseInt(time[0]));
    //set minute value
    TimeDate.setMinutes(parseInt(time[1]));
    //set second value
    TimeDate.setSeconds(parseInt(time[2]));
    return TimeDate;
  }

  calculateTime() {
    //get start time date object
    const startTimeDate = this.convertStringToDate(this.props.startTime);
    //get end time date object
    const endTimeDate = this.convertStringToDate(this.props.endTime);
    //calculate the time difference between start time and end time in seconds
    const secondDiff = (endTimeDate.getTime() - startTimeDate.getTime()) / 1000;
    return secondDiff;
  }

  timerForm() {
    return (
      <React.Fragment>
        <div className="mt-5 row justify-content-center">
          <div className="col-sm-12 col-md-8 col-lg-4">
            <div id="countdownValue" className="text-center h-25">
              <h2 className="mb-0 mt-0">{this.props.countdownValue}</h2>
            </div>
            {!!this.state.errorMessage ? (
              <div id="errorMessage" className="alert alert-danger">
                {this.state.errorMessage}
              </div>
            ) : null}
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="startTime">Start Time:</label>
                <input
                  placeholder="hh:mm:ss"
                  className="form-control"
                  type="text"
                  name="startTime"
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endTime">End Time:</label>
                <input
                  placeholder="hh:mm:ss"
                  className="form-control"
                  type="text"
                  name="endTime"
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary">Start Countdown</button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

//mapping redux store state to this component
const mapStateToProps = state => {
  return {
    startTime: state.startTime,
    endTime: state.endTime,
    countdownValue: state.countdownValue
  };
};

//mapping reducer to this component
const mapDispatchToProps = dispatch => {
  return {
    resetTimerData: () => {
      dispatch({ type: "RESET_TIMER_DATA" });
    },
    setStartTime: time => {
      dispatch({ type: "SET_START_TIME", time: time });
    },
    setEndTime: time => {
      dispatch({ type: "SET_END_TIME", time: time });
    },
    reduceTimerValue: () => {
      dispatch({ type: "REDUCE_TIMER_VALUE" });
    },
    setTimerValue: countdownValue => {
      dispatch({ type: "SET_TIMER_VALUE", countdownValue: countdownValue });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(timerForm);
