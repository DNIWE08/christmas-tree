import { ICardOptions } from "./interfaces";
import { FilterButton } from "./filterButton";
import { ToyCard } from "./card";
import { Filters } from "./filters";

export class View {
  onSizeToys!: (option: string) => void;
  onColorToys!: (option: string) => void;
  onShapeToys!: (option: string) => void;
  onFavoriteToys!: () => void;
  onCountChange!: (min: string, max: string) => void;
  onYearChange!: (start: string, end: string) => void;
  onReset!: () => void;
  onInputSearch!: () => void;
  onSortToys!: (type: string) => void;
  wrapper: HTMLDivElement;
  resultToysContainer: HTMLDivElement;
  searchInput: HTMLInputElement;
  selectedItem: ICardOptions[];
  filters: Filters;
  rerender!: () => void;
  toysPageWrapper: HTMLDivElement;

  constructor(parent: HTMLElement) {
    this.toysPageWrapper = document.createElement('div');
    this.toysPageWrapper.classList.add('toys-page-wrapper');

    let filtersWrapper = document.createElement('div');
    filtersWrapper.classList.add('filters-wrapper');

    let inputWrapper = document.createElement('div');
    inputWrapper.classList.add('input-wrapper');

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('card-wrapper');

    this.searchInput = document.createElement('input');
    this.searchInput.type = 'search';
    this.searchInput.placeholder = 'Поиск игрушек';
    this.searchInput.addEventListener('input', () => this.onInputSearch());
    this.searchInput.autofocus = true;
    
    this.filters = new Filters(filtersWrapper);
    
    this.filters.sizeBtns.forEach(el => {
      el.button.onclick = () => {
        this.setBtnMethod(this.onSizeToys, el);
      }
    });
    
    this.filters.shapeBtns.forEach(el => {
      el.button.onclick = () => {
        this.setBtnMethod(this.onShapeToys, el);
      }
    });
    
    this.filters.colorBtns.forEach(el => {
      el.button.onclick = () => {
        this.setBtnMethod(this.onColorToys, el);
      }
    });
    
    this.filters.resetBtn.button.onclick = () => { this.onReset() }
    
    this.filters.favoriteBtn.button.onclick = () => { this.setBtnMethod(this.onFavoriteToys, this.filters.favoriteBtn) };
    
    this.filters.sliderCounter.onChange = (min, max) => {
      this.onCountChange(min, max)
    }
    this.filters.sliderYear.onChange = (start, end) => {
      this.onYearChange(start, end)
    }

    this.filters.sortBtns.forEach(el => {
      el.button.onclick = () => {
        this.filters.sortBtns.forEach(el => {el.button.classList.remove('pick')});
        el.button.classList.add('pick');
        let type = el.button.getAttribute('filter') as string;
        this.onSortToys(type);
      }
    });

    this.selectedItem = window.localStorage.getItem('choiceItem') ? JSON.parse(window.localStorage.getItem('choiceItem')!) :[];

    this.resultToysContainer = document.createElement('div');
    this.resultToysContainer.textContent = `Выбрано игрушек: ${this.selectedItem.length}`;

    this.filters.rerender = () => {
      this.rerender();
      this.selectedItem = [];
      this.resultToysContainer.textContent = `Выбрано игрушек: ${this.selectedItem.length}`;
    };
    
    inputWrapper.append(this.searchInput, this.resultToysContainer)
    this.toysPageWrapper.append(filtersWrapper, inputWrapper, this.wrapper);
    parent.append(this.toysPageWrapper);
  }

  setBtnMethod(method: Function, element: FilterButton){
    element.button.classList.toggle('pick');
    method(element.button.getAttribute('filter'))
  }

  render(array: ICardOptions[]): void {
    this.clearNodeChilds();
    if (array.length !== 0){
      const renderList = array.map(el => {
        const card = new ToyCard(el);
        card.drawCard(this.wrapper)
      })
    } else {
      const massage = document.createElement('p');
      massage.textContent = "Совпадений не найдено";
      this.wrapper.append(massage)
    }
  }

  search(array: ICardOptions[]) {
    this.clearNodeChilds();
    array.forEach((el: any) => {
    if(el.name.toLowerCase().includes(this.searchInput.value.toLowerCase())) {
        let newCard = new ToyCard(el);
        newCard.choice = (name) => {
          if(this.selectedItem.includes(el.name)) {
            newCard.choiceItem.container.classList.remove('active');
            this.selectedItem.splice(this.selectedItem.indexOf(el.name), 1);
            this.resultToysContainer.textContent = `Выбрано игрушек: ${this.selectedItem.length}`
          } else if(this.selectedItem.length === 20) {
            let popupContainer = document.createElement('div');
            popupContainer.classList.add('popup-container', 'hide');
            setTimeout(() => {
              popupContainer.classList.remove('hide');
            }, 0)
            let popup = document.createElement('div');
            popup.classList.add('popup');
            popup.textContent = 'Выбрано максимальное количество игрушек';
            let exitBtn= document.createElement('button');
            exitBtn.classList.add('exit-popup');
            exitBtn.textContent = 'Понятно';
            exitBtn.onclick = () => {
              popupContainer.classList.add('hide');
              setTimeout(() => {
                popupContainer.remove();
              }, 300)
            }
            popup.append(exitBtn);
            popupContainer.append(popup);
            document.body.append(popupContainer);
            return false
          } else {
            newCard.choiceItem.container.classList.add('active');
            this.selectedItem.push(el.name);
            this.resultToysContainer.textContent = `Выбрано игрушек: ${this.selectedItem.length}`
          }
          window.localStorage.setItem('choiceItem', JSON.stringify(this.selectedItem));
        };
        newCard.drawCard(this.wrapper);
      }
    })
    if (this.wrapper.childElementCount === 0) {
      const massage = document.createElement('p');
      massage.textContent = "Совпадений не найдено";
      this.wrapper.append(massage)
    };
  }

  clearNodeChilds() {
    while (this.wrapper.firstChild) {
      this.wrapper.removeChild(this.wrapper.firstChild);
    }
  }

  closeView() {
    this.toysPageWrapper.style.opacity = '0';
    this.toysPageWrapper.style.display = 'none';
    this.toysPageWrapper.addEventListener('transitionend', () => {
    })
  }

  openView() {
    this.toysPageWrapper.style.opacity = '1';
    this.toysPageWrapper.style.display = 'flex';
    this.toysPageWrapper.addEventListener('transitionend', () => {
    })
  }
}
