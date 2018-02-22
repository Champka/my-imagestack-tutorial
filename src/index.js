require('babel-polyfill'); // for redux-saga
const React = require('react');
const ReactDOM = require('react-dom');
const {
  Router,
  Route,
  hashHistory
} = require('react-router');
 
const {
  createStore,
  applyMiddleware,
  compose
} = require('redux');
 
const reducer = require('./reducer');
const { Provider } = require('react-redux');
const createSagaMiddleware = require('redux-saga');
const rootSaga = require('./sagas');
// our components
const Layout = require('./components/layout');
const { HomeContainer } = require('./components/home');
const { DetailContainer } = require('./components/detail');
const { AddContainer } = require('./components/add');
// app css
require('../dist/css/style.css');
 
// Filestack API requires to set a key
filepicker.setKey("A3q269uGaQWyFZJy31O5Yz");
 
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f // connect to redux devtools
  )
);
sagaMiddleware.run(rootSaga);
 
// the 3 paths of the app
const routes = <Route component={Layout}>
  <Route path="/" component={HomeContainer} />
  <Route path="/detail/:id" component={DetailContainer} />
  <Route path="/add" component={AddContainer} />
</Route>;
 
// add provider as first component and connect the store to it
ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);