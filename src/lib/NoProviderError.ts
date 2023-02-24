export default class NoProviderError extends Error {
  name = "NoProviderError";
  constructor(forContext: string, errorOptions?: ErrorOptions) {
    super(`No provider for ${forContext}`, errorOptions);
  }

  static unless<T>(forContext:string, nullable?:T, ) {
    if (nullable == undefined || nullable == null) {
        throw new this(forContext)
    }

    return nullable;
  }
}