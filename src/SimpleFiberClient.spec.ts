import { createFiber } from "./createFiber"
import { createFiberClient } from "./createFiberClient"
import { FiberClientHandler } from "./types"

describe("SimpleFiberClient", () => {
  it("calls custom handler accordingly", async () => {
    const foo = (n: number) => 3 + n
    const fiber = createFiber({ foo })
    const handler: FiberClientHandler<typeof fiber> = (method, ...args) => {
      return fiber.call(method, ...args)
    }
    const client = createFiberClient<typeof fiber>(handler)

    expect(await client.call("foo", 2)).toBe(5)
    expect(await client.foo(3)).toBe(6)
  })
})
