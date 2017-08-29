import $ from 'jquery';
const queryString = require('query-string');

console.log(queryString.parse(location.search));

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