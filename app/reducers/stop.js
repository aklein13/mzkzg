import {ACTIONS} from '../constants';

const initialState = {
  arrivalTimes: null,
};

export function stopReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_ARRIVAL_TIMES:
      const {data} = action.payload;
      if (!data || data.length === 0) {
        return state;
      }
      const arrivalTimes = state.arrivalTimes ? [...state.arrivalTimes, ...data] : [...data];
      return {
        ...state,
        arrivalTimes,
      };
    case ACTIONS.CLEAR_ARRIVAL_TIMES:
      return {
        ...state,
        arrivalTimes: null,
      };
    default:
      return state
  }
}
