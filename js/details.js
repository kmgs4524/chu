import $ from 'jquery';
import queryString from 'query-string';


let initDetail = () => {
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
    // if(!(detailContent.price.includes('$')) && detailContent.price !== '待定') {
    //     $('#content-price').text(`NT$${detailContent.price}`);
    // } else {
    //     $('#content-price').text(detailContent.price);
    // }
    $('#content-price').text(detailContent.price);
    
} 

initDetail();
// module.exports = initDetail;
