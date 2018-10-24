import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

let page = new ReactiveVar();

page.set(true);

Template.auth.events({
  'click .auth_button'(event, instace) {
  	let password = $('.auth_password')[0].value;
  	if (password && password.length > 100) {
  		page.set(false);
  		return;
  	}
  	alert('Недостаточно прав');
  }
});

Template.main.helpers({
	'get_page'() {
		return page.get();
	}
});

Template.main_page.helpers({
	get_items() {
		let result = [];
		for (let i = 0; i < 100; i ++)
			result.push({
				name: "Комната №" + i
			});
		return result;
	}
})