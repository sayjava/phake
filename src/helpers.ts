import Handlebars from "handlebars";
import { en, Faker } from "@faker-js/faker";
import objectPath from "object-path";

Handlebars.registerHelper("repeat", function (count: number, options: any) {
  if (Number.isNaN(count)) {
    throw new Error("Each section requires a number");
  }

  const list: string[] = [];
  for (let index = 0; index < count; index++) {
    // @ts-ignore
    list.push(options.fn(this, { data: { index } }));
  }
  return list.join(",");
});

Handlebars.registerHelper("randomize", function (...args: any) {
  const [, ...rest] = Array.from(args).reverse();
  const randomIdex = Math.floor(Math.random() * rest.length);
  return rest[randomIdex];
});

Handlebars.registerHelper(
  "setVar",
  function (name: string, value: any, options: any) {
    options.data.root[name] = value;
    return;
  },
);

Handlebars.registerHelper("faker", function (...args: any[]) {
  const [type, ...rest] = args;
  const fake = new Faker({ locale: [en] });
  const fakeFunc = objectPath.get(fake, type);
  const [{ hash }, ...params] = rest.concat().reverse();

  if (fakeFunc) {
    if (Object.keys(hash).length) {
      return fakeFunc(hash);
    }

    return fakeFunc(...params);
  }

  return `fakerjs does not support ${type}`;
});

Handlebars.registerHelper("helperMissing", function (...args: any[]) {
  try {
    const [{ name }] = args.concat()
      .reverse();
    return `${name} helper is not available`;
  } catch (error) {
    return error.message;
  }
});
