import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

let page = new ReactiveVar();
let card = new ReactiveVar();
let cardInfo = new ReactiveVar();
vars = new Mongo.Collection('vars')

card.set(false);
let auth = false;

// Ошибка сроллирования комнат
let withScrollError = true;
// Ошибка перепутывания кнопок и их работы
let withButtonError = true;

// Сбросить авторизацию
// vars.find().forEach(i=> vars.remove({_id: i._id}))

Template.auth.events({
  'click .auth_button'(event, instace) {
  	let password = $('.auth_password')[0].value;
  	if (password && password.length > 100 || auth) {
			auth = true;
			vars.insert({});
  		return;
  	}
  	alert('Недостаточно прав');
	}
});

Template.main.helpers({
	get_page() {
		return vars.findOne();
	},
	get_card() {
		return card.get();
	}
});

Template.main_page.onRendered(function(){
	$('.main_page').css('overflow', withScrollError ? 'hidden' : 'auto')
	               .css('height', withScrollError ? '500px' : 'auto');
});
Template.main_page.events({
	'click .main_page'() {
	},
	'click .room'(event, instance) {
		card.set(true);
		let target = $(event.currentTarget);
		cardInfo.set({
			stage: target.find('.stage').html(),
			name: target.find('.name').html()
		});
	}
})
Template.main_page.helpers({
	get_items() {
		let result = [];
		for (let j = 1; j <= 4; j ++)
			for (let i = 0; i < 10; i ++)
				result.push({
					stage: "Этаж " + j,
					name: "Комната №" + j + i,
				});
		return result;
	}
});

Template.card.helpers({
	get_info() {
		return cardInfo.get();
	}
});
Template.card.events({
	'click .close'() {
		card.set(false);
	},
	'click .open_door'(){
		if (withButtonError) {
			alert('Музыка включена');
			return;
		}

		let item = $('.progress');
		item.css('display', 'block');
		let currValue = 0;
		function addPersent() {
			let val = (++currValue) + '%';
			item.find('.progress-bar').css('width', val).html(val);
			if (currValue < 100)
				setTimeout(function(){
					addPersent();
				}, 100);
			else {
				item.find('.progress-bar').html('Дверь открыта!');
				setTimeout(function() {
					alert('Дверь открыта!!!');
				}, 10);
			}
		}
		setTimeout(function() {
			addPersent();
		}, 100)
	},
	'click .start_music'() {
		if (withButtonError) {
			alert('Дверь уже открыта');
		}
		else
			alert('Музыка включена');
	}
});