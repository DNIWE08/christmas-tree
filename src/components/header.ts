import { Container } from "./container";

export class Header extends Container {
  mainBtn: HTMLButtonElement;
  treeBtn: HTMLButtonElement;
  toysBtn: HTMLButtonElement;
  constructor(parent: HTMLElement){
    super(parent, ['page-header']);
    
    this.mainBtn = document.createElement('button');
    this.mainBtn.textContent = 'ГЛАВНАЯ';
    this.mainBtn.classList.add('pick');

    this.mainBtn.addEventListener('click', () => {
      this.treeBtn.classList.remove('pick');
      this.toysBtn.classList.remove('pick');
      this.mainBtn.classList.add('pick');
    })
    
    this.treeBtn = document.createElement('button');
    this.treeBtn.textContent = 'ЁЛКИ';

    this.treeBtn.addEventListener('click', () => {
      this.treeBtn.classList.add('pick');
      this.toysBtn.classList.remove('pick');
      this.mainBtn.classList.remove('pick');
    })

    this.toysBtn = document.createElement('button');
    this.toysBtn.textContent = 'ИГРУШКИ';
    
    this.toysBtn.addEventListener('click', () => {
      this.treeBtn.classList.remove('pick');
      this.toysBtn.classList.add('pick');
      this.mainBtn.classList.remove('pick');
    });

    this.container.append(this.mainBtn, this.toysBtn, this.treeBtn)
  }
}
