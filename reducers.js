import {combineReducers} from 'redux'

const initialScores = {
scores: [
      {name: 'Kanav',score: 1, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 2, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 3, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 4, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 5, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 6, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 7, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 8, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 9, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 10, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 11, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 12, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 13, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 14, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 15, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 16, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 17, dateAndTime: '03/02/2020'},
      {name: 'Kanav',score: 18, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 19, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 20, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 21, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 22, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 23, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 24, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 25, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 26, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 27, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 28, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 29, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 30, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 31, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 32, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 33, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 34, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 35, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 36, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 37, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 38, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 39, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 40, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 41, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 42, dateAndTime: '03/02/2020'},
      {name: 'Ankit',score: 43, dateAndTime: '02/02/2020'},
      {name: 'Kanav',score: 44, dateAndTime: '03/02/2020'},
   
    ]

  };

function locationOf(element, array, start, end) {
  start = start || 0;
  end = end || array.length;
  var pivot = parseInt(start + (end - start) / 2, 10);
  if (end-start <= 1 || array[pivot] === element) return pivot;
  if (array[pivot] < element) {
    return locationOf(element, array, pivot, end);
  } else {
    return locationOf(element, array, start, pivot);
  }
}

function saveReducer(state = {ballColor: 'green',ballSpeed: 3,ballRadius: 5,basketRadius: 5}, action) {
  switch(action.type){
    case 'saveSettings' : 
        console.log("save settings reducer!")
        return action.payLoad
    case 'saveScore' :
        let tempScore = state.scores
        const index = locationOf(action.payLoad.score,tempScore,0,tempScore.length)
        tempScore = tempScore.splice(index + 1, 0, element);
        return {...state, scores:tempScore}
  }
  return state;
}

function sortReducer(state = initialScores, action){
  switch(action.type){
    case 'sortByName':
      let tempData = state.scores

    case 'sortByDate':
  } 
  return state;
}

export default combineReducers({saveReducer,sortReducer})