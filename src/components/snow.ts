import { TreeContainer } from "./treeView";

export function createSnow(parent: TreeContainer){
  const snowflake = document.createElement('i');
  snowflake.style.left = `${Math.random() * parent.node.getBoundingClientRect().width}px`;
  let size = Math.random() * 10
  snowflake.style.width = `${size}px`;
  snowflake.style.height = `${size}px`;
  snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
  snowflake.style.opacity = Math.random().toString();
  parent.node.append(snowflake);
  
  setTimeout(() => {
    snowflake.remove();
	}, 3000)
}
