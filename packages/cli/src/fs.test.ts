import fs from "node:fs";
import { writeTemplateOutputToFile } from "./fs";

jest.mock("node:fs");

beforeEach(() => {
  fs.writeFileSync = jest.fn();
});

test("save template with extension file name", () => {
  writeTemplateOutputToFile({
    content: "template output",
    templatePath: "/dir/to/template.json.hbs",
  });

  expect(fs.writeFileSync).toHaveBeenCalledWith(
    "/dir/to/template.json",
    "template output",
  );
});

test("save template with extension file name to specified directory", () => {
  writeTemplateOutputToFile({
    content: "template output",
    outPutDir: "/output/dir",
    templatePath: "/dir/to/template.json.hbs",
  });

  expect(fs.writeFileSync).toHaveBeenCalledWith(
    "/output/dir/template.json",
    "template output",
  );
});

test("save template with no double extension", () => {
  writeTemplateOutputToFile({
    content: "template output",
    outPutDir: "/output/dir",
    templatePath: "/dir/to/template.hbs",
  });

  expect(fs.writeFileSync).toHaveBeenCalledWith(
    "/output/dir/template",
    "template output",
  );
});
