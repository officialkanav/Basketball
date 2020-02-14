export const initialSettings = {
    ballColor: 'red',
    ballSpeed: 2,
    ballRadius: 3,
    basketRadius: 3,
}

export default function saveReducer(state = initialSettings, action) {
    switch(action.type){
        case 'saveSettings' :
            return action.payLoad
        case 'resetSettings' :
            return initialSettings
    }
    return state;
}