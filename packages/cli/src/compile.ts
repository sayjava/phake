import Handlebars from "handlebars";
import { en, Faker } from "@faker-js/faker";
import objectPath from "object-path";
import "./helpers";

interface GenerateInterface {
  template: string;
  context?: {
    [key: string]: any;
  };
}

export const compile = (gi: GenerateInterface) => {
  const { template, context = {} } = gi;
  return Handlebars.compile(template, { compat: true, preventIndent: false })({
    context,
  });
};
