import { createSnow } from "./snow";
import { TreeModel } from "./treeModel";
import { TreeView } from "./treeView";

export class TreeController {
  view: TreeView;
  model: TreeModel;
  startSnow: NodeJS.Timeout | undefined;
  audio: HTMLAudioElement;
  constructor(view: TreeView, model: TreeModel) {
    this.view = view;
    this.model = model;
    
    view.filters.onBgChange = (index) => {
      model.currentBgNumber = index;
      view.tree.setBgTree(model.currentBgNumber);
    }
    
    view.filters.onTreeChange = (index) => {
      model.currentTreeNumber = index;
      view.tree.setTree(model.currentTreeNumber, model.treeOptions[model.currentTreeNumber].treeCoords);
      view.toys.onTreeChange();
    }

    view.filters.onSnowStart = () => {
      model.isSnowStarted = !model.isSnowStarted;
      model.isSnowStarted ? view.filters.snowBtn.classList.add('pick') : view.filters.snowBtn.classList.remove('pick');
      this.snowStart();
    }
    
    this.audio = new Audio();
    
    view.filters.onSoundStart = () => {
      model.isMusicStarted = !model.isMusicStarted;
      model.isMusicStarted ? view.filters.soundBtn.classList.add('pick') : view.filters.soundBtn.classList.remove('pick');
      this.musicStart();
    }

    view.tree.setTree(model.currentTreeNumber, model.treeOptions[model.currentTreeNumber].treeCoords);

    document.body.addEventListener('click',() => {
      this.musicStart();
    }, {once: true});

    window.onload = () => {
      view.tree.setTree(model.currentTreeNumber, model.treeOptions[model.currentTreeNumber].treeCoords);
      view.toys.onTreeChange();
      view.tree.setBgTree(model.currentBgNumber);
      this.snowStart();
      model.isSnowStarted ? view.filters.snowBtn.classList.add('pick') : view.filters.snowBtn.classList.remove('pick');
      model.isMusicStarted ? view.filters.soundBtn.classList.add('pick') : view.filters.soundBtn.classList.remove('pick');
    }
  }

  snowStart(){  
    if(this.model.isSnowStarted === false){
      clearTimeout(this.startSnow as NodeJS.Timeout);
    } else {
      this.startSnow = setInterval(() => createSnow(this.view.tree.node), 200);
    }
  }

  musicStart(){
  this.audio.src = './assets/audio/audio.mp3';
  this.audio.volume = 0.3;
  if(this.model.isMusicStarted) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
}