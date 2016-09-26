import { createStore, combineReducers } from "redux"
import * as types from "./actions/actions-types"

const initState = {
    rencontres: [],
    modeEdition: false
}

function rencontreReducer(state = initState, action) {
    console.log("Reducteur action : " + JSON.stringify(action))
    var nouveauState = state
    switch (action.type) {
        case types.GET_RENCONTRES_SUCCESS:
            nouveauState = Object.assign({}, state, { rencontres: action.rencontres });
            break;
        case types.GET_RENCONTRE_SUCCESS:
            nouveauState = Object.assign({}, state, { rencontre: action.rencontre });
            break;
        case types.POST_RENCONTRE:
            let initRencontre = {
                id: 0,
                date: new Date(),
                hote: {
                    nom: "",
                    marque: 0
                },
                visiteur: {
                    nom: "",
                    marque: 0
                }
            }
            nouveauState = Object.assign({}, state, { rencontre: initRencontre });
            break;
        case types.POST_RENCONTRE_SUCCESS:
            let rencontres = [...state.rencontres, action.rencontre]
            nouveauState = Object.assign({}, state, { rencontres: rencontres });
            break;
        case types.PUT_RENCONTRE_SUCCESS:
            break;
        case types.NOUVELLE_MARQUE:
            nouveauState = Object.assign({}, state, { rencontre: action.rencontre });
            break;
        case types.EDITER_RENCONTRE:
            nouveauState = Object.assign({}, state, { modeEdition: !state.modeEdition });
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
