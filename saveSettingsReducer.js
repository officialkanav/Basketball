const initialSettings = {
    ballColor: 'green',
    ballSpeed: 3,
    ballRadius: 5,
    basketRadius: 5
}

export default function saveReducer(state = initialSettings, action) {
    switch(action.type){
      case 'saveSettings' : 
          console.log("save settings reducer!")
          return action.payLoad
    }
    return state;
}