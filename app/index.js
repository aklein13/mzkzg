import React, {Component} from 'react';
import {
  Scene,
  Router,
  Tabs,
  Stack,
  Actions,
} from 'react-native-router-flux';
import { StyleSheet, Platform, StatusBar, AsyncStorage } from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {connect, Provider} from 'react-redux';
import Stops from './components/stops';
import Stop from './components/stop';
import Map from './components/map';
import ReduxThunk from 'redux-thunk';
import {routerReducer} from './reducers/routes';
import {stopReducer} from './reducers/stop';
import {COLORS} from './constants';
import TabBar from './components/TabBar';

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarContainer: {
    height: 49,
    width: '100%',
  },
  tab: {
    flex: 1,
    height: '100%',
  },
});

let rootReducer = combineReducers({
  routes: routerReducer,
  stopReducer,
});

export let store;

export const isIos = Platform.OS === 'ios';

store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const RouterWithRedux = connect()(Router);

export class AppRouter extends Component {

  async componentWillMount() {
    StatusBar.setBackgroundColor(COLORS.main);
    console.disableYellowBox = true;
    const previousFav = await AsyncStorage.getItem('favourites');
    if (!previousFav) {
      return Actions['stops']();
    }
    const favourites = JSON.parse(previousFav);
    if (!Object.keys(favourites).length) {
      Actions['stops']();
    }
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux sceneStyle={{marginTop: -0.3, paddingTop: isIos ? 10 : 0}}>
          <Stack
            hideNavBar
            key="root"
            titleStyle={{alignSelf: 'center'}}
          >
            <Tabs
              key="tabbar"
              swipeEnabled
              showLabel={false}
              tabBarStyle={styles.tabBarStyle}
              tabBarPosition={'top'}
              tabBarComponent={TabBar}
              lazy
            >
              <Scene key="favourites" component={Stops} initial hideNavBar/>
              <Scene key="stops" component={Stops} hideNavBar/>
            </Tabs>
            <Scene key="stop" component={Stop}/>
            <Scene key="map" component={Map} />
          </Stack>
        </RouterWithRedux>
      </Provider>
    );
  }
}
