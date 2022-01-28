import { TreeContainer } from "./treeView";

export class CreateGirland {
  firstLine: HTMLDivElement;
  secondLine: HTMLDivElement;
  thirdLine: HTMLDivElement;
  fourthLine: HTMLDivElement;
  allDots: Dot[];
  garlandOn: boolean;
  girlandContainer: HTMLDivElement;
  changeColor!: (color: string) => void;
  constructor(parent: TreeContainer){
    this.allDots = []
    this.girlandContainer = document.createElement('div');
    this.girlandContainer.classList.add('garland-container');
    this.garlandOn = true;

    this.firstLine = document.createElement('div');
    this.firstLine.classList.add('line');

    this.createDots(2, this.firstLine);
    this.firstLine.childNodes.forEach((el, index) => {
      if(index === 0) {
        (el as HTMLElement).style.transform = "rotate(5deg)";
      }
      
      if(index === this.firstLine.childNodes.length - 1) {
        (el as HTMLElement).style.transform = "rotate(-5deg)";
      }
    });
    this.secondLine = document.createElement('div');
    this.secondLine.classList.add('line');

    this.createDots(4, this.secondLine);
    this.secondLine.childNodes.forEach((el, index) => {
      if(index === 0) {
        (el as HTMLElement).style.transform = "translateY(-10px) rotate(15deg)";
      }
      if(index === 1) {
        (el as HTMLElement).style.transform = "rotate(5deg)";
      }
      
      if(index === this.secondLine.childNodes.length - 2) {
        (el as HTMLElement).style.transform = "rotate(-5deg)";
      }
      
      if(index === this.secondLine.childNodes.length - 1) {
        (el as HTMLElement).style.transform = "translateY(-10px) rotate(-15deg)";
      }
    });
    this.thirdLine = document.createElement('div');
    this.thirdLine.classList.add('line');

    this.createDots(6, this.thirdLine);
    this.thirdLine.childNodes.forEach((el, index) => {
      if(index === 0) {
        (el as HTMLElement).style.transform = "translateY(-40px) rotate(25deg)";
      }
      if(index === 1) {
        (el as HTMLElement).style.transform = "translateY(-25px) rotate(20deg)";
      }
      if(index === 2) {
        (el as HTMLElement).style.transform = "translateY(-15px) rotate(7deg)";
      }
      if(index === this.thirdLine.childNodes.length - 3) {
        (el as HTMLElement).style.transform = "translateY(-15px) rotate(-7deg)";
      }
      if(index === this.thirdLine.childNodes.length - 2) {
        (el as HTMLElement).style.transform = "translateY(-25px) rotate(-20deg)";
      }
      if(index === this.thirdLine.childNodes.length - 1) {
        (el as HTMLElement).style.transform = "translateY(-40px) rotate(-25deg)";
      }
    });
    this.fourthLine = document.createElement('div');
    this.fourthLine.classList.add('line');
    
    this.createDots(8, this.fourthLine);
    this.fourthLine.childNodes.forEach((el, index) => {
      if(index === 0) {
        (el as HTMLElement).style.transform = "translateY(-50px) rotate(25deg)";
      }
      if(index === 1) {
        (el as HTMLElement).style.transform = "translateY(-35px) rotate(20deg)";
      }
      if(index === 2) {
        (el as HTMLElement).style.transform = "translateY(-25px) rotate(15deg)";
      }
      if(index === 3) {
        (el as HTMLElement).style.transform = "translateY(-20px) rotate(7deg)";
      }
      if(index === this.fourthLine.childNodes.length - 4) {
        (el as HTMLElement).style.transform = "translateY(-20px) rotate(-7deg)";
      }
      if(index === this.fourthLine.childNodes.length - 3) {
        (el as HTMLElement).style.transform = "translateY(-25px) rotate(-15deg)";
      }
      if(index === this.fourthLine.childNodes.length - 2) {
        (el as HTMLElement).style.transform = "translateY(-35px) rotate(-20deg)";
      }
      if(index === this.fourthLine.childNodes.length - 1) {
        (el as HTMLElement).style.transform = "translateY(-50px) rotate(-25deg)";
      }
    });

    this.changeColor = (color) => {
      this.allDots.forEach(el => el.changeColor(color))
    }

    this.girlandContainer.append(this.firstLine, this.secondLine, this.thirdLine, this.fourthLine);
    parent.node.append(this.girlandContainer);

    this.isGarland();
  }

  createDots(count: number, parent: HTMLElement){
    while(count > 0){
      this.allDots.push(new Dot(parent));
      count--;
    }
  }

  isGarland(){
    this.garlandOn = !this.garlandOn;
    this.girlandContainer.style.opacity = this.garlandOn ? '1' : '0';
  }

  isOpenGarland(){
    this.garlandOn = true;
    this.girlandContainer.style.opacity =  '1';
  }
}

class Dot {
  dot: HTMLSpanElement;
  constructor(parent: HTMLElement){
    this.dot = document.createElement('span');
    this.dot.classList.add('dot', 'lot-color');
    parent.append(this.dot);
  }

  changeColor(color: string) {
    this.dot.classList.remove(this.dot.classList[1]);
    this.dot.classList.add(`${color}-color`);
  }
}

export class ChangeColorBtn {
  colorBtn: HTMLDivElement;
  color: string;
  constructor(parent: HTMLElement, color: string){
    let colorBtn = document.createElement('div');
    colorBtn.classList.add('garland-color');
    this.color = color;
    this.color === 'lot' ? colorBtn.style.background = 'linear-gradient(135deg, #f3f700 33%, #00ffff 33%, #00ffff 66%, #f70094 66%)' : colorBtn.style.backgroundColor = color;
    this.colorBtn = colorBtn;
    parent.append(this.colorBtn)
  }
}