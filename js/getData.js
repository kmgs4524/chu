// const URL = 'http://opendataap2.e-land.gov.tw/resource/files/2016-12-16/8804808c3c400fe1e976ba1067dd59ae.json';
// let header = new Headers({
//     'Access-Control-Allow-Origin':'localhost:8080',
// });
const req = new Request('./js/show.json', {method: 'GET'})

let data = [];

let format = (array) => (
    array.map((value) => {
        let time, location, locationName, price = undefined;
        if(Array.isArray(value.showInfo)) {
            // console.log('value.showInfo.price', value.showInfo[0].price);
            time = value.showInfo[0].time;
            price = value.showInfo[0].price;
            location = value.showInfo[0].location;
            locationName = value.showInfo[0].locationName;            
        }
        
        return {
            key: value.UID,
            title: value.title,
            date: value.startDate,
            startTime: time,
            location: location,
            locationName: locationName,
            price: price,
            img: value.imageUrl,
            desc: value.descriptionFilterHtml
        }
    })
)
module.exports = () => {
    data = fetch(req).then((resp) => {
        if(!resp.ok) {
            throw new Errow(resp.statusText);
        } else {
            return resp.json();         
        }        
    }).catch(function(err) {
        console.error('catch', err);
    }).then((respJson) => {
        // console.log(respJson[1]);
        let formatData = format(respJson);
        // console.log('formatData:', formatData);
        return formatData;
    })
    return data;
}





