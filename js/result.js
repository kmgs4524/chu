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

let initItem = (items) => {
    $('.item-title').each(function(i) {
        $(this).text(items[i].title);
        // currIndex = currIndex + 1;
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

    // 按下詳細資訊按鈕，傳入topData[i](擁有某活動詳細資料的物件)到活動詳細頁面(details.html)
    $('.item-detail').each(function(i) {    //i: index of .link-detail
        $(this).on('click', function() {
            let stringifiedItem =  queryString.stringify(items[i]);
            $(this).attr('href', 'details.html?' + stringifiedItem);
        });
    });
}

let initResult = async(data) => {
    let items = await filterData(data);
    console.log('items', items);
    let limit = 5;  //每個批次最多5頁
    // console.log('page active', $('.active').children().text());
    // let currIndex = 0;
    // console.log('currIndex', currIndex);

    initItem(items);

    // console.log('children', $('.page').children().text());


    $('.page').each(function() {
        $(this).on('click', function(){ //點擊頁碼
            $('.page').each(function(){
                $(this).attr('class', 'page');
            });
            $(this).attr('class', 'page active');
            console.log('page active', $('.active').children().text());
            //若當前頁面為id=li5
            if(this.id === 'li5'){
                console.log('id', $(this));
                //更新所有li的數字(頁碼)
                $('.page').each(function() {
                    console.log($(this).children().text(limit.toString()));
                    limit = limit + 1;
                });
                $('.page').each(function(){
                    $(this).attr('class', 'page');  //重置所有li為not active
                });
                $('#li1').attr('class', 'page active'); //將點擊的li設為active
            }
        });
        
    })

    // if($('.page .active').id === 'li5') {
    //     console.log('active === 5');
    //     $('.page').each(function() {
    //         $(this).children().text(limit.toString());
    //         limit = limit + 1;
    //     })
    // }

    // console.log('pagenum id:',
    // $('.page').map(function() {
    //     return this.id;
    // }).get().join()
    // );
}



module.exports = initResult;