
export default fetchDate = (score)=>{
        return fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata')
            .then((response) => response.json())
            .then((responseJson) => {
                
                dateAndTime = responseJson.datetime.split('T')
                date = dateAndTime[0].split('-')
                date = date[2]+'-'+date[1]+'-'+date[0]
                dateTime = date + "/" + dateAndTime[1].slice(0,8)
    
                dateObject = {
                    name: '',
                    score: score,
                    unixTime: responseJson.unixtime,
                    dateAndTime: dateTime,
                }
                console.log('returning from fetch')

                return dateObject;
            })
            .catch((error) => {
                // console.error(error);
                console.log("ERROR")
            });
    }

