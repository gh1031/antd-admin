import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducers';
// import rootSaga from './redux/saga';
// import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

// const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(thunk))
// sagaMiddleware.run(rootSaga);

export default store;