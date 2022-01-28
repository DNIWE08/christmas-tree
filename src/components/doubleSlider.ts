interface ISliderOptions<T> {
  min: T,
  max: T,
  step: T,
  startMin: T,
  startMax: T,
  color1: T,
  color2: T,
  containerClass: T[],
  styleInput1: T[],
  styleInput2: T[],
  doubleSliderWrapper: T[],
  valuesStyles: T[],
  year: boolean,
}

export const sliderCounterOptions: ISliderOptions<string> = {
  min: '1',
  max: '12',
  step: '1',
  startMin: '1', 
  startMax: '12', 
  color1: '#ccc',
  color2: '#fff',
  containerClass: ['textContainer'],
  styleInput1: ['textInput1', 'test'],
  styleInput2: ['textInput2', 'test'],
  doubleSliderWrapper: ['wrapper'],
  valuesStyles: ['text'],
  year: false,
}

export const sliderYearOptions: ISliderOptions<string> = {
  min: '1',
  max: '9',
  step: '1',
  startMin: '1', 
  startMax: '9', 
  color1: '#ccc',
  color2: '#fff',
  containerClass: ['textContainer'],
  styleInput1: ['textInput1', 'test'],
  styleInput2: ['textInput2', 'test'],
  doubleSliderWrapper: ['wrapper'],
  valuesStyles: ['text'],
  year: true,
}

export class CountSlider {
  onChange!: (min: string, max: string) => void;
  options: ISliderOptions<string>;
  inputWrapper: HTMLDivElement;
  sliderWrapper: HTMLDivElement;
  secondInpit: RangeSlider;
  firstInpit: RangeSlider;
  textMax: HTMLParagraphElement;
  textMin: HTMLParagraphElement;
  currentMin: string;
  currentMax: string;
  inputWidth: number;

  constructor(sliderParent: HTMLElement, options: ISliderOptions<string>) {

    this.options = options;
    this.sliderWrapper = document.createElement('div');
    this.inputWrapper = document.createElement('div');
    this.textMax = document.createElement('p');
    this.textMin = document.createElement('p');
    this.firstInpit = new RangeSlider(options, window.localStorage.getItem('firstInput-count') ? JSON.parse(window.localStorage.getItem('firstInput-count')!) : options.min);
    this.secondInpit =  new RangeSlider(options, window.localStorage.getItem('secondInpit-count') ? JSON.parse(window.localStorage.getItem('secondInpit-count')!) : options.max);

    this.currentMin = window.localStorage.getItem('firstInput-count') ? JSON.parse(window.localStorage.getItem('firstInput-count')!) : options.min;
    this.currentMax = window.localStorage.getItem('secondInpit-count') ? JSON.parse(window.localStorage.getItem('secondInpit-count')!) : options.max;
    this.textMin.textContent = window.localStorage.getItem('firstInput-count') ? JSON.parse(window.localStorage.getItem('firstInput-count')!) : options.min;
    this.textMax.textContent = window.localStorage.getItem('secondInpit-count') ? JSON.parse(window.localStorage.getItem('secondInpit-count')!) : options.max;

    this.firstInpit.element.classList.add(...options.styleInput1);
    this.secondInpit.element.classList.add(...options.styleInput2);
    this.sliderWrapper.classList.add(...options.doubleSliderWrapper);
    this.textMin.classList.add(...options.valuesStyles);
    this.textMax.classList.add(...options.valuesStyles);
    this.inputWrapper.classList.add(...options.containerClass);
    this.inputWrapper.style.cssText = `
      position: relative;
      pointer-events: none;
    `;
    this.firstInpit.element.style.marginTop = `-${this.firstInpit.element.style.height}`;

    this.firstInpit.element.addEventListener('change', () => this.onChange(this.currentMin, this.currentMax));
    this.secondInpit.element.addEventListener('change', () => this.onChange(this.currentMin, this.currentMax));
    this.firstInpit.element.addEventListener('input', () => this.firstSliderContoll());
    this.secondInpit.element.addEventListener('input', () => this.secondSliderContoll());

    this.inputWrapper.append(this.secondInpit.element, this.firstInpit.element);
    this.sliderWrapper.append(this.textMin, this.inputWrapper, this.textMax)
    sliderParent.append(this.sliderWrapper)
    
    this.inputWidth = +(getComputedStyle(this.secondInpit.element).width).split('px')[0];
    
    this.updateSliderColor();

    window.addEventListener('beforeunload', () => {
      this.setLocal()
    })
  }

  firstSliderContoll(){
    this.sliderContoll(this.firstInpit, this.secondInpit, true)
  }

  secondSliderContoll(){
    this.sliderContoll(this.firstInpit, this.secondInpit, false)
  }

  sliderContoll(first: RangeSlider, second: RangeSlider, min: boolean) {    
    this.updateSliderColor();
    const firstValue = parseInt(first.element.value);
    const secondValue = parseInt(second.element.value);
    if(min){
      this.textMin.textContent = first.element.value;
      this.currentMin = first.element.value;
      if (secondValue <= firstValue) {
        this.currentMin = (secondValue - 0).toString();
        this.textMin.textContent = (secondValue - 0).toString();
        first.element.value = (secondValue - 0).toString();
        return;
      }
    } else {
      this.textMax.textContent = second.element.value;
      this.currentMax = second.element.value;
      if (firstValue >= secondValue) {
        this.currentMax = (firstValue + 0).toString();
        this.textMax.textContent = (firstValue + 0).toString();
        second.element.value = (firstValue + 0).toString();
        return;
      }
    }
  }

