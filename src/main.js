/* operações com array
const arr = [1, 2, 3, 4, 8];

const newArr = arr.map(function(item, index)
{
	return item + index;
});
console.log(newArr);

const sum = arr.reduce(function(total, next) {
	return total + next;
});

console.log(sum);

const filter = arr.filter(function(item){
	return item % 2 === 0;
});

console.log(filter);

const find = arr.find(function(item){
	return item === 2;
});
console.log(find);
fim operaçoes com array */

 /*Arow functions

 const arr = [1, 2, 3, 4, 5, 8];

 const newArr = arr.map(item => item * 2);

 console.log(newArr);

 const teste = () => ({ nome: 'Wesley'});

 console.log(teste);

 fim arrow functions*/

 /* Valores Padrao + arrow function

 const soma =( a = 3, b = 6) => a + b;

 console.log(soma(1));
 console.log(soma());

 Fim Valores Padrao + arrow function*/

 /* desestruturação

 const usuario = {
 	nome: 'wesley',
 	idade: 23,
 	endereco: {
 		cidade: 'Januaria',
 		estado: 'MG',
 	},
 };

 const {nome, idade, endereco:{ cidade }} = usuario;

console.log(nome, idade, cidade);

function mostraNome({nome, idade}){
	console.log(nome,idade);
}

mostraNome(usuario);

Fim desestruturação */

/* Operadores rest/spread

//REST

const usuario = {
	nome: 'wesley',
	idade: 23,
	empresa: 'solo'
};
const {nome, ...resto } = usuario;
console.log(nome);
console.log(resto);

function soma(...params) {
	return params.reduce((total, next) => total + next);
}
console.log(soma(1 , 2, 3));
// SPREAD

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [...arr1, ...arr2];
console.log(arr3);

const usuario1 = {
	nome: 'wesley',
	idade: 23,
	empresa: 'Ahhhhh'
};

const usuario2 = { ...usuario1, nome: 'Meu Arroz'};

console.log(usuario2);
console.log(usuario1);

fim Operadores rest/spread */

/*Template Literals

const nome = 'Wesley';
const idade = 23;
//console.log('Meu nome é ' + nome + ' e tenho ' + idade + ' anos'); 
console.log(`Meu nome é ${nome} e tenho ${idade} anos`)

Fim template literals */

/* Object short syntax

const nome = 'Wesley';
const idade = 23;
const usuario = {
	nome,
	idade,
	empresa: 'Sem'
};
console.log(usuario);

fim object short syntax */

/* Webpack dev server

alert('Brabo d+');

Fim Webpack dev server */

/* Async/await
const minhaP = () => new Promise((resolve, reject) =>{
	setTimeout(( ) => {resolve('Oky')}, 2000);
});

async function executaPromise(){
	const response = await minhaP();
	console.log(response);
}
 executaPromise();

fim asycn/await */

//Aplicação com ES6+

import api from './api';

class App {
	constructor() {
		this.repositories = [];
		this.formEl = document.getElementById('repo-form');
		this.inputEl = document.querySelector('input[name=repository]');
		this.listEl = document.getElementById('repo-list');

		this.registerHandlers();
	}

	registerHandlers() {
		this.formEl.onsubmit = event => this.addRepository(event)
	}

	async addRepository(event) {
		event.preventDefault();

		const repoInput = this.inputEl.value;

		if (repoInput.length === 0)
			return;

		try {
			const response = await api.get(`/repos/${repoInput}`);

			const { name, description, html_url, owner: {avatar_url}} = response.data;


			this.repositories.push({
				name,
				description,
				avatar_url,
				html_url,
			});

			this.inputEl.value = '';

			this.render();
		} catch (err){
			alert('O repositorio não existe!');
		}
	}
	render(){
		this.listEl.innerHTML = '';

		this.repositories.forEach(repo => {
			let imgEl = document.createElement('img');
			imgEl.setAttribute('src', repo.avatar_url);

			let titleEl = document.createElement('strong');
			titleEl.appendChild(document.createTextNode(repo.name));

			let descriptionEl = document.createElement('p');
			descriptionEl.appendChild(document.createTextNode(repo.description));

			let linkEl = document.createElement('a');
			linkEl.setAttribute('target', '_blank');
			linkEl.setAttribute('href', repo.html_url);
			linkEl.appendChild(document.createTextNode('Acessar'));

			let listItemEl = document.createElement('li');
			listItemEl.appendChild(imgEl);
			listItemEl.appendChild(titleEl);
			listItemEl.appendChild(descriptionEl);
			listItemEl.appendChild(linkEl);

			this.listEl.appendChild(listItemEl);
		});
	}
}

new App();