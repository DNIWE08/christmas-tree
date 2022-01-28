import { ICardOptions, Options } from "./interfaces";
import { Model } from "./toysModel";
import { View } from "./toysView";

export class Controller {
  sizeArray: ICardOptions[];
  sortType: string;
  view: View;
  start: () => void;

  constructor(view: View, public model: Model) {
    this.sizeArray = JSON.parse(JSON.stringify(model.data));
    this.sortType = "";
    this.view = view;

    view.rerender = () => view.search(this.sortToys());

    view.onSizeToys = (type) => {
      model.size[type] = !model.size[type];
      view.search(this.sortToys());
    }

    view.onShapeToys = (type) => {
      model.shape[type] = !model.shape[type];
      view.search(this.sortToys());
    }

    view.onColorToys = (type) => {
      model.color[type] = !model.color[type];
      view.search(this.sortToys());
    }

    view.onFavoriteToys = () => {
      model.favorite = !model.favorite;
      view.search(this.sortToys());
    }

    view.onCountChange = (min, max) => {
      model.count.max = max;
      model.count.min = min;
      view.search(this.sortToys());
    }

    view.onYearChange = (start, end) => {
      model.year.start = start;
      model.year.end = end;
      view.search(this.sortToys());
    }

    view.onInputSearch = () => {
      view.search(this.sortToys());
    }

    view.onSortToys = (type) => {
      this.sortType = type;
      view.search(this.sortToys());
    }

    view.onReset = () => {
      this.clearFilter(model.size);
      this.clearFilter(model.shape);
      this.clearFilter(model.color);
      model.favorite = false;
      view.filters.sizeBtns.forEach(el => el.button.classList.remove('pick'));
      view.filters.shapeBtns.forEach(el => el.button.classList.remove('pick'));
      view.filters.colorBtns.forEach(el => el.button.classList.remove('pick'));
      view.filters.favoriteBtn.button.classList.remove('pick');
      view.filters.sliderCounter.resetInput();
      view.filters.sliderYear.resetInput();

      view.search(this.sortToys());
    }

    this.start = () => {
      view.search(this.sortToys());
    }
  }

  clearFilter(type: Options){
    for (const el in type) {
      type[el] = false;
    }
  }

  // Сделать асинхронную функцию (промис)

  checkSize() {
    let result: ICardOptions[] = [];
    let falseCounter = 0;
    for (const key in this.model.size) {
      if(this.model.size[key]){
        result = result.concat(this.sizeArray.filter((el) => el.size === key))
        falseCounter += 1;  
      }
    }

    if(result.length === 0 && falseCounter === 0) return this.sizeArray;
    return result;
  }
  
  checkShape() {
    let result: ICardOptions[] = [];
    let falseCounter = 0;
    for (const key in this.model.shape) {
      if(this.model.shape[key]){
        result = result.concat(this.checkSize().filter((el) => el.shape === key))
        falseCounter += 1;
      }
    }

    if(result.length === 0 && falseCounter === 0) return this.checkSize();
    return result;
  }

  checkColor() {
    let result: ICardOptions[] = [];
    let falseCounter = 0;
    for (const key in this.model.color) {
      if(this.model.color[key]){
        result = result.concat(this.checkShape().filter((el) => el.color === key))
        falseCounter += 1;  
      } 
    }
    
    if(result.length === 0 && falseCounter === 0) return this.checkShape();
    return result;
  }

  checkFavorite() {
    if(this.model.favorite) {
      return this.checkColor().filter((el) => el.favorite === true);
    }
    return this.checkColor()
  }

  checkCount(): ICardOptions[] {    
    let rangeSearch = this.checkFavorite().map((el) => {
      if((+el.count <= +this.model.count.max) && (+el.count >= +this.model.count.min)) return el;
    });
    let filterDataArr = rangeSearch.filter(el => {
      if(el) return el;
    });
    return filterDataArr as ICardOptions[];
  }

  checkYear(){
    let rangeSearch = this.checkCount()
    .map((el) => ((+el.year <= +this.model.year.end) && (+el.year >= +this.model.year.start)) ? el : null)
    .filter(el => {if(el) return el});
     
    return rangeSearch as ICardOptions[];
  }

  sortToys(){
    let sort = this.checkYear().sort((a, b) => {
      if(this.sortType === 'nameMax'){
        return a.name > b.name ? 1 : -1;
      } else if(this.sortType === 'nameMin') {
        return a.name > b.name ? -1 : 1;
      } else if(this.sortType === 'yearMax') {
        return a.year > b.year ? 1 : -1;
      } else if(this.sortType === 'yearMin') {
        return a.year > b.year ? -1 : 1;
      }
      return 0;
    });
    return sort;
  }
}