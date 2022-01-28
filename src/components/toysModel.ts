import { ICardOptions, Options } from "./interfaces"; 

export class Model {
  onChange!: (dataTest: any, last: any) => void;
  size: Options;
  color: Options;
  shape: Options;
  favorite: boolean;
  count: { min: string; max: string; };
  year: { start: string; end: string; };

  constructor(public data: ICardOptions[]) {
    this.data = data;

    this.color = window.localStorage.getItem('color') ? JSON.parse(window.localStorage.getItem('color')!) : {
      'белый': false,
      'синий': false,
      'красный': false,
      'зелёный': false,
      'желтый': false,
    }

    this.shape = window.localStorage.getItem('shape') ? JSON.parse(window.localStorage.getItem('shape')!) : {
      'шар': false,
      'колокольчик': false,
      'шишка': false,
      'снежинка': false,
      'фигурка': false,
    }

    this.size = window.localStorage.getItem('size') ? JSON.parse(window.localStorage.getItem('size')!) : {
      'большой': false,
      'средний': false,
      'малый': false,
    }

    this.count = window.localStorage.getItem('count') ? JSON.parse(window.localStorage.getItem('count')!) : {
      min: '1',
      max: '12'
    }

    this.year = window.localStorage.getItem('year') ? JSON.parse(window.localStorage.getItem('year')!) : {
      start: '1940',
      end: '2020'
    }

    this.favorite = window.localStorage.getItem('favorite') ? JSON.parse(window.localStorage.getItem('favorite')!) : false;

    window.addEventListener('beforeunload', () => {
      window.localStorage.setItem('color', JSON.stringify(this.color));
      window.localStorage.setItem('shape', JSON.stringify(this.shape));
      window.localStorage.setItem('size', JSON.stringify(this.size));
      window.localStorage.setItem('count', JSON.stringify(this.count));
      window.localStorage.setItem('year', JSON.stringify(this.year));
      window.localStorage.setItem('favorite', JSON.stringify(this.favorite));
    })
  }
}