import {ACTIONS} from '../constants';

const initialState = {
  arrivalTimes: null,
  favourites: {},
  fetchingStops: 0,
};

export function stopReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CLEAR_FETCHING_STOPS:
      return {
        ...state,
        fetchingStops: 0,
      };
    case ACTIONS.FETCH_ARRIVAL_TIMES:
      const {data} = action.payload;
      if (!data || data.length === 0) {
        return {
          ...state,
          fetchingStops: state.fetchingStops > 0 ? state.fetchingStops - 1 : 0,
        };
      }
      let arrivalTimes = state.arrivalTimes ? [...state.arrivalTimes, ...data] : [...data];
      arrivalTimes = arrivalTimes.sort((a, b) => a.estimatedTime.localeCompare(b.estimatedTime));
      return {
        ...state,
        arrivalTimes,
        fetchingStops: state.fetchingStops > 0 ? state.fetchingStops - 1 : 0,
      };
    case ACTIONS.FAILED_FETCH_ARRIVAL_TIMES:
      return {
        ...state,
        fetchingStops: state.fetchingStops > 0 ? state.fetchingStops - 1 : 0,
      };
    case ACTIONS.START_FETCH_ARRIVAL_TIMES:
      return {
        ...state,
        fetchingStops: state.fetchingStops > 0 ? state.fetchingStops + 1 : 1,
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
