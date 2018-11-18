'use strict'
class User {
	constructor(){
		this.n = 'qqq';
		this.a = 20;
	}
	
	car(name){
		this.carq = name;
		this.test(name);
	}
	
	test(a){
		console.log(a);
	}
}
let yy = new User();
yy.car('volvo');

console.log(yy);