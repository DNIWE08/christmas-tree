import { Container } from "./container";

export class Footer extends Container {
  constructor(parent: HTMLElement){
    super(parent, ['footer']);

    let logo = document.createElement('a');
    logo.classList.add('course-logo');
    logo.href = 'https://rs.school/js/';
    logo.style.backgroundImage = 'url("https://rs.school/images/rs_school_js.svg")'
    let gitHub = document.createElement('a');
    gitHub.textContent = 'DNIWE08';
    gitHub.href = 'https://github.com/DNIWE08';
    let createIn = document.createElement('div');
    createIn.textContent = '2021';

    this.container.append(logo, createIn, gitHub)
  }
}
