const initialState = {
    unsavedScore: null
}

tempStore = (state, tempObject) => {
    return { ...state, unsavedScore: tempObject }
}

export default function tempStateReducer(state = initialState, action){
    switch(action.type){
        case 'tempStore':
            return {
                unsavedScore: { ...action.payLoad }
            }
        case 'clearTempStore':
            console.log("CLEAR TEMP")
            return tempStore(state, null)
    } 
    return state
}