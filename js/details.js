import $ from 'jquery';
import queryString from 'query-string';

// console.log(queryString.parse(location.search));

let initContent = () => {
    let detailContent = queryString.parse(location.search);
    console.log('detailContent', detailContent);
    $('#content-title').text(detailContent.title);
    $('#content-time').text(detailContent.startTime);
    $('#content-location').text(`${detailContent.location} ${detailContent.locationName}`);
    $('#content-description').text(detailContent.desc);
    if(detailContent.img === '') {
        $('#content-image').attr('src', 'http://placehold.it/700x450');
    } else {
        $('#content-image').attr('src', detailContent.img);
    }
    
    // if(!detailContent.price.includes('$')) {
    //     $('#content-price').text(`NT$${detailContent.price}`);
    // } else {
    //     $('#content-price').text(detailContent.price);
    // }
    $('#content-price').text(detailContent.price);
    
} 

initContent();
// let initDetail = (target) => {
//     // console.log('Top 6 data:', topData.length);
//     // target.text('hello world');
//     console.log('detail title:', target);
    
// }

// module.exports = initDetail;

// function processForm() {
//   var parameters = location.search.substring(1).split("&");
//   var temp = parameters[0].split("=");
//   l = unescape(temp[1]);
//   console.log(l); //Dialog with the text you put on the textbox
// }

// processForm();