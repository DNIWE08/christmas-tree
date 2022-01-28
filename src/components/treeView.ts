import data from "../data";
import { ChangeColorBtn, CreateGirland } from "./garland";
import { ICardOptions } from "./interfaces";

export class TreeView {
  node: HTMLElement;
  filters: ViewFilters;
  tree: ViewTree;
  toys: ViewToys;
  garland!: CreateGirland;
  toysContainer: HTMLDivElement;
  constructor(){
    this.node = document.createElement('div');
    this.node.classList.add('tree--view');
    this.filters = new ViewFilters(this.node);
    this.tree = new ViewTree(this.node);

    this.toysContainer = document.createElement('div'); 

    this.node.append(this.toysContainer)

    let toysText = document.createElement('h2');
    toysText.classList.add('tree--filters-heading');
    toysText.textContent = 'Игрушки:';
    this.toysContainer.append(toysText);

    this.toys = new ViewToys(this.toysContainer);
    this.garland = new CreateGirland(this.tree.node);

    this.filters.onGarland = () => {
      this.garland.isGarland();
    }

    this.filters.changeColor = (color) => {
      this.garland.changeColor(color);
      this.garland.isOpenGarland();
    }
  }

  render(parent: HTMLElement) {
    parent.append(this.node);
  }

  closeView() {
    this.node.style.opacity = '0';
    this.node.style.display = 'none';
    this.node.addEventListener('transitionend', () => {
    })
  }

  openView() {
    this.node.style.opacity = '1';
    this.node.style.display = 'flex';
    this.node.addEventListener('transitionend', () => {
    })
    this.toys.rerender();
  }
}

export class TreeContainer {
  node: HTMLDivElement;
  constructor(parent: HTMLElement, styles: string[] = []) {
    this.node = document.createElement('div');
    this.node.classList.add(...styles);
    parent.append(this.node);
  }
}

class ViewTree {
  node: TreeContainer;
  mapElement: HTMLMapElement;
  mapAreaElement: HTMLAreaElement;
  mapImage: HTMLImageElement;
  constructor(parent: HTMLElement){
    this.node = new TreeContainer(parent, ['map-field']);
    this.mapElement = document.createElement('map');
    this.mapElement.name = 'toys-map';
    this.mapAreaElement = document.createElement('area');
    this.mapAreaElement.classList.add('map-area');
    this.mapAreaElement.style.cursor = 'copy';
    this.mapAreaElement.shape = 'poly';
    this.mapImage = new Image();
    this.mapImage.useMap = '#toys-map';

    this.setBgTree();
    
    this.mapElement.append(this.mapAreaElement);
    this.node.node.append(this.mapElement, this.mapImage);
    parent.append(this.node.node);
  }

  setBgTree(bgIndex: number = 0) {
    this.node.node.style.backgroundImage = `url("./assets/bg/${bgIndex + 1}.jpg")`;
  }

  setTree(treeIndex: number, coords: string) {
    this.mapAreaElement.coords = coords;
    this.mapImage.src = `./assets/tree/${treeIndex + 1}.png`;
  }
}

