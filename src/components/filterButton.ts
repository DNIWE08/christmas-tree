import { CountSlider, sliderCounterOptions, sliderYearOptions, YearSlider } from "./doubleSlider";

export class FilterButton {
  button: HTMLButtonElement;
  attr: string;
  constructor(text: string, attr: string = '', parent: HTMLElement, className: string[] = []){
    let button = document.createElement('button');
    button.textContent = text;
    button.classList.add(...className)
    button.setAttribute('filter', attr);
    this.attr = attr; 
    this.button = button;    
    parent.append(this.button);
    this.isPicked();
  }

  isPicked() {
    if(this.attr === 'favorite' && JSON.parse(window.localStorage.getItem('favorite')!)) {
      this.button.classList.add('pick');
    }
    this.checkPicked('color');
    this.checkPicked('shape');
    this.checkPicked('size');
  }

  checkPicked(filter: string){
    let color = JSON.parse(window.localStorage.getItem(filter)!)
    for(let item in color){
      if(this.attr === item && color[item]) {
        this.button.classList.add('pick');
      }    
    }
  }
}
