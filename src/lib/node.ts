import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";

export const findParent = <T extends TSESTree.Node>(
  node: TSESTree.Node,
  predicate: (node: TSESTree.Node) => boolean,
): T | undefined => {
  const parent = node.parent;

  if (parent && !predicate(parent)) {
    return findParent(parent, predicate);
  }

  return parent as T;
};

export const findComponentDeclaration = (
  node: TSESTree.Node,
): TSESTree.Node => {
  const declaration = node.parent;

  if (declaration && declaration?.type !== AST_NODE_TYPES.Program) {
    return findComponentDeclaration(declaration);
  }

  return node;
};

export const getComponentName = (
  node:
    | TSESTree.ArrowFunctionExpression
    | TSESTree.FunctionDeclaration
    | TSESTree.FunctionExpression,
) => {
  let componentName: string | undefined;

  if (node.type === AST_NODE_TYPES.ArrowFunctionExpression) {
    const parent = findParent<TSESTree.VariableDeclarator>(
      node,
      (parentNode) => parentNode.type === AST_NODE_TYPES.VariableDeclarator,
    );

    if (parent?.id.type === AST_NODE_TYPES.Identifier) {
      componentName ??= parent.id.name;
    }
  }

  if (node.type === AST_NODE_TYPES.FunctionDeclaration) {
    componentName ??= node.id?.name;
  }

  if (node.type === AST_NODE_TYPES.FunctionExpression) {
    componentName ??= node.id?.name;
  }

  return componentName ?? "Component";
};
