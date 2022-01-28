import { Container } from "./container";

export class StartPopup extends Container{
  startBtn: HTMLButtonElement; 
  constructor(parent: HTMLElement) {
    super(parent, ['start-popup']);
    const startText =  document.createElement('p');
    startText.textContent = 'Новогодняя игра "Наряди Ёлку"';
    this.startBtn =  document.createElement('button');
    this.startBtn.textContent = 'Начать';
    this.container.append(startText, this.startBtn);

    this.startBtn.addEventListener('click', () => {
      this.hide()
    })
  }

  hide() {
    this.container.style.opacity = '0';
    this.container.style.display = 'none';
  }

  show() {
    this.container.style.opacity = '1';
    this.container.style.display = 'flex';
  }
} 