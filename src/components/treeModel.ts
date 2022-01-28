type treeOptionsType = {
  treeCoords: string;
}

export class TreeModel {
  treeOptions: treeOptionsType[];
  _isSnowStarted: boolean;
  _isMusicStarted: boolean;
  _isGarlandStarted: boolean;
  _currentBgNumber: number;
  _currentTreeNumber: number;
  prefix: string;
  isGarland: boolean;
  garlandColor: string;
  constructor() {
    this.garlandColor = '';
    this.isGarland = false;

    this.prefix = 'tree';
    this.treeOptions = [
      {
        treeCoords: '223,0,284,1,278,24,300,37,319,72,322,95,332,119,365,125,379,156,369,177,377,195,410,200,422,237,407,258,417,285,400,316,427,321,447,363,433,390,430,410,463,425,476,463,456,493,456,515,500,523,500,584,483,618,447,698,399,682,379,712,103,713,53,669,0,595,0,523,19,494,0,448,24,403,57,402,50,342,86,313,101,265,82,214,115,186,148,192,142,125,173,93,195,33',
      },
      {
        treeCoords: '232,0,203,35,166,102,106,276,79,292,76,348,56,373,69,411,40,457,14,502,4,545,11,600,0,620,0,652,50,653,93,670,85,690,111,713,159,713,217,688,270,706,402,707,413,690,488,665,500,636,500,564,490,515,413,338,373,219,347,173,323,92,267,0',
      },
      {
        treeCoords: '214,0,266,0,308,49,357,185,404,308,451,411,475,502,498,556,496,621,476,678,393,687,336,713,120,713,25,666,0,638,0,576',
      },
      {
        treeCoords: '230,1,267,0,303,101,379,239,381,287,424,342,414,376,433,407,434,431,465,463,449,497,468,531,447,543,497,590,498,639,465,674,456,713,216,713,176,700,152,692,109,713,59,713,52,684,3,674,2,568,34,522,22,474,56,436,48,388,71,357,71,302,98,271,128,228,108,197,137,175,135,141,162,119',
      },
      {
        treeCoords: '229,4,267,4,432,431,420,458,466,514,500,613,497,653,459,665,416,713,237,713,182,703,153,713,57,709,33,667,0,651,0,589',
      },
      {
        treeCoords: '230,0,280,0,307,25,313,67,343,125,383,192,378,220,400,233,417,316,452,362,452,401,443,423,467,449,482,525,500,552,499,617,481,664,350,713,168,713,36,664,0,651,0,588,19,502,32,466,39,424,51,344,132,156',
      },
    ];
    this._currentBgNumber = this.getFromLocal(`current-bg-number`) ? Number.parseInt(this.getFromLocal(`current-bg-number`)!) : 0;
    this._currentTreeNumber = this.getFromLocal(`current-tree-number`) ? Number.parseInt(this.getFromLocal(`current-tree-number`)!) : 0;
    this._isSnowStarted = this.getFromLocal(`is-snow-started`) ? (this.getFromLocal(`is-snow-started`) === 'true' ? true : false) : false;
    this._isMusicStarted = this.getFromLocal(`is-music-started`) ? (this.getFromLocal(`is-music-started`) === 'true' ? true : false) : false;
    this._isGarlandStarted = this.getFromLocal(`is-garland-started`) ? (this.getFromLocal(`is-garland-started`) === 'true' ? true : false) : false;
  }

  get currentTreeNumber() {
    return this._currentTreeNumber;
  }

  set currentTreeNumber(value) {
    this._currentTreeNumber = value;
    this.setToLocal('current-tree-number', value);
  }

  get currentBgNumber() {
    return this._currentBgNumber;
  }

  set currentBgNumber(value) {
    this._currentBgNumber = value;
    this.setToLocal('current-bg-number', value);
  }

  get isSnowStarted() {
    return this._isSnowStarted;
  }

  set isSnowStarted(value) {
    this._isSnowStarted = value;
    this.setToLocal('is-snow-started', value);
  }

  get isMusicStarted() {
    return this._isMusicStarted;
  }

  set isMusicStarted(value) {
    this._isMusicStarted = value;
    this.setToLocal('is-music-started', value);
  }

  get isGarlandStarted() {
    return this._isGarlandStarted;
  }

  set isGarlandStarted(value) {
    this._isGarlandStarted = value;
    this.setToLocal('is-garland-started', value);
  }

  setToLocal(key: string, value: any){
    window.localStorage.setItem(`${this.prefix}-${key}`, JSON.stringify(value))
  }

  getFromLocal(key: string){
    return window.localStorage.getItem(`${this.prefix}-${key}`)
  }

}