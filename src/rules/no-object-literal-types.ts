import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from "@typescript-eslint/utils";
import { isReactComponent } from "../lib/react";
import { findComponentDeclaration, getComponentName } from "../lib/node";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/devianllert/eslint-plugin-vibe/docs/rules${name}`,
);

type RuleOptions = [];

type RuleMessageIds = "default";

export const noObjectLiteralTypesForProps = createRule<
  RuleOptions,
  RuleMessageIds
>({
  name: "no-object-literal-types",
  meta: {
    schema: [
      {
        type: "object",
        additionalProperties: false,
      },
    ],
    fixable: "code",
    type: "problem",
    docs: {
      description: "No object literal type for props",
    },
    messages: {
      default: "Create a dedicated interface/type for props",
    },
  },
  defaultOptions: [],
  create(context) {
    const isTypeLiteral = (types?: AST_NODE_TYPES) => {
      if (!types) return false;

      return types === AST_NODE_TYPES.TSTypeLiteral;
    };

    const isParameterLiteral = (param: TSESTree.BindingName) => {
      return isTypeLiteral(param.typeAnnotation?.typeAnnotation.type);
    };

    const isIdentifier = (
      param: TSESTree.Parameter,
    ): param is TSESTree.Identifier => {
      return param.type === AST_NODE_TYPES.Identifier;
    };

    const checkPropsInComponent = (
      node:
        | TSESTree.FunctionDeclaration
        | TSESTree.FunctionExpression
        | TSESTree.ArrowFunctionExpression,
    ) => {
      if (!isReactComponent(node)) return;

      const params = node.params;

      return params.filter(isIdentifier).forEach((param) => {
        if (isParameterLiteral(param)) {
          context.report({
            node: param,
            messageId: "default",
            fix(fixer) {
              const componentName = getComponentName(node);
              const declarationNode = findComponentDeclaration(node);
              const interfaceName = `${componentName}Props`;
              const objectLiteral = param.typeAnnotation?.typeAnnotation;
              const interfaceBody = context.sourceCode.getText(objectLiteral);

              const interfaceDeclaration = fixer.insertTextBefore(
                declarationNode,
                `interface ${interfaceName} ${interfaceBody}`,
              );

              return [
                interfaceDeclaration,
                fixer.insertTextAfterRange(interfaceDeclaration.range, "\n\n"),
                fixer.replaceText(param, `props: ${interfaceName}`),
              ];
            },
          });
        }
      });
    };

    return {
      FunctionDeclaration: checkPropsInComponent,
      FunctionExpression: checkPropsInComponent,
      ArrowFunctionExpression: checkPropsInComponent,
    };
  },
});
