import {
  Fiber,
  FiberMapping,
  InferFiberProducerArgs,
  InferFiberMethods,
  InferFiberProducerResult,
} from "./types"

export class SimpleFiber<TMapping extends FiberMapping<never>>
  implements Fiber<TMapping> {
  mapping: TMapping

  constructor(mapping?: TMapping) {
    this.mapping = mapping ?? ({} as TMapping)
  }

  // todo: simplify types?
  async call<
    TMethod extends InferFiberMethods<Fiber<TMapping>>,
    TArgs extends InferFiberProducerArgs<Fiber<TMapping>, TMethod>,
    THandlerResult extends InferFiberProducerResult<Fiber<TMapping>, TMethod>
  >(method: TMethod, ...args: TArgs): Promise<THandlerResult> {
    const handler = this.mapping[method as string]

    if (!handler) {
      throw new Error(`Invalid fiber method call "${method}"`)
    }

    return handler(...args)
  }
}
