export const initialSettings = {
    ballColor: 'red',
    ballSpeed: 2,
    ballRadius: 3,
    basketRadius: 3
}

export default function saveReducer(state = initialSettings, action) {
    switch(action.type){
      case 'saveSettings' : 
          console.log("save settings reducer!")
          return action.payLoad
    }
    return state;
}