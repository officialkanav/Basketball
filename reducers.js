
const initialState = {
    
    settings:{
        ballColor: 'green',
        ballSpeed: 3,
        ballRadius: 5,
        basketRadius: 5,
    },

    scores: [{name: 'Kanav',score: 150, dateAndTime: '03/02/2020'}]

  };

  function rootReducer(state = initialState, action) {
      switch(action.type){
        case 'saveSettings' : 
            console.log("save settings reducer!")
            return {...state, settings:action.payLoad};
        case 'saveScore' :
            let tempScore = state.scores
            tempScore.push(action.payLoad)
            return {...state, scores:tempScore}
      }
      return state;
    }
  export default rootReducer;