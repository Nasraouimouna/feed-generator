/*
    Project : Bundesliga Widget
    Author : Ferid HELALI (Alfa Computers)
    Date : 05/02/2019
    version : 1.0.0
 */

 //var uri="http://localhost:3000/api/v1/articles/featured/widget";
 var uri="http://vmd51055.contaboserver.net:3000/api/v1/articles/featured/widget";


function getPlaceholders(){
    var article_title=document.getElementById('article_title');
    var article_content_body=document.getElementById('article_content_body');
    var article_cover=document.getElementById('article_cover');
    var article_date=document.getElementById('article_date');
    var article_time=document.getElementById('article_time');
}



function extractDate(dt){
    var dt_str="";
    var year=dt.substr(0,4);
    var month=dt.substr(5,2);
    var day=dt.substr(8,2);
    dt_str=day+'.'+month+'.'+year;
    return dt_str;
}

function extractTime(dt){
    var tm_str="";
    tm_str=dt.substr(11,8);
    return tm_str;
}

$(document).ready(
   
    function () {
        getPlaceholders();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', uri+window.location.search);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                reponse = xhr.responseText;
                var article=JSON.parse(this.response).payload[0];
                article_title.innerHTML=article.title;
                article_content_body.innerHTML=article.content;
               article_cover.src='http://vmd51055.contaboserver.net:3000/'+article.cover.picture_url;
               article_date.innerHTML=extractDate(article.updatedAt);
               article_time.innerHTML=extractTime(article.updatedAt);

            };

        }
    });