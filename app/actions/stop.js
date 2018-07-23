import {ACTIONS, API_URL} from '../constants';
import {AsyncStorage} from 'react-native';
import {stopList} from '../components/stops';

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
      alert(error);
      console.warn(error);
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
      console.log('previousFav', previousFav);
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