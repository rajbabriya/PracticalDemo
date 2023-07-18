import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import languagesReducer from './reducers/languages';
import categoryReducer from './reducers/categories';
import dealsReducer from './reducers/deals';
import usersReducer from './reducers/users';

const rootReducer = combineReducers({
  languages: languagesReducer,
  categories: categoryReducer,
  deals: dealsReducer,
  users: usersReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
