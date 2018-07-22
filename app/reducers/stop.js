import {ACTIONS} from '../constants';

const initialState = {
  arrivalTimes: null,
  favourites: {},
};

export function stopReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_ARRIVAL_TIMES:
      const {data} = action.payload;
      if (!data || data.length === 0) {
        return state;
      }
      let arrivalTimes = state.arrivalTimes ? [...state.arrivalTimes, ...data] : [...data];
      arrivalTimes = arrivalTimes.sort((a, b) => a.estimatedTime.localeCompare(b.estimatedTime));
      return {
        ...state,
        arrivalTimes,
      };
    case ACTIONS.CLEAR_ARRIVAL_TIMES:
      return {
        ...state,
        arrivalTimes: null,
      };
    case ACTIONS.LOAD_FAVOURITES:
      return {
        ...state,
        favourites: action.payload,
      };
    default:
      return state
  }
}
