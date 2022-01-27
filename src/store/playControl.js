import { combineReducers, createStore } from "redux";

const data = {
	status: "paused",
};

function changeStatus(state = data, action) {
	switch (action.type) {
		case "change/play":
			return Object.assign(state, { status: "played" });
		case "change/pause":
			return Object.assign(state, { status: "paused" });
		default:
			return state;
	}
}

function playDetail(state = data, action) {
	switch (action.type) {
		case "playMusic":
			return Object.assign(state, { id: action.id });
		default:
			return state;
	}
}

const reducer = combineReducers({ changeStatus, playDetail });
const store = createStore(reducer);

export default store;
