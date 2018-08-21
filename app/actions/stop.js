import {ACTIONS, API_URL} from '../constants';
import {AsyncStorage} from 'react-native';
import {stopList} from '../components/stops';

let currentStop = null;

export function setCurrentStop(stop) {
  return function (dispatch) {
    currentStop = stop ? stop.name : null;
    dispatch({type: ACTIONS.CLEAR_FETCHING_STOPS});
  }
}

export function fetchArrivalTimes(stopId, stopName) {
  if (stopName !== currentStop) {
    return {type: 'exit'};
  }
  return async function (dispatch) {
    try {
      dispatch({type: ACTIONS.START_FETCH_ARRIVAL_TIMES});
      console.log('GET' + API_URL + stopId);
      const response = await fetch(API_URL + stopId);
      console.log(response.status);
      const responseJson = await response.json();
      dispatch({
        type: ACTIONS.FETCH_ARRIVAL_TIMES,
        payload: {data: responseJson.delay},
      });
    } catch (error) {
      dispatch({type: ACTIONS.FAILED_FETCH_ARRIVAL_TIMES});
      console.warn('REQUEST FAILED. RETRY');
      console.warn(error);
      return fetchArrivalTimes(stopId)(dispatch);
    }
  }
}

export function clearArrivalTimes() {
  return function (dispatch) {
    dispatch({type: ACTIONS.CLEAR_ARRIVAL_TIMES});
  }
}


export function loadFavourites() {
  return async function (dispatch) {
    try {
      const previousFav = await AsyncStorage.getItem('favourites');
      if (!previousFav) {
        return;
      }
      const favourites = JSON.parse(previousFav);
      dispatch({
        type: ACTIONS.LOAD_FAVOURITES,
        payload: favourites,
      })
    } catch (error) {
      console.warn(error);
    }
  }
}

export function manageFavourite(stopName) {
  return async function (dispatch, getState) {
    const state = getState();
    console.log('state', state);
    const {favourites} = state.stopReducer;
    console.log('setFav', favourites);
    const nextFav = {...favourites};
    if (nextFav[stopName]) {
      delete nextFav[stopName];
    }
    else {
      nextFav[stopName] = stopList[stopName];
    }
    dispatch({
      type: ACTIONS.LOAD_FAVOURITES,
      payload: nextFav,
    });
    try {
      await AsyncStorage.setItem('favourites', JSON.stringify(nextFav));
    } catch (error) {
      console.warn(error);
    }
  }
}