import { SimpleFiberClient } from "./SimpleFiberClient"
import {
  Fiber,
  FiberClientAccessor,
  FiberClientFactory,
  FiberClientHandler,
  FiberMapping,
} from "./types"

export const createFiberClient: FiberClientFactory = <
  TFiber extends Fiber<FiberMapping>
>(
  handler: FiberClientHandler<TFiber>
) => {
  const client = new SimpleFiberClient<TFiber>(handler)

  const dynamicClient = new Proxy(
    {},
    {
      get(_, key) {
        if (typeof key === "string") {
          if (key === "call") {
            return (method, ...args) => client.call(method, ...(args as any))
          }

          return (...args) => client.call(key, ...(args as any))
        }
      },
    }
  ) as FiberClientAccessor<TFiber>

  return dynamicClient
}
