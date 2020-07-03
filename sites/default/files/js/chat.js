var social = document.querySelector('.social-list');
var so_face= social.childNodes[1].childNodes[1].setAttribute('href','https://web.facebook.com/FxRiverLTD');
var so_twitt= social.childNodes[3].childNodes[1].setAttribute('href','#');
var so_in= social.childNodes[5].childNodes[1].setAttribute('href','https://www.linkedin.com/company/fxriver.ltd');
var so_insta= social.childNodes[7].childNodes[1].setAttribute('href','https://www.instagram.com/fxriver.ltd/');
var so_you= social.childNodes[9].childNodes[1].setAttribute('href','#');
var so_tele= social.childNodes[11].childNodes[1].setAttribute('href','#');

var app = document.querySelector('.app_block');
app.childNodes[1].setAttribute('href','https://apps.apple.com/us/app/metatrader-4-forex-trading/id496212596');
app.childNodes[1].setAttribute('target', '_blank');
app.childNodes[3].setAttribute('href','https://play.google.com/store/apps/details?id=net.metaquotes.metatrader4');
app.childNodes[3].setAttribute('target', '_blank');


var lang = document.querySelector('.desk');



if(lang.textContent == "English")
	{
		var navbars= document.querySelector('.navbar-nav');
	navbars.childNodes[1].childNodes[1].textContent = "Accounts";
	
	navbars.childNodes[3].childNodes[1].textContent = "Platforms";
	navbars.childNodes[5].childNodes[1].textContent = "Instrument";



		
	}

var footer_tel =  document.getElementsByClassName("f1")[3];
footer_tel.style.display="none";


console.log(footer_tel);



var editmargin = document.querySelector('.final-footer');
editmargin.style.marginTop = "0px";
var deldiv = document.querySelector(".row");
console.log(deldiv);



var classig = document.querySelector('.comp-info');
var div = document.createElement("div");
var listfot1 = document.createElement("ul");
var texthead1 = document.createElement("h6");
texthead1.textContent = "Jalan OKK";
var texthead2 = document.createElement("h6");
texthead2.textContent = "Abdullah,87000";
var texthead3 = document.createElement("h6");
texthead3.textContent = "Tel: +6087599269";
var texthead4 = document.createElement("h6");


var logo = document.createElement("img");
logo.src="./sites/default/files/img/logo%20fxriver.net%20with%20dark%20background.png";
listfot1.appendChild(texthead1);
listfot1.appendChild(texthead2);
listfot1.appendChild(texthead3);
listfot1.appendChild(texthead4);
listfot1.appendChild(logo);
var listfot2 = document.createElement("ul");
listfot1.appendChild(listfot2);
listfot2.classList.add("menu_level_1","menu-index-5");
classig.appendChild(div);
div.appendChild(listfot1);





// liveCHat ------------------------------------------
//var hiddenchat = document.getElementById('live-chat').style.display="none";
var chat1 = document.createElement("script");
chat1.setAttribute('id','slcLiveChat');
chat1.setAttribute('async','');
chat1.setAttribute('data-account-id','206753269');
chat1.src="https://widget.sonetel.com/SonetelWidget.min.js";
var chat = document.body.appendChild(chat1);

//<script async id="slcLiveChat" src="" data-account-id="206753269"></script>





function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}


var pic = document.querySelector('.net');
pic.setAttribute('src','sites/all/themes/fxriver/i/pages/home/Neteller-payment-method.png');
pic.style.marginTop = '-26px';

var parentdiv = document.querySelector('.payment-logos__wrapper');
parentdiv.childNodes[7].setAttribute('href','sites/default/files/pdf/BankTransfer.pdf');


