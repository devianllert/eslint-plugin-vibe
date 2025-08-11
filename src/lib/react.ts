// Inspired by https://github.com/jsx-eslint/eslint-plugin-react/blob/master/lib/util/ast.js

import estraverse, { type Visitor } from "estraverse";
import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Wrapper for estraverse.traverse
 *
 * @param {ASTNode} ASTnode The AST node being checked
 * @param {Object} visitor Visitor Object for estraverse
 */
function traverse(ASTnode: TSESTree.Node | undefined, visitor: Visitor) {
  if (!ASTnode) return;

  const opts = {
    fallback(node: TSESTree.Node) {
      return Object.keys(node).filter(
        (key) => key === "children" || key === "argument",
      );
    },
    ...visitor,
  };

  opts.keys = {
    ...visitor.keys,
    JSXElement: ["children"],
    JSXFragment: ["children"],
  };

  // @ts-expect-error we use tses-tree instead of es-tree
  estraverse.traverse(ASTnode, opts);
}

/**
 * Helper function for traversing "returns" (return statements or the
 * returned expression in the case of an arrow function) of a function
 *
 * @param {ASTNode} ASTNode The AST node being checked
 * @param {Context} context The context of `ASTNode`.
 * @param {(returnValue: ASTNode, breakTraverse: () => void) => void} onReturn
 *   Function to execute for each returnStatement found
 * @returns {undefined}
 */
function traverseReturns(
  ASTNode: TSESTree.Node,
  onReturn: (
    returnValue: TSESTree.Node | TSESTree.Expression | undefined | null,
    breakTraverse: () => void,
  ) => void,
) {
  const nodeType = ASTNode.type;

  if (nodeType === "ReturnStatement") {
    onReturn(ASTNode.argument, () => {});
    return;
  }

  if (nodeType === "ArrowFunctionExpression" && ASTNode.expression) {
    onReturn(ASTNode.body, () => {});
    return;
  }

  if (
    nodeType !== "FunctionExpression" &&
    nodeType !== "FunctionDeclaration" &&
    nodeType !== "ArrowFunctionExpression" &&
    nodeType !== "MethodDefinition"
  ) {
    return;
  }

  traverse("body" in ASTNode ? ASTNode.body : undefined, {
    // @ts-expect-error we use tses-tree instead of es-tree
    enter(node: TSESTree.Node) {
      const breakTraverse = () => {
        this.break();
      };
      switch (node.type) {
        case "ReturnStatement":
          this.skip();
          onReturn(node.argument, breakTraverse);
          return;
        case "BlockStatement":
        case "IfStatement":
        case "ForStatement":
        case "WhileStatement":
        case "SwitchStatement":
        case "SwitchCase":
          return;
        default:
          this.skip();
      }
    },
  });
}

const isReturningJsx = (node: TSESTree.Node) => {
  switch (node.type) {
    case "JSXElement":
    case "JSXFragment":
      return true;
    default:
      return false;
  }
};

export const isReactComponent = (node: TSESTree.Node) => {
  let foundJsx = false;

  traverseReturns(node, (returnNode, breakTraverse) => {
    if (!returnNode) return;

    if (isReturningJsx(returnNode)) {
      foundJsx = true;
      breakTraverse();
    }
  });

  return foundJsx;
};
