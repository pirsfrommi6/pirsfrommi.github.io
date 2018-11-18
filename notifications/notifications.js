const array=[
    'В английском языке существует специальное наименование для людей, личность которых не установлена или не разглашается по тем или иным причинам: для мужчин используется имя John Doe, а для женщин Jane Doe. Аналоги встречаются и в других языках.'
    ,
    'Английский - официальный язык неба. Совершая международные перелеты, пилоты общаются на английском вне зависимости от своего родного языка и национальности.'
    ,
    'Символ @ в английском называется the at sign или the at symbol.'
    ,
    'Английский идет на втором месте после мандаринского диалекта китайского по числу говорящих на нем. Это официальный язык 67 стран.'
    ,
    'Около 80% информации, которая хранится на компьютерах в мире, на английском.'
    ,
    'Crutch words - называют слова, которые помогают заполнить паузы во время разговора, дать себе время подумать или сделать акцент на каком-то слове. Сами по себе эти слова не несут никакого значения. Примеры: basically, literally, actually, like, I mean.'
    ,
    'Слово therein включает в себя еще 9 слов, причем все идут по порядку: the, there, he, in, rein, her, here, ere, herein.'
    ,
    'Во времена раннего Средневековья, сразу после того, как римляне покинули британские земли, к кельтам вторглись германские племена. Среди них и зародился английский язык. По мере расширения владений Британской империи, язык распространился в остальные части света.'
    ,
]

class Notification{
	
	constructor(elemArray){
		this.elemArray = elemArray;
		this.tip = document.getElementById('content');
		this.intervalId = 0;
	}
	
		creatContainer() {
		if(!localStorage.getItem('disabled')){
			let radioBtn;
	        const fragment = document.createDocumentFragment();
	        for(let i = 0; i < this.elemArray.length; i++ ){
	        	radioBtn = document.createElement('i');
	          	radioBtn.classList.add('radio-item');
	          	radioBtn.setAttribute('value', i+1);
	            fragment.appendChild(radioBtn);
	        }
	        document.getElementById('radioBtn').appendChild(fragment);
	        document.querySelector('.radio-item:first-child').classList.add('active');
	        this.tip.innerHTML=this.elemArray[0];
	        this._showContainer();
	        this.intervalId = setInterval(() => {this.nextTip('toRight')}, 5000);
	     }    
	}
	
	_stopNextTip(){
		if(this.intervalId)	clearInterval(this.intervalId);
	}
	
	_showContainer(){
		document.getElementById('notificationContainer').classList.remove('close');
	}
	
	hideContainer(){
		document.getElementById('notificationContainer').classList.add('close');
		this._stopNextTip();
	}
	
	nextTip(way){
		const active = document.querySelector('.active');
		let activeIndex=active.getAttribute('value');
		if(way === 'toRight'){
			active.classList.remove('active');
			if (+activeIndex === this.elemArray.length) activeIndex = 0;
			document.querySelector(`.radio-item:nth-child(${++activeIndex})`).classList.add('active');
		}
		if(way === 'toLeft'){
			if (+activeIndex === 1) activeIndex=array.length+1; 
		    document.querySelector(`.radio-item:nth-child(${--activeIndex})`).classList.add('active');
		}   
		this.tip.innerHTML=this.elemArray[--activeIndex];
	}
	
	disableShowContainer(){
		console.log('kuku');
		if (checkbox.checked){
	    	// localStorage.setItem('disabled', true);
	    } else{
	    	// localStorage.removeItem('disabled', true);
	    }
	}
	
	tipChoiceByRadioBtn(){
		let target = event.target; 
	    if (target.tagName !== 'I') return;
		let current = document.querySelector('.active');
		current.classList.remove('active');
		target.classList.add('active');
		let targetIndex=target.getAttribute('value');
		this.tip.innerHTML=this.elemArray[--targetIndex];
	}
	
	keyboardControl(close, toRight, toLeft){
		switch(event.keyCode) {
		case close:
			this.hideContainer();
			this._stopNextTip();
			break;
		case toRight:
			this.nextTip('toRight');
			break;
		case toLeft:
			this.nextTip('toLeft');
			break;
		default:
			return;
		}
	}
} 



const notification = (() => {
		const notification = new Notification(array);
        setTimeout(() => {notification.creatContainer()}, 5000);
        return notification;
})();

const escKey = 27;
const leftKey = 37;
const rightKey = 39;

//click on the close
document.getElementById('closeBtn').addEventListener('click', (event) => {notification.hideContainer()});
//click on the checkboz for desable show again 
document.getElementById('checkbox').addEventListener('click', (event) => {notification.disableShowContainer()});
//click on the radiobutton 
document.getElementById('radioBtn').addEventListener('click', (event) => {notification.tipChoiceByRadioBtn()});
//click on the left button
document.getElementById('leftBtn').addEventListener('click', (event) => {notification.nextTip('toLeft')});
//click on the right button
document.getElementById('rightBtn').addEventListener('click', (event) => {notification.nextTip('toRight')});
//key up on the left, right or escape 
document.addEventListener("keydown", (event) => {notification.keyboardControl(escKey, rightKey, leftKey)});


