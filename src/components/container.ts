export class Container {
  container: HTMLDivElement;

  constructor(parent: HTMLElement, styles: string[] = [], textContent: string = ''){
    let container = document.createElement('div');
    container.textContent = textContent;
    container.classList.add(...styles);
    this.container = container;
    parent.append(container)
  }
}