import { Tree } from "./Tree";
import './styles/style.scss'


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};


const array = [1, 2, 3, 4]
const newTree = new Tree(array)
newTree.insert(5);
newTree.insert(6);
newTree.insert(7);
newTree.insert(8);
newTree.rebalance()
prettyPrint(newTree.root)