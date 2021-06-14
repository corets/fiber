import { createFiberClient } from "./createFiberClient"
import { createFiber } from "./createFiber"

describe("createFiberClient", () => {
  it("creates fiber client", async () => {
    const foo = (n: number) => n + 3
    const fiber = createFiber({ foo })
    const client = createFiberClient<typeof fiber>((method, ...args) => {
      return fiber.call(method, ...args)
    })

    expect(await client.foo(2)).toBe(5)
    expect(await client.call("foo", 3)).toBe(6)
  })
})