  resetInput(){
    this.currentMin = this.options.min;
    this.currentMax = this.options.max;
    this.textMax.textContent = this.options.max;
    this.textMin.textContent = this.options.min;
    this.firstInpit.element.value = this.options.startMin;
    this.secondInpit.element.value =  this.options.startMax;
    this.onChange(this.currentMin, this.currentMax);
    this.updateSliderColor()
  }

  updateSliderColor(){    
    let min = +this.firstInpit.element.min;
    let max = +this.firstInpit.element.max;

    // ошибка в inputWidth

    let position1 = (200 / max) * (+this.firstInpit.element.value - min);
    let position2 = (200 / max) * (+this.secondInpit.element.value);

    let color = `
    linear-gradient(90deg, 
      ${this.options.color1} ${position1 + 7}px,
      ${this.options.color2} ${position1 + 7}px,
      ${this.options.color2} ${position2 - 7}px,
      ${this.options.color1} ${position2 - 7}px
    )`;
    
    this.firstInpit.element.style.background = color;
    this.secondInpit.element.style.background = color;
  }

  setLocal(){
    window.localStorage.setItem('firstInput-count', this.firstInpit.element.value)
    window.localStorage.setItem('secondInpit-count', this.secondInpit.element.value)
  }
}

export class YearSlider extends CountSlider {
  constructor(sliderParent: HTMLElement, options: ISliderOptions<string>){
    super(sliderParent, options);
    this.firstInpit.element.value = window.localStorage.getItem('firstInput-year') ? JSON.parse(window.localStorage.getItem('firstInput-year')!) : options.min;
    this.secondInpit.element.value = window.localStorage.getItem('secondInpit-year') ? JSON.parse(window.localStorage.getItem('secondInpit-year')!) : options.max;
    this.currentMin = this.converYear(window.localStorage.getItem('firstInput-year') ? JSON.parse(window.localStorage.getItem('firstInput-year')!) : options.min);
    this.currentMax = this.converYear(window.localStorage.getItem('secondInput-year') ? JSON.parse(window.localStorage.getItem('secondInput-year')!) : options.max);
    this.textMin.textContent = this.converYear(window.localStorage.getItem('firstInput-year') ? JSON.parse(window.localStorage.getItem('firstInput-year')!) : options.min);
    this.textMax.textContent = this.converYear(window.localStorage.getItem('secondInput-year') ? JSON.parse(window.localStorage.getItem('secondInput-year')!) : options.max);
    this.updateSliderColor()
  }

  sliderContoll(first: RangeSlider, second: RangeSlider, min: boolean) {    
    this.updateSliderColor();
    const firstValue = parseInt(first.element.value);
    const secondValue = parseInt(second.element.value);
    if(min){
      this.textMin.textContent = this.converYear(first.element.value);
      this.currentMin = this.converYear(first.element.value);
      if (secondValue <= firstValue) {
        this.currentMin = this.converYear((secondValue - 0).toString());
        this.textMin.textContent = this.converYear((secondValue - 0).toString());
        first.element.value = (secondValue - 0).toString();
        return;
      }
    } else {
      this.textMax.textContent = this.converYear(second.element.value);
      this.currentMax = this.converYear(second.element.value);   
      if (firstValue >= secondValue) {
        this.currentMax = this.converYear((firstValue + 0).toString());
        this.textMax.textContent = this.converYear((firstValue + 0).toString());
        second.element.value = (firstValue + 0).toString();
        return;
      }
    }
  }

  resetInput(){
    this.currentMin = this.converYear(this.options.min);
    this.currentMax = this.converYear(this.options.max);
    this.textMax.textContent = this.converYear(this.options.max);
    this.textMin.textContent = this.converYear(this.options.min);
    this.firstInpit.element.value = this.options.startMin;
    this.secondInpit.element.value =  this.options.startMax;
    this.onChange(this.currentMin, this.currentMax);
    this.updateSliderColor()
  }

  converYear(value: string) {
    return (1930 + +value * 10).toString();
  }

  setLocal() {
    window.localStorage.setItem('firstInput-year', this.firstInpit.element.value)
    window.localStorage.setItem('secondInpit-year', this.secondInpit.element.value)
  }
}

class RangeSlider {
  element: HTMLInputElement;
  max: any;
  min: any;
  value!: number;
  style: any;

  constructor(options: ISliderOptions<string>, value: string){
    let rangeSLider = document.createElement('input');
    rangeSLider.type = 'range';
    rangeSLider.min = options.min;
    rangeSLider.max = options.max;
    rangeSLider.step = options.step;
    rangeSLider.value = value;
    rangeSLider.style.cssText = `
      -webkit-appearance: none;
      appearance: none;
      display: block;
      margin: 0px 0px 0px 0px ;
      padding: 0;
      box-sizing: border-box;
      height: 5px;
      border-radius: 40px;
    `;
    this.element = rangeSLider;
  }
}