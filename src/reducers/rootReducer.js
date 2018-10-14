const initState = {
  startTime: null,
  endTime: null,
  countdownValue: null
};

//define reducer function
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "RESET_TIMER_DATA":
      return {
        countdownValue: null,
        startTime: state.startTime,
        endTime: state.endTime
      };
    case "SET_START_TIME":
      return {
        ...state,
        startTime: action.time
      };
    case "SET_END_TIME":
      return {
        ...state,
        endTime: action.time
      };
    case "REDUCE_TIMER_VALUE":
      return {
        ...state,
        countdownValue: state.countdownValue - 1
      };
    case "SET_TIMER_VALUE":
      return {
        ...state,
        countdownValue: action.countdownValue
      };
    default:
      return state;
  }
};

export default rootReducer;
