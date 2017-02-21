import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/index";

import { Router, Route, IndexRoute, hashHistory } from "react-router";

import App from "./Components/App";
import Calender from "./Components/Calender/index";
import SearchResults from "./Components/SearchResults/index";

const store = createStore(reducer);

const root = document.getElementById("app");

ReactDOM.render(
    <Provider store={store} >
        <Router history={hashHistory}>
			<Route path='/' component={App}>
		      <IndexRoute component={Calender} />
		      <Route path='search' component={SearchResults} />
		    </Route>
		  </Router>
    </Provider>,
    root
);