export class ChoiceModel {
  private _choicedItems: any[];
  onChange!: (array: any[]) => void;
  constructor() {
    this._choicedItems = [];
  }

  get choicedItems(){
    return this._choicedItems;
  }

  set choicedItems(value: any) {
    this._choicedItems.push(value);
    this?.onChange(this._choicedItems)
  }
}