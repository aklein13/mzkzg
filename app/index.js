import React, {Component} from 'react';
import {
  Scene,
  Router,
  Overlay,
  Tabs,
  Modal,
  Stack,
  Lightbox,
} from 'react-native-router-flux'
import {StyleSheet} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {connect, Provider} from 'react-redux';
import Stops from './components/stops';
import ReduxThunk from 'redux-thunk';
import {routerReducer} from './reducers/routes';
import TabIcon from './components/TabIcon';

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#eee',
  },
});

let rootReducer = combineReducers({
  routes: routerReducer,
});

export let store;

store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const RouterWithRedux = connect()(Router);

export class AppRouter extends Component {

  componentWillMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux sceneStyle={{marginTop: 24}}>
          <Overlay key="overlay">
            <Lightbox key="lightbox">
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
                  inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"
                >
                  <Scene key="favourites" component={Stops} title="Ulubione" hideNavBar icon={TabIcon}/>
                  <Scene key="stops" component={Stops} title="Przystanki" initial hideNavBar icon={TabIcon}/>
                </Tabs>
              </Stack>
            </Lightbox>
          </Overlay>
        </RouterWithRedux>
      </Provider>
    );
  }
}