class ViewFilters {
  node: TreeContainer;
  treeContainer: TreeContainer;
  bgContainer: TreeContainer;
  garlandBtn: HTMLDivElement;
  snowBtn: HTMLButtonElement;
  soundBtn: HTMLButtonElement;
  onBgChange!: (bgIndex: number) => void;
  onTreeChange!: (treeIndex: number) => void;
  onSnowStart!: () => void;
  onSoundStart!: () => void;
  onGarland!: () => void;
  changeColor!: (color: string) => void;
  localBtn: HTMLButtonElement;
  constructor(parent: HTMLElement){
    this.node = new TreeContainer(parent, ['tree--container', 'tree--filters-container']);

    this.snowBtn = document.createElement('button');
    this.snowBtn.classList.add('tree--filters-button');
    this.snowBtn.textContent = "Снег";
    this.snowBtn.onclick = () => {
      this.onSnowStart();
    };

    this.soundBtn = document.createElement('button');
    this.soundBtn.classList.add('tree--filters-button');
    this.soundBtn.textContent = "Звук";
    this.soundBtn.onclick = () => {
      this.onSoundStart();
    };

    this.localBtn = document.createElement('button');
    this.localBtn.classList.add('tree--filters-button', 'used');
    this.localBtn.textContent = "Очистить хранилище";
    this.localBtn.onclick = () => {
      window.localStorage.clear()
    };

    this.node.node.append(this.snowBtn, this.soundBtn, this.localBtn)

    const treesHeading = document.createElement('h2');
    treesHeading.classList.add('tree--filters-heading');
    treesHeading.textContent = "выбор ёлки:";
    this.node.node.append(treesHeading);

    this.treeContainer = new TreeContainer(this.node.node, ['flex-container']);

    const bgHeading = document.createElement('h2');
    bgHeading.classList.add('tree--filters-heading');
    bgHeading.textContent = "выбор фона:";
    this.node.node.append(bgHeading);

    this.bgContainer = new TreeContainer(this.node.node, ['flex-container']);

    for(let i = 0; i < 6; i++){
      let tree = new TreeCell(this.treeContainer.node, i);
      tree.onTreeChange = () => {
        this.onTreeChange(i)
      };
    }

    for(let i = 0; i < 10; i++){
      let bg = new BackgroundCell(this.bgContainer.node, i);
      bg.onBgChange = () => {
        this.onBgChange(i)
      };
    }

    const garlandHeading = document.createElement('h2');
    garlandHeading.classList.add('tree--filters-heading');
    garlandHeading.textContent = "цвет гирлянды:";
    this.node.node.append(garlandHeading);

    const garlandColorContainer = document.createElement('div');
    garlandColorContainer.classList.add('tree--garland-colors');
    this.node.node.append(garlandColorContainer);

    this.garlandBtn = document.createElement('div');
    this.garlandBtn.classList.add('tree--garland-button');
    this.garlandBtn.onclick = () => {
      this.garlandBtn.classList.toggle('active');
      this.onGarland();
    };
    garlandColorContainer.append(this.garlandBtn)

    const lotBtn = new ChangeColorBtn(garlandColorContainer, 'lot');
    lotBtn.colorBtn.onclick = () => {
      this.changeColor(lotBtn.color);
      this.garlandBtn.classList.add('active');
    }
    const yellowBtn = new ChangeColorBtn(garlandColorContainer, 'yellow');
    yellowBtn.colorBtn.onclick = () => {
      this.changeColor(yellowBtn.color);
      this.garlandBtn.classList.add('active');
    }
    const redBtn = new ChangeColorBtn(garlandColorContainer, 'red');
    redBtn.colorBtn.onclick = () => {
      this.changeColor(redBtn.color);
      this.garlandBtn.classList.add('active');
    }
    const greenBtn = new ChangeColorBtn(garlandColorContainer, 'green');
    greenBtn.colorBtn.onclick = () => {
      this.changeColor(greenBtn.color);
      this.garlandBtn.classList.add('active');
    }
    const blueBtn = new ChangeColorBtn(garlandColorContainer, 'blue');
    blueBtn.colorBtn.onclick = () => {
      this.changeColor(blueBtn.color);
      this.garlandBtn.classList.add('active');
    }
  }
}

class TreeCell {
  treeCell: TreeContainer;
  onTreeChange!: () => void;
  constructor(parent: HTMLElement, index: number) {
    this.treeCell = new TreeContainer(parent, ['tree--filters-tree__cell']);
    this.treeCell.node.style.backgroundImage = `url(./assets/tree/${index + 1}.png)`;
    this.treeCell.node.onclick = () => this.onTreeChange();
  }
}

class BackgroundCell {
  treeBackground: TreeContainer;
  onBgChange!: () => void;
  constructor(parent: HTMLElement, index: number) {
    this.treeBackground = new TreeContainer(parent, ['tree--filters-background__cell']);
    this.treeBackground.node.style.backgroundImage = `url(./assets/bg/${index + 1}.jpg)`;
    this.treeBackground.node.onclick = () => this.onBgChange();
  }
}

class ViewToys {
  node: TreeContainer;
  toys: ToyImage[];
  toyCell: ToyCell[];
  constructor(parent: HTMLElement){
    this.node = new TreeContainer(parent, ['tree--container', 'tree--toys-container']);
    this.toys = [];
    this.toyCell = [];

    this.start(this.getData());
  }

