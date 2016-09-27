import { createStore, combineReducers } from "redux"
import * as types from "./actions/actions-types"

const initState = {
    rencontres: [],
    modeEdition: false,
    modeAjout:false
}

function rencontreReducer(state = initState, action) {
    console.log("*** ACTION *** " + JSON.stringify(action))
    var nouveauState = state
    switch (action.type) {
        case types.GET_RENCONTRES_SUCCESS:
            nouveauState = Object.assign({}, state, { rencontres: action.rencontres })
            break;
        case types.GET_RENCONTRE_SUCCESS:
            nouveauState = Object.assign({}, state, { rencontre: action.rencontre })
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
            nouveauState = Object.assign({}, state, { rencontre: initRencontre })
            break;
        case types.POST_RENCONTRE_SUCCESS:
            let rencontres = action.rencontres
            nouveauState = Object.assign({}, state, { rencontres: rencontres })
            nouveauState = Object.assign({}, nouveauState, { modeAjout: false })
            break;
        case types.PUT_RENCONTRE_SUCCESS:
            nouveauState = Object.assign({}, state, { rencontre: action.rencontre })
            nouveauState = Object.assign({}, nouveauState, { modeEdition: false })
            break;
        case types.DELETE_RENCONTRE_SUCCESS:
            let delRencontres = action.rencontres
            nouveauState = Object.assign({}, state, { rencontres: delRencontres })
            break;
        case types.NOUVELLE_MARQUE:
            nouveauState = Object.assign({}, state, { rencontre: action.rencontre })
            break;
        case types.AJOUTER_RENCONTRE:
            let rencontre = {
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
            nouveauState = Object.assign({}, state, { rencontre: rencontre })
            nouveauState = Object.assign({}, nouveauState, { modeAjout: !state.modeAjout })
            break;
        case types.EDITER_RENCONTRE:
            nouveauState = Object.assign({}, state, { modeEdition: !state.modeEdition })
            break;
    }
    console.log("Nouvel état: " + JSON.stringify(nouveauState))
    console.log("-------------------")
    return nouveauState;
}

var reducers = combineReducers({
    rencontreState: rencontreReducer
})
const store = createStore(reducers)
export default store
