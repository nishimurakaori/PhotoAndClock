//chrome-extension://njbgffjlkcjdpneoopjckonainebkpge/popup.html

function dumpBookmarksM() {
  var bookmarkTreeNodesM = chrome.bookmarks.getTree(
    function(bookmarkTreeNodesM) {
      dumpTreeNodesM(bookmarkTreeNodesM);
    });
}

function dumpTreeNodesM(bookmarkNodesM) {
  var i;
  for (i = 0; i < bookmarkNodesM.length; i++) {
    dumpNodeM(bookmarkNodesM[i]);
  }
}

function dumpNodeM(bookmarkNode) {
  var bTitle = bookmarkNode.title;
  if(bTitle.match("photolist")){
    getPhotoList(bookmarkNode.id);
    return;
  }

  if (bookmarkNode.children && bookmarkNode.children.length > 0) {
    dumpTreeNodesM(bookmarkNode.children);
  }
}

function getPhotoList(photoID) {
  var photos = chrome.bookmarks.getChildren(photoID, 
    function(photos) {
      dumpPhoto(photos);
  });
}

function dumpPhoto(photos) {
  var photoURL = new Array();
  var extList = [".jpg","jpeg",".gif",".png",".bmp",".tif","tiff"];
  for (var i=0; i < photos.length; i++){
    var Url = getPhotoURL(photos[i]);
    if(extList.indexOf(Url.slice(-4).toLowerCase()) != -1) {
      photoURL.push(Url);
    }
  }
  imgChange(photoURL);
}

function getPhotoURL(photo){
  if(photo.title){
    return photo.url;
  }
}

//時計表示
function showTokei(){

  var Digital=new Date();
  var months = Digital.getMonth()+1;
  var days = Digital.getDate();
  var hours = Digital.getHours();
  var minutes = Digital.getMinutes();
  var seconds = Digital.getSeconds();

  if (hours<=9)
    hours="0"+hours
  if (minutes<=9)
    minutes="0"+minutes
  if (seconds<=9)
    seconds="0"+seconds
//  var ctime=hours+":"+minutes+":"+seconds;
  var ctime = months + "/" + days + " " + hours + ":" + minutes;

  $('#tokei').text(ctime);
  //タイマー更新
  setTimeout(arguments.callee, 1000);
}

//画像表示
function imgChange(imgSrc){
  var photoNum = parseInt(Math.random() * imgSrc.length); // ランダム数を得る 

  var img = document.getElementById("imgPhoto"); 
      img.src = imgSrc[photoNum];
      img.width = 200;
      img.onload;
}

document.addEventListener('DOMContentLoaded', function () {
//  dumpBookmarks();
  dumpBookmarksM();
  showTokei();
});

$(function() {
  //動くようにする。
  $( "#tokei" ).draggable();
  $( "#imgPhoto" ).draggable();

  //cssで時計のポジションと傾きと色を毎回変える。
  var topPosition = parseInt(Math.random() * 160) + 20; // 高さ 
  var leftPosition = parseInt(Math.random() * 70) + 50; // 横
  var kakudo = parseInt(Math.random() * 90) - 45; // 角度：-45～45までのランダム数を得る 
  var colorList = ['#88593b','#ea5415','#ee7701','#ffdf00','#737061','#005192','#1d7a21','#fff'];//ブルーナカラー
  var colorID = parseInt(Math.random() * 8);

  $('#tokei').css('top', topPosition);
  $('#tokei').css('left', leftPosition);
  $('#tokei').css('-webkit-transform','rotate(' + kakudo +'deg)');
  $('#tokei').css('background-color', colorList[colorID]);

});
