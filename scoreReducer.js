const initialScores = {

    sortedOnScores: {
      type: 'desc',
      scores: [
        {name: 'Kanav',score: 44, dateAndTime: '1580810120',unixTime:'1580810120'},
        {name: 'Ankit',score: 43, dateAndTime: '1580810121',unixTime:'1580810121'},
        {name: 'Kanav',score: 42, dateAndTime: '1580810122',unixTime:'1580810122'},
        {name: 'Ankit',score: 41, dateAndTime: '1580810123',unixTime:'1580810123'},
        {name: 'Kanav',score: 40, dateAndTime: '1580810124',unixTime:'1580810124'},
      ]
    },
  
    sortedOnDate: {
      type: 'asc',
      scores: [
        {name: 'Kanav',score: 44, dateAndTime: '1580810120',unixTime:'1580810120'},
        {name: 'Ankit',score: 43, dateAndTime: '1580810121',unixTime:'1580810121'},
        {name: 'Kanav',score: 42, dateAndTime: '1580810122',unixTime:'1580810122'},
        {name: 'Ankit',score: 41, dateAndTime: '1580810123',unixTime:'1580810123'},
        {name: 'Kanav',score: 40, dateAndTime: '1580810124',unixTime:'1580810124'},
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

export default function scoreReducer(state = initialScores, action){
    switch(action.type){
        case 'sortByName':
            let tempData = state.scores
            break;
        case 'sortByDate':
            break;
        case 'saveScore':

    
    } 
    return state;
  }