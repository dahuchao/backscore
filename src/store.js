import { createStore, combineReducers } from "redux"
import * as types from './actions/actions-types'

const initState = {
    rencontres: [],
    rencontre: {
        id: 0,
        date: new Date(),
        hote: {
          nom: "hote",
          marque: 0
        },
        visiteur: {
          nom: "visiteur",
          marque: 0
        }
    }
}

function rencontreReducer (state = initState, action) {
    console.log("Reducteur action : " + JSON.stringify(action))
    var nouveauState = state
    switch (action.type) {
        case types.GET_RENCONTRES_SUCCESS:
            nouveauState = Object.assign({}, state, { rencontres: action.rencontres });
            break;
        case types.GET_RENCONTRE_SUCCESS:
            nouveauState = Object.assign({}, state, { rencontre: action.rencontre });
            break;
        case types.POST_RENCONTRE_SUCCESS:
        rencontres.
            nouveauState = Object.assign({}, state, { rencontre: action.rencontre });
            break;
        case types.NOUVELLE_MARQUE:
            nouveauState = Object.assign({}, state, { rencontre: action.rencontre });
            break;
    }
    console.log("Reducteur state : " + JSON.stringify(nouveauState))
    return nouveauState;
}

var reducers = combineReducers({
    rencontreState: rencontreReducer
})
const store = createStore(reducers)
export default store
