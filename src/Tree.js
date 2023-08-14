class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
        
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array)
        this.levelOrderArray = []
        this.preOrderArray = []
        this.inOrderArray = []
        this.postOrderArray = []
        this.nodeHeight = 0
    }

    buildTree(array) {  
        const sorted = this.sortArray(array)
        const filtered = this.removeDuplicates(sorted)
        if(filtered.length === 0) return null
        const mid = Math.floor(filtered.length/2)
        const newNode = new Node(filtered[mid])
        newNode.left = this.buildTree(filtered.slice(0, mid))
        newNode.right = this.buildTree(filtered.slice(mid + 1))
        return newNode
    }

    insert(value, root = this.root) {
        if(root == null) return new Node(value)
        if(value < root.data) {
            root.left = this.insert(value, root.left)
        } else if(value > root.data) {
            root.right = this.insert(value, root.right)
        }
        return root
    }

    delete(value, root = this.root) {
        if(root == null) return new Node(value)
        if(value < root.data) {
            root.left = this.delete(value, root.left)
        } else if(value > root.data) {
            root.right = this.delete(value, root.right)
        } else {
            if(root.left == null) return root.right
            if(root.right == null) return root.left
            // if both nodes have children
            let parent = root
            let next = root.data
            // while left node is available, keep traversing down the left branch
            while(parent.left !== null) {
                parent = next
                next = root.left.data
            }
            // replace parent's left node with next's right node
            if(parent !== root) {
                parent.left = next.right
            // if value is to the parent's right node, traverse down the right branch and move each right node to preceding node's right node
            } else {
                parent.right = next.right
            }
            root.data = next.data 
        }
        return root
    }

    find(value, root = this.root) {
        if(root === null) return null
        if(value < root.data) {
            return this.find(value, root.left)
        } else if(value > root.data) {
            return this.find(value, root.right)
        } else {
            return root
        }
    }

    levelOrder(func = this.makeArray, root = this.root) {
        if(root === null) return
        const queue = [root]
        while(queue.length) {
            const node = queue[0]
            func(this.levelOrderArray, queue[0].data)
            if(node.left) queue.push(node.left)
            if(node.right) queue.push(node.right)
            queue.shift()
        }
        return this.levelOrderArray
    }

    inOrder(func = this.makeArray, root = this.root) {
        if(root === null) return
        this.inOrder(func, root.left)
        func(this.inOrderArray, root.data)
        this.inOrder(func, root.right)
        return this.inOrderArray
    }

    preOrder(func = this.makeArray, root = this.root) {
        if(root === null) return
        func(this.preOrderArray, root.data)
        this.preOrder(func, root.left)
        this.preOrder(func, root.right)
        return this.preOrderArray
    }

    postOrder(func = this.makeArray, root = this.root) {
        if(root === null) return
        this.postOrder(func, root.left)
        this.postOrder(func, root.right)
        func(this.postOrderArray, root.data)
        return this.postOrderArray
    }

    height(value, root = this.root) {
        this.getHeight(value, root)
        return this.nodeHeight
    }

    depth(node, root = this.root, level = 0) {
        if(!node) return null
        if(root === null) return 0
        if(root.data === node.data) return level
        const count = this.depth(node, root.left, level + 1)
        if(count !== 0) return count
        return this.depth(node, root.right, level + 1)
    }

    isBalanced(root = this.root) {
        if(root === null) return true
        const leftHeight = this.getHeight(root, root.left)
        const rightHeight = this.getHeight(root, root.right)
        if(Math.abs(leftHeight - rightHeight) <= 1 && this.isBalanced(root.left) === true && this.isBalanced(root.right) === true) {
            return true
        }
        return false
    }

    rebalance() {
        if(this.root === null) return
        // since buildtree already executes a sorting function inside, simply rebuild the array using any traversal
        this.root = this.buildTree(this.preOrder())
    }

    // Helper functions

    sortArray(array) {
        return array.sort((a,b) => a - b)
    }

    removeDuplicates(array) {
        const filtered = []
        for(let i = 0; i < array.length; i++) {
            if(!filtered.includes(array[i])) {
                filtered.push(array[i])
            }
        }
        return filtered
    }

    makeArray(array, value) {
        return array.push(value)
    }

    getHeight(node, root = this.root) {
        if(root === null) return -1
        const leftHeight = this.getHeight(node, root.left)
        const rightHeight = this.getHeight(node, root.right)
        const result = Math.max(leftHeight, rightHeight) + 1
        if(node.data === root.data) {
            this.nodeHeight = result
        }
        return result
    }

}


export {
    Tree,
    Node
}