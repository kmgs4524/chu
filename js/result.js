import $ from 'jquery';
import queryString from 'query-string';


let filterData = async(data) => {
    let keywordObj = queryString.parse(location.search);
    console.log('keyword:', keywordObj.value);

    // for(let i = 0; i <= data.length; i++) {
    //     if(data.)
    // }

    let results = [];

    data.map(function(value){
        if(value.location.includes(keywordObj.value)) {
            results.push(value);
            // results.push(value.location);
        }
    });
    // console.log('results', results);
    return results;
}

let initResult = async(data) => {
    let items = await filterData(data);
    console.log('items', items);

    $('.item-title').each(function(i) {
        $(this).text(items[i].title);
    });
    $('.item-desc').each(function(i) {
        $(this).text(items[i].desc);
    });

    $('.item-img').each(function(i) {
        if(items[i].img === '') {
            $(this).attr('src', 'http://placehold.it/700x300');
        } else {
            $(this).attr('src', items[i].img);
        }
        // $(this).attr('src', items[i].img);
    });
    // for(let i = 0; i <= 4; i++) {
    //     $('.item-title').text(items[i].title);
    // }

    // 按下Learn More超連結，傳入topData[i](擁有某活動詳細資料的物件)到活動詳細頁面(details.html)
    $('.item-detail').each(function(i) {    //i: index of .link-detail
        $(this).on('click', function() {
            let stringifiedItem =  queryString.stringify(items[i]);
            $(this).attr('href', 'details.html?' + stringifiedItem);
        });
    });
    
}



module.exports = initResult;