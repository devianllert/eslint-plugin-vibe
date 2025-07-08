import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from "@typescript-eslint/utils";
import type { RuleFunction } from "@typescript-eslint/utils/ts-eslint";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`,
);

type RuleOptions =
  | [
      {
        checkVariables?: boolean;
        checkGenerics?: boolean;
        checkFunctions?: boolean;
      },
    ]
  | [];

type RuleMessageIds = "fn" | "variable" | "generic";

export const enforceExplicitTypes = createRule<RuleOptions, RuleMessageIds>({
  name: "enforce-explicit-types",
  meta: {
    schema: [
      {
        type: "object",
        properties: {
          checkVariables: {
            type: "boolean",
          },
          checkGenerics: {
            type: "boolean",
          },
          checkFunctions: {
            type: "boolean",
          },
        },
        additionalProperties: false,
      },
    ],
    type: "problem",
    docs: {
      description: "Enforce explicit props",
    },
    messages: {
      fn: "Should use interface or type to define arguments",
      variable: "Should use interface or type to define variables",
      generic: "Should use interface or type to define generics",
    },
  },
  defaultOptions: [],
  create(context) {
    const {
      checkVariables = true,
      checkFunctions = true,
    } = context.options[0] ?? {};

    const isTypeLiteral = (types?: AST_NODE_TYPES) => {
      if (!types) return false;

      return types === AST_NODE_TYPES.TSTypeLiteral;
    };

    const isLiteral = (param: TSESTree.BindingName) => {
      return isTypeLiteral(param.typeAnnotation?.typeAnnotation.type);
    };

    const isIdentifier = (
      param: TSESTree.Parameter,
    ): param is TSESTree.Identifier => {
      return param.type === AST_NODE_TYPES.Identifier;
    };

    const checkParamsInFn = (
      node:
        | TSESTree.FunctionDeclaration
        | TSESTree.FunctionExpression
        | TSESTree.ArrowFunctionExpression,
    ) => {
      const params = node.params;

      return params.filter(isIdentifier).forEach((param) => {
        if (isLiteral(param)) {
          context.report({
            node: param,
            messageId: "fn",
          });
        }
      });
    };

    const checkVariable = (node: TSESTree.VariableDeclarator) => {
      if (isLiteral(node.id)) {
        context.report({
          node: node.id,
          messageId: "variable",
        });
      }
    };

    const ruleSelectors: Record<string, RuleFunction> = {};

    if (checkFunctions) {
      ruleSelectors["FunctionDeclaration"] = checkParamsInFn;
      ruleSelectors["FunctionExpression"] = checkParamsInFn;
      ruleSelectors["ArrowFunctionExpression"] = checkParamsInFn;
    }

    if (checkVariables) {
      ruleSelectors["VariableDeclarator"] = checkVariable;
    }

    return ruleSelectors;
  },
});
