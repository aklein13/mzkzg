import {ACTIONS, API_URL} from '../constants';
import {AsyncStorage, ToastAndroid} from 'react-native';
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
      const response = await fetch(API_URL + stopId);
      if (!response.ok) {
        throw response.status;
      }
      const responseJson = await response.json();
      dispatch({
        type: ACTIONS.FETCH_ARRIVAL_TIMES,
        payload: {data: responseJson.delay},
      });
    } catch (error) {
      dispatch({type: ACTIONS.FAILED_FETCH_ARRIVAL_TIMES});
      ToastAndroid.show(`Błąd połączenia: ${error}`, ToastAndroid.SHORT);
      console.warn(error);
      return fetchArrivalTimes(stopId, stopName)(dispatch);
    }
  }
}

export function clearArrivalTimes() {
  return function (dispatch) {
    dispatch({type: ACTIONS.CLEAR_ARRIVAL_TIMES});
  }
}

export function changeFollowed(routeName) {
  return function (dispatch) {
    dispatch({
      type: ACTIONS.CHANGE_FOLLOWED,
      payload: routeName,
    });
  }
}

export function loadFollowed() {
  return async function (dispatch) {
    try {
      const previousFollowed = await AsyncStorage.getItem('followed');
      if (!previousFollowed) {
        return;
      }
      const followed = JSON.parse(previousFollowed);
      dispatch({
        type: ACTIONS.LOAD_FOLLOWED,
        payload: followed,
      })
    } catch (error) {
      console.warn(error);
    }
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
    const {favourites} = state.stopReducer;
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
