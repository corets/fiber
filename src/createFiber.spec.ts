import { createFiber } from "./createFiber"

describe("createFiber", () => {
  it("creates fiber", async () => {
    const foo = (n: number) => n + 3
    const fiber = createFiber({ foo })

    expect(await fiber.call("foo", 3)).toBe(6)
  })
})
