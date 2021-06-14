import {
  Fiber,
  FiberClient,
  FiberClientHandler,
  FiberMapping,
  InferFiberProducerArgs,
  InferFiberMethods,
  InferFiberProducerResult,
} from "./types"

export class SimpleFiberClient<TFiber extends Fiber<FiberMapping>>
  implements FiberClient<TFiber> {
  handler: FiberClientHandler<TFiber>

  constructor(handler: FiberClientHandler<TFiber>) {
    this.handler = handler
  }

  async call<
    TMethod extends InferFiberMethods<TFiber>,
    TArgs extends InferFiberProducerArgs<TFiber, TMethod>,
    THandlerResult extends InferFiberProducerResult<TFiber, TMethod>
  >(method: TMethod, ...args: TArgs): Promise<THandlerResult> {
    return this.handler(method, ...args)
  }
}
