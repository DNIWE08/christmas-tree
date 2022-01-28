import { Controller } from "./components/toysController";
import { View } from "./components/toysView";
import { Model } from "./components/toysModel";
import data from "./data";
import "./style";
import { TreeView } from "./components/treeView";
import { TreeController } from "./components/treeController";
import { TreeModel } from "./components/treeModel";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Main } from "./components/main";
import { StartPopup } from "./components/start-popup";


class App {
  startPopup: StartPopup;
  constructor() {

    const header = new Header(document.body);
    const main = new Main(document.body);
    const footer = new Footer(document.body);

    this.startPopup = new StartPopup(main.wrapper);
    this.startPopup.startBtn.onclick = () => {
      toys.start();
      toys.view.openView();
      header.toysBtn.classList.add('pick');
      header.mainBtn.classList.remove('pick');
      header.mainBtn.disabled = false;
      header.toysBtn.disabled = true;
    }

    const toys = new Controller(new View(main.wrapper), new Model(data));
    const tree = new TreeController(new TreeView(), new TreeModel());
    tree.view.render(main.wrapper);

    toys.view.closeView();
    tree.view.closeView();

    header.mainBtn.onclick = () => {
      this.startPopup.show()
      header.mainBtn.disabled = true;
      header.treeBtn.disabled = false;
      header.toysBtn.disabled = false;
      tree.view.closeView();
      toys.view.closeView();
    }

    header.toysBtn.onclick = () => {
      this.startPopup.hide();
      header.toysBtn.disabled = true;
      header.mainBtn.disabled = false;
      header.treeBtn.disabled = false;
      tree.view.closeView();
      toys.view.openView();
      toys.start();
    }

    header.treeBtn.onclick = () => {
      this.startPopup.hide()
      header.treeBtn.disabled = true;
      header.mainBtn.disabled = false;
      header.toysBtn.disabled = false;
      toys.view.closeView();
      tree.view.openView();
      tree.view.render(main.wrapper);
    }

    document.body.append(footer.container);
  }
}

const app = new App();