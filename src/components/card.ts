import { Container } from "./container";
import { ICardOptions } from "./interfaces";

export class ToyCard {
  card: HTMLDivElement;
  choice!: (name: string) => void;
  choiceItem: Container;
  
  constructor(options: ICardOptions){
    let {num, name, count, year, shape, color, size, favorite} = options;

    let isPicked = window.localStorage.getItem('choiceItem') ? JSON.parse(window.localStorage.getItem('choiceItem')!) : [];

    let cardElement = document.createElement('div');
    cardElement.classList.add('card');

    let cardDiscription = document.createElement('div');
    cardDiscription.classList.add('card-discription');

    let cardHeading = document.createElement('h2');
    cardHeading.innerHTML = `<div>${name}</div>`;

    let cardImage = document.createElement('div');
    cardImage.innerHTML = `<img src="./assets/toys/${num}.png" alt="">`;

    cardDiscription.innerHTML = `
      <div>Кол-во: ${count}</div>
      <div>Год: ${year}</div>
      <div>Форма: ${shape}</div>
      <div>Цвет: ${color}</div>
      <div>Размер: ${size}</div>
      <div>Любимая: ${favorite ? 'Да' : 'Нет'}</div>
    `;

    this.choiceItem = new Container(cardElement, ['choice']);
    this.choiceItem.container.innerHTML = `
      <svg class="chice-item" version="1.1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 64 64">
        <title>ball</title>
        <path d="M29.497 1.563c-1.909 1.299-2.423 3.488-1.318 5.608l0.537 1.030-2.841 0.675 0.042 2.91 0.042 2.91-1.417 0.398c-12.864 3.615-20.517 18.273-16.255 31.131 4.945 14.918 21.4 21.389 35.833 14.090 2.271-1.148 6.218-4.797 7.7-7.119 0.502-0.786 1.145-1.662 1.43-1.947s0.456-0.618 0.38-0.741-0.027-0.292 0.109-0.377c0.563-0.348 1.706-3.76 2.39-7.132 2.341-11.544-5.597-24.613-16.928-27.868l-1.423-0.409-0.009-2.898c-0.011-3.354 0.129-3.015-1.364-3.294-1.509-0.282-1.531-0.313-0.92-1.315 2.249-3.688-2.411-8.088-5.988-5.653zM33.49 2.12c2.041 1.056 2.382 3.771 0.699 5.567-0.779 0.832-3.857 0.832-4.615 0-2.784-3.057 0.297-7.439 3.916-5.567z"></path>
      </svg>
    `;

    isPicked.forEach((el: string) => el === name ? this.choiceItem.container.classList.add('active') : true);

    this.choiceItem.container.onclick = () => this.choice(name);

    cardElement.append(cardHeading, cardImage, this.choiceItem.container, cardDiscription)

    this.card = cardElement;
  }
  
  drawCard(parent: HTMLElement): void{
    this.card.classList.add('hide');
    parent.append(this.card);
    setTimeout(() => {
      this.card.classList.remove('hide')
    },300)
  }
}