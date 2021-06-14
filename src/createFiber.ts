import { SimpleFiber } from "./SimpleFiber"
import { FiberFactory } from "./types"

export const createFiber: FiberFactory = (mapping?) => new SimpleFiber(mapping)
