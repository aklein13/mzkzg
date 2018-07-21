import React, {Component} from 'react';
import {Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst} from 'react-native-router-flux'
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {connect, Provider} from 'react-redux';
// import layouts from './reducers/stops';
import Stops from './components/stops';
import ReduxThunk from 'redux-thunk';
import {routerReducer} from './reducers/routes';

let rootReducer = combineReducers({
  routes: routerReducer,
});

export let store;

store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const RouterWithRedux = connect()(Router);
const navTitle = "MZKZG";

const defaultTabProps = {
  title: navTitle,
  hideNavBar: false,
};

export class AppRouter extends Component {

  componentWillMount() {
    console.disableYellowBox = true;
  }

  render() {

    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">

            <Scene
              key="tabbar"
              tabs={false}
              hideNavBar={false}
              hideBackImage
            >
              <Scene key="Stops" component={Stops} {...defaultTabProps} initial/>
              {/*<Scene key="Favs" component={Favs} {...defaultTabProps}/>*/}
            </Scene>

            {/*<Scene*/}
            {/*key="stopDetails"*/}
            {/*component={stopDetails}*/}
            {/*title={emptyTitle}*/}
            {/*hideNavBar={false}*/}
            {/*/>*/}

          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}
