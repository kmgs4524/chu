import $ from 'jquery';
import queryString from 'query-string';


let filterData = async(data) => {
    let keywordObj = queryString.parse(location.search);
    console.log('keyword:', keywordObj.value);

    // for(let i = 0; i <= data.length; i++) {
    //     if(data.)
    // }

    let results = [];   //用來儲存篩選後的data

    data.map(function(value){
        if(value.location.includes(keywordObj.value)) {
            results.push(value);
            // results.push(value.location);
        }
    });
    // console.log('results', results);
    return results;
}

//初始化每項結果的內部元件
// let initItem = (items) => {
let initItem = async(items, nextPage, currentStart) => {
    console.log('initItem', 'item:', items, 'nextPage:', nextPage, 'currentStart:', currentStart);
    let initTitle = async function(items, nextPage, start) {
        
        // $('.item-title').each(function(i) {
        // $(this).text(items[cu].title);
        $('.item-title').each(function() {
            console.log('item[start].title', items[start]);
            $(this).text(items[start].title);
            start = start + 1;
        });
    }

    let initDesc = async function(items, nextPage, start) {
        // $('.item-desc').each(function(i) {
        // $(this).text(items[i].desc);
        $('.item-desc').each(function() {
            $(this).text(items[start].desc);
            start = start + 1;
        });
    }
        
    let initImg = async function(items, nextPage, start) {
        $('.item-img').each(function(i) {
            if(items[start].img === '') {
                $(this).attr('src', 'http://placehold.it/700x300');
            } else {
                $(this).attr('src', items[start].img);
            }
            start = start + 1;
            // $(this).attr('src', items[i].img);
        });
    }
    
    let initBtn = async function(items, nextPage, start) {
        // 按下詳細資訊按鈕，傳入topData[i](擁有某活動詳細資料的物件)到活動詳細頁面(details.html)
        $('.item-detail').each(function(i) {    //i: index of .link-detail
            // $(this).on('click', function() {
                let stringifiedItem =  queryString.stringify(items[start]);
                $(this).attr('href', 'details.html?' + stringifiedItem);
                start = start + 1;
                // console.log('start', start);
            // });
        });
    }
    
    await initTitle(items, nextPage, currentStart);
    await initDesc(items, nextPage, currentStart);
    await initImg(items, nextPage, currentStart);
    await initBtn(items, nextPage, currentStart);
}

//初始化result介面
let initResult = async(data) => {
    let items = await filterData(data);
    console.log('items', items);
    let limit = 5;

    let currentStart = 0;
    let currentPage = 1;
    // let currentStart = currentStart + limit * (nextPage - currentPage);

    initItem(items, currentPage, currentStart) //initItem(items, nextPage, currentStart);
    // console.log('currIndex', currIndex);

    //點擊頁數所觸發的動作
    $('.page').each(function() {
        $(this).on('click', function(){ //點擊頁碼
            $('.page').each(function(){
                $(this).attr('class', 'page');  //重置所有li為not active
            });
            $(this).attr('class', 'page active');   //將點擊的li設為active
            //pressedPage按下的頁數，由class是否為active來判斷
            let pressedPageStr = $('.active').children().text();
            let pressedPage = parseInt(pressedPageStr);
            currentStart = currentStart +  5 * (pressedPage - currentPage);
            console.log('currentPage', currentPage);   

            currentPage = pressedPage;
            console.log('pressedPage', pressedPage);    
            console.log('currentStart', currentStart);
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
            initItem(items, currentPage, currentStart);
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