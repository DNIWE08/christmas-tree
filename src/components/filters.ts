import { Container } from "./container";
import { CountSlider, sliderCounterOptions, sliderYearOptions, YearSlider } from "./doubleSlider";
import { FilterButton } from "./filterButton";

export class Filters {

  filterBtns: FilterButton[];
  sizeBtns: FilterButton[];
  containers: HTMLDivElement[];
  shapeBtns: FilterButton[];
  colorBtns: FilterButton[];
  resetBtn: FilterButton;
  favoriteBtn: FilterButton;
  sliderCounter: CountSlider;
  sliderYear: YearSlider;
  sortBtns: FilterButton[];
  resetLocalBtn: FilterButton;
  rerender!: () => void;

  constructor(parent: HTMLDivElement) {
    this.filterBtns = [
      new FilterButton('Размер', 'размер', parent, ['pick']),
      new FilterButton('Форма', 'форма', parent),
      new FilterButton('Цвет', 'цвет', parent),
      new FilterButton('Параметры', 'параметры', parent),
      new FilterButton('Сортровка', 'сортировка', parent),
    ];

    this.resetBtn = new FilterButton('Сброс Фильров', '', parent);
    this.resetLocalBtn = new FilterButton('Удалить данные', '', parent);

    this.resetLocalBtn.button.onclick = () => {
      window.localStorage.clear()
      this.rerender()
    };

    let sizeBtnsContainer = new Container(parent, ['btns-container'])
    let shapeBtnsContainer = new Container(parent, ['btns-container', 'hide'])
    let colorBtnsContainer = new Container(parent, ['btns-container', 'hide'])
    let optionsBtnsContainer = new Container(parent, ['btns-container', 'hide'])
    let sortBtnsContainer = new Container(parent, ['btns-container', 'hide'])

    this.containers = [
      sizeBtnsContainer.container,
      shapeBtnsContainer.container,
      colorBtnsContainer.container,
      optionsBtnsContainer.container,
      sortBtnsContainer.container
    ];

    this.containers.forEach(el => el.classList.add('btns-container'));

    this.filterBtns.forEach((_, index) => {
      this.handler(this.filterBtns[index], this.containers[index]);
    });
    
    this.sizeBtns = [
      new FilterButton('Большие', 'большой', sizeBtnsContainer.container),
      new FilterButton('Средние', 'средний', sizeBtnsContainer.container),
      new FilterButton('Маленькие', 'малый', sizeBtnsContainer.container),
    ];
    
    this.shapeBtns = [
      new FilterButton('Шар', 'шар', shapeBtnsContainer.container),
      new FilterButton('Колокольчик', 'колокольчик', shapeBtnsContainer.container),
      new FilterButton('Шишка', 'шишка', shapeBtnsContainer.container),
      new FilterButton('Снежинка', 'снежинка', shapeBtnsContainer.container),
      new FilterButton('Фигурка', 'фигурка', shapeBtnsContainer.container),
    ];
    
    this.colorBtns = [
      new FilterButton('Белый', 'белый', colorBtnsContainer.container),
      new FilterButton('Синий', 'синий', colorBtnsContainer.container),
      new FilterButton('Красный', 'красный', colorBtnsContainer.container),
      new FilterButton('Зелёный', 'зелёный', colorBtnsContainer.container),
      new FilterButton('Желтый', 'желтый', colorBtnsContainer.container),
    ];

    this.sortBtns = [
      new FilterButton('По умолчанию', 'default', sortBtnsContainer.container, ['pick']),
      new FilterButton('По названию (возрастание)', 'nameMax', sortBtnsContainer.container),
      new FilterButton('По названию (убывание)', 'nameMin', sortBtnsContainer.container),
      new FilterButton('По дате (возрастание)', 'yearMax', sortBtnsContainer.container),
      new FilterButton('По дате (убывание)', 'yearMin', sortBtnsContainer.container),
    ];    

    this.favoriteBtn = new FilterButton('Любимые', 'favorite', optionsBtnsContainer.container);
    this.sliderCounter = new CountSlider(optionsBtnsContainer.container, sliderCounterOptions);
    this.sliderYear = new YearSlider(optionsBtnsContainer.container, sliderYearOptions);

    parent.append(...this.containers)
  }
  
  handler(btnHandle: FilterButton, containerHandle: HTMLDivElement){
      btnHandle.button.onclick = () => {
        for (const container of this.containers) {
          this.hideContainers(container, () => {
            containerHandle.classList.remove('hide');
          });
          for (const btn of this.filterBtns) {
            btn.button.disabled = false;
            btn.button.classList.remove('pick');
          }
        btnHandle.button.disabled = true;
        btnHandle.button.classList.add('pick');
      }
    }
  }

  hideContainers(container: HTMLDivElement, res: Function){
    container.classList.add('hide');
    container.ontransitionend = () => {
      res();
    };
  }
}