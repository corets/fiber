export type FiberMapping<
  TMethod extends keyof any = string,
  TProducer extends FiberProducer<any> = any
> = Record<TMethod, TProducer>

export type FiberProducer<TArgs extends any[], TResult = any> = (
  ...args: TArgs
) => Promise<TResult>

export type InferFiberMapping<
  TFiber extends Fiber<FiberMapping>
> = TFiber extends Fiber<infer TMapping> ? TMapping : never

export type InferFiberMethods<
  TFiber extends Fiber<FiberMapping>
> = keyof InferFiberMapping<TFiber>

export type InferFiberProducer<
  TFiber extends Fiber<FiberMapping>,
  TMethod extends InferFiberMethods<TFiber>
> = TFiber extends Fiber<infer TMapping>
  ? TMethod extends keyof TMapping
    ? TMapping[TMethod]
    : never
  : never

export type InferFiberProducerArgs<
  TFiber extends Fiber<FiberMapping>,
  TMethod extends InferFiberMethods<TFiber>
> = Parameters<InferFiberProducer<TFiber, TMethod>>

export type InferFiberProducerResult<
  TFiber extends Fiber<FiberMapping>,
  TMethod extends InferFiberMethods<TFiber>
> = ReturnType<InferFiberProducer<TFiber, TMethod>>

export interface Fiber<TMapping extends FiberMapping<never>> {
  call<
    TMethod extends InferFiberMethods<Fiber<TMapping>>,
    TArgs extends InferFiberProducerArgs<Fiber<TMapping>, TMethod>,
    THandlerResult extends InferFiberProducerResult<Fiber<TMapping>, TMethod>
  >(
    method: TMethod,
    ...args: TArgs
  ): Promise<THandlerResult>
}

export type FiberFactory = <TMapping extends FiberMapping<never>>(
  mapping?: TMapping
) => Fiber<TMapping>

export type FiberClientHandler<TFiber extends Fiber<FiberMapping>> = <
  TMethod extends InferFiberMethods<TFiber>,
  TArgs extends InferFiberProducerArgs<TFiber, TMethod>
>(
  method: TMethod,
  ...args: TArgs
) => Promise<any>

export interface FiberClient<TFiber extends Fiber<FiberMapping>> {
  call<
    TMethod extends InferFiberMethods<TFiber>,
    TArgs extends InferFiberProducerArgs<TFiber, TMethod>,
    THandlerResult extends InferFiberProducerResult<TFiber, TMethod>
  >(
    method: TMethod,
    ...args: TArgs
  ): Promise<THandlerResult>
}

export type FiberClientAccessor<
  TFiber extends Fiber<FiberMapping>
> = FiberClient<TFiber> &
  {
    [TMethod in InferFiberMethods<TFiber>]: InferFiberProducer<TFiber, TMethod>
  }

export type FiberClientFactory = <TFiber extends Fiber<FiberMapping>>(
  handler: FiberClientHandler<TFiber>
) => FiberClientAccessor<TFiber>
