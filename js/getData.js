// const URL = 'http://opendataap2.e-land.gov.tw/resource/files/2016-12-16/8804808c3c400fe1e976ba1067dd59ae.json';
// let header = new Headers({
//     'Access-Control-Allow-Origin':'localhost:8080',
// });
const req = new Request('./js/show.json', {method: 'GET'})

let data = [];

let format = (array) => (
    array.map((value) => {
        let price = '待定';
        let time = '待定';
        let location = '待定';
        let locationName = '待定';
        let desc = '尚未有簡介';

        //判斷活動是否有簡介
        if(value.descriptionFilterHtml !== '') {
            desc = value.descriptionFilterHtml;
        }
        // 先判斷是否有showInfo，再判斷showInfo的各個key是否為空值
        if(Array.isArray(value.showInfo)) {
            if(!(value.showInfo[0].time === '')) {
                time = value.showInfo[0].time;
            }
            if(!(value.showInfo[0].price === '')) {
                price = value.showInfo[0].price;
            }
            if(!(value.showInfo[0].location === '')) {
                location = value.showInfo[0].location;
            }
            if(!(value.showInfo[0].locationName === '')) {
                locationName = value.showInfo[0].locationName;
            }           
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
            desc: desc
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
        // console.log('respJson[5].imgUrl', respJson[5].imageUrl === '');
        let formatData = format(respJson);
        // console.log('formatData:', formatData[0]);
        return formatData;
    })
    return data;
}





