import React, {Component} from 'react';
import {
  Scene,
  Router,
  Tabs,
  Stack,
  Modal,
} from 'react-native-router-flux'
import {StyleSheet, Platform, StatusBar} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {connect, Provider} from 'react-redux';
import Stops from './components/stops';
import Stop from './components/stop';
import Map from './components/map';
import ReduxThunk from 'redux-thunk';
import {routerReducer} from './reducers/routes';
import TabIcon from './components/TabIcon';
import {stopReducer} from './reducers/stop';
import {COLORS} from './constants';

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#eee',
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

  componentWillMount() {
    StatusBar.setBackgroundColor(COLORS.main);
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux sceneStyle={{marginTop: -0.3, paddingTop: isIos ? 10 : 0}}>
          <Modal>
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
              activeBackgroundColor="white"
              inactiveBackgroundColor={COLORS.main}
              lazy
            >
              <Scene key="favourites" component={Stops} title="Ulubione" initial hideNavBar icon={TabIcon}/>
              <Scene key="stops" component={Stops} title="Przystanki" hideNavBar icon={TabIcon}/>
            </Tabs>
            <Scene key="stop" component={Stop}/>
          </Stack>
            <Scene key="map" component={Map} />
          </Modal>
        </RouterWithRedux>
      </Provider>
    );
  }
}
