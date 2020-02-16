const initialScores = {
    sortType:'null',
    scoreObject: {
      type: 'desc',
      scores: [
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
          {name:'Kanav', score:10, unixTime:'1580994648', dateAndTime:'06-02-2020/18:40:48'},
      ]
    }
}

ascendingSort = (scores, key)=>{
    scores.sort(function(a, b){
        if(a[key] < b[key]) { return -1; }
        if(a[key] > b[key]) { return 1; }
        return 0;
    })
}

descendingSort = (scores, key)=>{
    scores.sort(function(a, b){
        if(a[key] > b[key]) { return -1; }
        if(a[key] < b[key]) { return 1; }
        return 0;
    })
}

sortByScores = (state)=>{
    tempState = {...state}
    scores = tempState.scoreObject.scores

    if(tempState.sortType == 'sortedOnScores'){
        if(tempState.scoreObject.type == 'desc'){
            ascendingSort(scores,'score')
            tempState.scoreObject.type = 'asc'
        }
        else{
            descendingSort(scores,'score')
            tempState.scoreObject.type = 'desc'
        }
    }
    else{
        tempState.scoreObject.type = 'desc'
        descendingSort(scores,'score')
    }
    tempState.sortType = 'sortedOnScores'
    tempState.scoreObject.scores = scores
    return tempState
}

sortByDate = (state)=>{
    tempState = {...state}
    scores = tempState.scoreObject.scores

    if(tempState.sortType == 'sortedOnDate'){
        if(tempState.scoreObject.type == 'desc'){
            ascendingSort(scores,'unixTime')
            tempState.scoreObject.type = 'asc'
        }
        else{
            descendingSort(scores,'unixTime')
            tempState.scoreObject.type = 'desc'
        }
    }
    else{
        tempState.scoreObject.type = 'desc'
        descendingSort(scores,'unixTime')
    }
    tempState.sortType = 'sortedOnDate'
    tempState.scoreObject.scores = scores
    return tempState
}

sortByName = (state)=>{
    tempState = {...state}
    scores = tempState.scoreObject.scores

    if(tempState.sortType == 'sortedOnName'){
        if(tempState.scoreObject.type == 'desc'){
            scores.sort((a, b) => a.name.localeCompare(b.name))
            tempState.scoreObject.type = 'asc'
        }
        else{
            scores.sort((a, b) => b.name.localeCompare(a.name))
            tempState.scoreObject.type = 'desc'
        }
    }
    else{
        scores.sort((a, b) => b.name.localeCompare(a.name))
        tempState.scoreObject.type = 'desc'
    }
    tempState.sortType = 'sortedOnName'
    tempState.scoreObject.scores = scores
    return tempState
}

saveScore = (state, scoreObject)=>{
    tempState = {...state}
    tempState.scoreObject.scores.push(scoreObject)
    return tempState
}

export default function scoreReducer(state = initialScores, action){
    switch(action.type){
        case 'sortByScores':
            return sortByScores(state)
        case 'sortByDate':
            return sortByDate(state)
        case 'sortByName':
            return sortByName(state)
        case 'saveScore':
            return saveScore(state, action.payLoad)
    } 
    return state;
  }