  getData(){
    let storageData = window.localStorage.getItem('choiceItem');
    let testResult: ICardOptions[] = [];

    data.forEach(el => {
      if(!storageData) return;
      JSON.parse(storageData).forEach((name: string) => {
        if(el.name === name) {
          testResult.push(el)
        }
      })
    });

    return testResult.length !== 0 ? testResult :  data.filter(el => +el.num <= 20);
  }

  rerender() {
    while (this.node.node.firstChild) {
      console.log(this.node.node.firstChild)
      this.node.node.removeChild(this.node.node.firstChild);
    }
    this.toys = [];
    this.toyCell = [];
    this.start(this.getData())
  }
  
  start(choiceToys: ICardOptions[]){
    for(let i = 0; i < choiceToys.length; i++){
      let toyCell = new ToyCell(this.node.node, choiceToys[i].count);
      this.toyCell.push(toyCell);
      let toyCount = 0;
      while(toyCount < Number(choiceToys[i].count)){
        let toy = new ToyImage(toyCell.toyCell.node, choiceToys[i])
        this.toys.push(toy);
        toyCount++;
        toy.changed = () => {
          toyCell.checkToysOnTree()
        }
      }
    }
  }

  onTreeChange() {
    this.toys.forEach(el => el.onTreeChange());
    this.toyCell.forEach(el => el.checkToysOnTree());
  }
}

class ToyCell {
  toyCell: TreeContainer;
  counter: number;
  countContainer: HTMLParagraphElement;
  cellToys: ToyImage[];
  constructor(parent: HTMLElement, toysCount: string) {
    this.toyCell = new TreeContainer(parent, ['tree--toy-cell']);
    this.counter = +toysCount;
    this.countContainer = document.createElement('p');
    this.countContainer.classList.add('tree--toys-count')
    this.countContainer.textContent = this.counter.toString();
    this.cellToys = [];
    this.toyCell.node.append(this.countContainer)
  }
  
  checkToysOnTree(){
    let cellToysOnTree = 0;
    for(let i = 0; i < this.toyCell.node.children.length; i++){
      let isTop = Number.parseInt((this.toyCell.node.children[i] as HTMLElement).style.top);
      isTop === 0 || !isTop ? cellToysOnTree : cellToysOnTree += 1;
    };
    this.countContainer.textContent = (this.counter - cellToysOnTree).toString();
  }
}

class ToyImage {
  dragImage: HTMLImageElement;
  startX: number;
  startY: number;
  x: number;
  y: number;
  changed!: () => void;
  constructor(parent: HTMLElement, options: ICardOptions) {
    let dragImage = document.createElement('img');
    this.dragImage = dragImage
    this.dragImage.setAttribute('draggable', 'true');
    this.dragImage.src = `./assets/toys/${options.num}.png`;
    this.dragImage.classList.add('drag-image');
    this.dragImage.style.cursor = 'move';
    parent.append(this.dragImage);

    this.startX = 0;
    this.startY = 0;
    this.x = 0;
    this.y = 0 ;

    this.dragImage.addEventListener('dragstart', (event) => {
      this.dragImage.style.position = 'absolute';
      this.startX = event.clientX;
      this.startY = event.clientY;
    });
    this.dragImage.addEventListener('dragend', (event) => {
      this.dragImage.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      this.dragImage.hidden = false;
      this.x = event.clientX;
      this.y = event.clientY;
      if(!elemBelow) return;
      let droppableBelow = elemBelow.closest('.map-area');
      if(!droppableBelow){
        this.dragImage.style.left = '0px';
        this.dragImage.style.top = '0px';
      } else {
        this.dragImage.style.left = `${+this.dragImage.style.left.split('px')[0] + event.clientX - this.startX}px`;
        this.dragImage.style.top = `${+this.dragImage.style.top.split('px')[0] + event.clientY - this.startY}px`;
      }
      this.changed()  
    });
  }

  onTreeChange(){
    this.dragImage.hidden = true;
    let elemBelow = document.elementFromPoint(this.x, this.y);
    this.dragImage.hidden = false;
    if(!elemBelow?.closest('.map-area')){
      this.dragImage.style.left = '0px';
      this.dragImage.style.top = '0px';
    }
  }
}