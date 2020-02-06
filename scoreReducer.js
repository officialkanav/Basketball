const initialScores = {
    sortType:'sortedOnScores',
    sortedOnScores: {
      type: 'desc',
      scores: [
        {name: 'Kanav',score: 44, dateAndTime: '1580810120',unixTime:'1580810120'},
        {name: 'Ankit',score: 43, dateAndTime: '1580810121',unixTime:'1580810121'},
      ]
    },
  
    sortedOnDate: {
      type: 'asc',
      scores: [
        {name: 'Kanav',score: 44, dateAndTime: '1580810120',unixTime:'1580810120'},
        {name: 'Ankit',score: 43, dateAndTime: '1580810121',unixTime:'1580810121'},
      ]
    }
  };
  
function binarySearchAscScore(element, array, start, end) {
    start = start || 0;
    end = end || array.length;
    
    var pivot = parseInt(start + (end - start) / 2, 10);
    
    if (end-start <= 1 || array[pivot].score === element) 
        return pivot;
    if (array[pivot].score < element) 
        return binarySearchAscScore(element, array, pivot, end);
    else 
        return binarySearchAscScore(element, array, start, pivot);
    
}

function binarySearchDescScore(element, array, start, end) {
    start = start || 0;
    end = end || array.length;
    
    var pivot = parseInt(start + (end - start) / 2, 10);
    
    if (end-start <= 1 || array[pivot].score === element) 
        return pivot;
    if (array[pivot].score < element) 
        return binarySearchDescScore(element, array, start, pivot);
    else 
        return binarySearchDescScore(element, array, pivot, end);
    
}

function binarySearchAscDate(element, array, start, end) {
    start = start || 0;
    end = end || array.length;
    
    var pivot = parseInt(start + (end - start) / 2, 10);
    
    if (end-start <= 1 || array[pivot].unixTime === element) 
        return pivot;
    if (array[pivot].unixTime < element) 
        return binarySearchAscDate(element, array, pivot, end);
    else 
        return binarySearchAscDate(element, array, start, pivot);
    
}

function binarySearchDescDate(element, array, start, end) {
    start = start || 0;
    end = end || array.length;
    
    var pivot = parseInt(start + (end - start) / 2, 10);
    
    if (end-start <= 1 || array[pivot].unixTime === element) 
        return pivot;
    if (array[pivot].unixTime < element) 
        return binarySearchDescDate(element, array, start, pivot);
    else 
        return binarySearchDescDate(element, array, pivot, end);
    
}

sortByScores = (state)=>{
    let tempScore = {...state}
    SOS = tempScore.sortedOnScores
    if(SOS.type === 'asc'){
        SOS.type = 'desc'
    }
    else{
        SOS.type = 'asc'
    }
    SOS.scores = SOS.scores.reverse()
    tempScore.sortedOnScores = SOS;  
    tempScore.sortType = 'sortedOnScores' 
    return tempScore
}

sortByDate = (state)=>{
    let tempScore = {...state}
    SOD = tempScore.sortedOnDate
    if(SOD.type === 'asc'){
        SOD.type = 'desc'
    }
    else{
        SOD.type = 'asc'
    }
    SOD.scores = SOD.scores.reverse()
    tempScore.sortedOnDate = SOD;   
    tempScore.sortType = 'sortedOnDate' 
    return tempScore
}

saveDate = (scoreObject, type, scores)=>{
    if(type == 'asc'){
        let loc = binarySearchAscDate(scoreObject.unixTime, scores, 0, scores.length)
        scores.splice(loc + 1, 0, scoreObject);
        return scores
    }
    else{
        let loc = binarySearchDescDate(scoreObject.unixTime, scores, 0, scores.length)
        scores.splice((loc - 1>=0?loc-1:0), 0, scoreObject);
        return scores
    }
}

saveScore = (scoreObject, type, scores)=>{
    if(type == 'asc'){
        let loc = binarySearchAscScore(scoreObject.score, scores, 0, scores.length)
        scores.splice(loc + 1, 0, scoreObject);
        return scores
    }
    else{
        let loc = binarySearchDescScore(scoreObject.unixTime, scores, 0, scores.length)
        scores.splice((loc - 1>=0?loc-1:0), 0, scoreObject);
        return scores
    }
}

saveScoreInTwo = (state,scoreObject)=>{
    state.sortedOnDate.scores = saveDate(scoreObject,state.sortedOnDate.type,state.sortedOnDate.scores)
    state.sortedOnScores.scores = saveScore(scoreObject,state.sortedOnScores.type,state.sortedOnScores.scores)
    return state
}

export default function scoreReducer(state = initialScores, action){
    switch(action.type){
        case 'sortByScores':
            return sortByScores(state)
        case 'sortByDate':
            return sortByDate(state)
        case 'saveScore':
            return saveScoreInTwo(state,action.payLoad)
    } 
    return state;
  }