import { readFileSync } from "node:fs";
import { compile } from "./compile";

const mockSongName = jest.fn(() => "sample-song");
const mockPrice = jest.fn(() => 10);
const mockAlpha = jest.fn(() => "abcd");

jest.mock("@faker-js/faker", () => {
  return {
    en: [],
    Faker: jest.fn(() => {
      return {
        music: { songName: mockSongName },
        commerce: { price: mockPrice },
        string: { alpha: mockAlpha },
      };
    }),
  };
});

test("context data", () => {
  const result = compile({
    template: "Hello {{context.foo}}",
    context: { foo: "foo-bar" },
  });
  expect(result).toMatchInlineSnapshot(`"Hello foo-bar"`);
});

test("repeat helper", () => {
  const template = readFileSync("fixtures/music.json.hbs", "utf-8");
  const result = compile({ template });
  expect(result).toMatchInlineSnapshot(`
"[
    {
    "music": "sample-song",
    "price": "10",
    "index": "index-0",
    "id": "abcd"
    }
,    {
    "music": "sample-song",
    "price": "10",
    "index": "index-1",
    "id": "abcd"
    }
,    {
    "music": "sample-song",
    "price": "10",
    "index": "index-2",
    "id": "abcd"
    }
,    {
    "music": "sample-song",
    "price": "10",
    "index": "index-3",
    "id": "abcd"
    }
,    {
    "music": "sample-song",
    "price": "10",
    "index": "index-4",
    "id": "abcd"
    }
]"
`);
});

test("single parameter passed to faker function", () => {
  const result = compile({ template: "{{faker 'string.alpha' 20}}" });
  expect(mockAlpha).toHaveBeenCalledWith(20);
});

test("hash parameter passed to faker function", () => {
  const result = compile({
    template: "{{faker 'commerce.price' min=20 max=50}}",
  });
  expect(mockPrice).toHaveBeenCalledWith({ "max": 50, "min": 20 });
});
