
const initialState = {
    
    settings:{
        ballColor: 'red',
        ballSpeed: 5,
        ballRadius: 5,
        basketRadius: 5,
    },

    scores: [{name: 'Kanav',score: 150, dateAndTime: '03/02/2020'}]

  };

  function rootReducer(state = initialState, action) {
      switch(action.type){
        case 'saveSettings' : 
            return {...state, settings:action.payLoad};
        case 'saveScore' :
            let tempScore = state.scores
            tempScore.push(action.payLoad)
            return {...state, scores:tempScore}
      }
      return state;
    }
  export default rootReducer;