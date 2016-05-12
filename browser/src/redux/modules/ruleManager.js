const ADD_RULE = 'addRule';
const DELETE_RULE = 'deleteRule';
const ADD_LOCATION = 'addLocation';
const RESET_LOCATIONS = 'resetLocations';
const _ = require('lodash');

export default function reducer(state = {}, action = {}) {
	switch(action.type) {
		case ADD_RULE:
			console.log('adding rule: ', action.rule);
			state[action.rule.split('-')[0]] = {
				yn: action.rule.split('-')[1],
				loc: []
			}
			return state;
		case DELETE_RULE:
			console.log('deleting rule: ', action.rule);
			state.delete(action.rule.split('-')[0]);
			return state;
		case ADD_LOCATION:
			console.log('adding line number '+action.loc+' to rule '+action.rule);
			/* if(state[action.rule]) {
				state[action.rule].loc.push(action.loc);
			} */
			const deepAdd = _.cloneDeep(state);
			deepAdd[action.rule].loc.push(action.loc);
			return deepAdd;
		case RESET_LOCATIONS: 
			console.log('reseting all locations');
			const deepReset = _.cloneDeep(state);
			Object.keys(deepReset).forEach(function(rule) {
				deepReset[rule].loc = [];
			});
			return deepReset;
		default:
			return state;
	}
}

export function addRule(rule) {
	return {
		type: ADD_RULE,
		rule: rule
	}
}
export function deleteRule(rule) {
	return {
		type: DELETE_RULE,
		rule: rule
	}
}
export function addLocation(rule, loc) {
	return {
		type: ADD_LOCATION,
		rule: rule,
		loc: loc
	}
}
export function resetLocations() {
	return {
		type: RESET_LOCATIONS
	}
}
