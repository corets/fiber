import { SimpleFiber } from "./SimpleFiber"

describe("SimpleFiber", () => {
  it("calls methods accordingly", async () => {
    const foo = (n: number) => n + 3
    const fiber = new SimpleFiber({ foo })

    expect(await fiber.call("foo", 2)).toBe(5)
  })

  it("throws an error for an invalid method call", async () => {
    const foo = (n: number) => n + 3
    const fiber = new SimpleFiber({ foo })

    await expect(() => fiber.call("bar" as any)).rejects.toThrow(
      `Invalid fiber method call "bar"`
    )
  })
})
