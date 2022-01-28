import { Container } from "./container";

export class Main extends Container {
  wrapper: HTMLDivElement;
  constructor(parent: HTMLElement){
    super(parent, ['main']);

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('main-wrapper');

    this.container.append(this.wrapper)
  }
}