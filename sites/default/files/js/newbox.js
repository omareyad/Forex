function popupWindow(){
    const popUpBtnOpen = document.querySelectorAll('.pop-up-button-open');
    const popUpBtnClose = document.querySelectorAll('.mypop-up__button_close');
    const myPopUp = document.querySelectorAll('.mypop-up');
    const myPopUpContent = document.querySelectorAll('.mypop-up__content');
    const myContent = document.querySelectorAll('.content');
    const btn = document.getElementById('calculate');
    let num = document.getElementById('number');
    let deg = document.getElementById('degreeOf');
    let txt = document.getElementById('txt');
  
    function visuallyHidden(){
      myPopUp[0].classList.toggle('visuallyhidden');
    }
  
    function openPopup(){
      popUpBtnOpen[0].addEventListener('click', function(){
        myPopUp[0].removeEventListener('transitionend', visuallyHidden);
        myPopUp[0].classList.toggle('visuallyhidden');
        myPopUpContent[0].style.opacity = 1;
        myPopUpContent[0].style.width = '320px';
        myPopUpContent[0].style.height = '260px';
        myContent[0].style.filter = 'blur(3px)';
        document.getElementById('number').focus();
      });
    }
    
    function closePopup(){
      popUpBtnClose[0].addEventListener('click', function(){
        //setTimeout(function(){myPopUp[0].classList.toggle('visuallyhidden');},500);
        myPopUpContent[0].style.opacity = 0;
        myPopUpContent[0].style.width = '0px';
        myPopUpContent[0].style.height = '0px';
        myContent[0].style.filter = 'none';
        num.value = '';
        deg.value = '';
        txt.firstChild.nodeValue = 'Result:';
        myPopUp[0].addEventListener('transitionend', visuallyHidden);
      });
    }
    
  
    /*----------Calculate degree of---------*/
    function calcDegree(){
      btn.addEventListener('click', ()=>{
        let result = Math.pow(num.value, deg.value);
        txt.firstChild.nodeValue = `Result: ${result}`;
      });
    }
    
  openPopup();
  closePopup();
  calcDegree();
}

  window.addEventListener('DOMContentLoaded', popupWindow);



//new live style pop up 


/* Meme */

