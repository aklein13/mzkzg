import {ACTIONS, API_URL} from '../constants';

export function fetchArrivalTimes(stopId) {
  return async function (dispatch) {
    try {
      const response = await fetch(API_URL + stopId);
      const responseJson = await response.json();
      console.log(responseJson);
      dispatch({
        type: ACTIONS.FETCH_ARRIVAL_TIMES,
        payload: {data: responseJson.delay},
      })
    } catch (error) {
      console.error(error);
    }
  }
}

export function clearArrivalTimes() {
  return function (dispatch) {
    dispatch({type: ACTIONS.CLEAR_ARRIVAL_TIMES});
  }
}