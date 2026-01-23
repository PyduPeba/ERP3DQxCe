
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Pedido
 * 
 */
export type Pedido = $Result.DefaultSelection<Prisma.$PedidoPayload>
/**
 * Model PedidoLog
 * 
 */
export type PedidoLog = $Result.DefaultSelection<Prisma.$PedidoLogPayload>
/**
 * Model Chamado
 * 
 */
export type Chamado = $Result.DefaultSelection<Prisma.$ChamadoPayload>
/**
 * Model OrdemServico
 * 
 */
export type OrdemServico = $Result.DefaultSelection<Prisma.$OrdemServicoPayload>
/**
 * Model ItemOS
 * 
 */
export type ItemOS = $Result.DefaultSelection<Prisma.$ItemOSPayload>
/**
 * Model ItemEstoque
 * 
 */
export type ItemEstoque = $Result.DefaultSelection<Prisma.$ItemEstoquePayload>
/**
 * Model Locacao
 * 
 */
export type Locacao = $Result.DefaultSelection<Prisma.$LocacaoPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Pedidos
 * const pedidos = await prisma.pedido.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Pedidos
   * const pedidos = await prisma.pedido.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.pedido`: Exposes CRUD operations for the **Pedido** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pedidos
    * const pedidos = await prisma.pedido.findMany()
    * ```
    */
  get pedido(): Prisma.PedidoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pedidoLog`: Exposes CRUD operations for the **PedidoLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PedidoLogs
    * const pedidoLogs = await prisma.pedidoLog.findMany()
    * ```
    */
  get pedidoLog(): Prisma.PedidoLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chamado`: Exposes CRUD operations for the **Chamado** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chamados
    * const chamados = await prisma.chamado.findMany()
    * ```
    */
  get chamado(): Prisma.ChamadoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ordemServico`: Exposes CRUD operations for the **OrdemServico** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrdemServicos
    * const ordemServicos = await prisma.ordemServico.findMany()
    * ```
    */
  get ordemServico(): Prisma.OrdemServicoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itemOS`: Exposes CRUD operations for the **ItemOS** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItemOS
    * const itemOS = await prisma.itemOS.findMany()
    * ```
    */
  get itemOS(): Prisma.ItemOSDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itemEstoque`: Exposes CRUD operations for the **ItemEstoque** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItemEstoques
    * const itemEstoques = await prisma.itemEstoque.findMany()
    * ```
    */
  get itemEstoque(): Prisma.ItemEstoqueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.locacao`: Exposes CRUD operations for the **Locacao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locacaos
    * const locacaos = await prisma.locacao.findMany()
    * ```
    */
  get locacao(): Prisma.LocacaoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Pedido: 'Pedido',
    PedidoLog: 'PedidoLog',
    Chamado: 'Chamado',
    OrdemServico: 'OrdemServico',
    ItemOS: 'ItemOS',
    ItemEstoque: 'ItemEstoque',
    Locacao: 'Locacao'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "pedido" | "pedidoLog" | "chamado" | "ordemServico" | "itemOS" | "itemEstoque" | "locacao"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Pedido: {
        payload: Prisma.$PedidoPayload<ExtArgs>
        fields: Prisma.PedidoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PedidoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PedidoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          findFirst: {
            args: Prisma.PedidoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PedidoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          findMany: {
            args: Prisma.PedidoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>[]
          }
          create: {
            args: Prisma.PedidoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          createMany: {
            args: Prisma.PedidoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PedidoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>[]
          }
          delete: {
            args: Prisma.PedidoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          update: {
            args: Prisma.PedidoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          deleteMany: {
            args: Prisma.PedidoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PedidoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PedidoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>[]
          }
          upsert: {
            args: Prisma.PedidoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          aggregate: {
            args: Prisma.PedidoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePedido>
          }
          groupBy: {
            args: Prisma.PedidoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PedidoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PedidoCountArgs<ExtArgs>
            result: $Utils.Optional<PedidoCountAggregateOutputType> | number
          }
        }
      }
      PedidoLog: {
        payload: Prisma.$PedidoLogPayload<ExtArgs>
        fields: Prisma.PedidoLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PedidoLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PedidoLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoLogPayload>
          }
          findFirst: {
            args: Prisma.PedidoLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PedidoLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoLogPayload>
          }
          findMany: {
            args: Prisma.PedidoLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoLogPayload>[]
          }
          create: {
            args: Prisma.PedidoLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoLogPayload>
          }
          createMany: {
            args: Prisma.PedidoLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PedidoLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoLogPayload>[]
          }
          delete: {
            args: Prisma.PedidoLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoLogPayload>
          }
          update: {
            args: Prisma.PedidoLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoLogPayload>
          }
          deleteMany: {
            args: Prisma.PedidoLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PedidoLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PedidoLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoLogPayload>[]
          }
          upsert: {
            args: Prisma.PedidoLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoLogPayload>
          }
          aggregate: {
            args: Prisma.PedidoLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePedidoLog>
          }
          groupBy: {
            args: Prisma.PedidoLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<PedidoLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.PedidoLogCountArgs<ExtArgs>
            result: $Utils.Optional<PedidoLogCountAggregateOutputType> | number
          }
        }
      }
      Chamado: {
        payload: Prisma.$ChamadoPayload<ExtArgs>
        fields: Prisma.ChamadoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChamadoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChamadoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChamadoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChamadoPayload>
          }
          findFirst: {
            args: Prisma.ChamadoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChamadoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChamadoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChamadoPayload>
          }
          findMany: {
            args: Prisma.ChamadoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChamadoPayload>[]
          }
          create: {
            args: Prisma.ChamadoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChamadoPayload>
          }
          createMany: {
            args: Prisma.ChamadoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChamadoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChamadoPayload>[]
          }
          delete: {
            args: Prisma.ChamadoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChamadoPayload>
          }
          update: {
            args: Prisma.ChamadoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChamadoPayload>
          }
          deleteMany: {
            args: Prisma.ChamadoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChamadoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChamadoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChamadoPayload>[]
          }
          upsert: {
            args: Prisma.ChamadoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChamadoPayload>
          }
          aggregate: {
            args: Prisma.ChamadoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChamado>
          }
          groupBy: {
            args: Prisma.ChamadoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChamadoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChamadoCountArgs<ExtArgs>
            result: $Utils.Optional<ChamadoCountAggregateOutputType> | number
          }
        }
      }
      OrdemServico: {
        payload: Prisma.$OrdemServicoPayload<ExtArgs>
        fields: Prisma.OrdemServicoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrdemServicoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdemServicoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrdemServicoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdemServicoPayload>
          }
          findFirst: {
            args: Prisma.OrdemServicoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdemServicoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrdemServicoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdemServicoPayload>
          }
          findMany: {
            args: Prisma.OrdemServicoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdemServicoPayload>[]
          }
          create: {
            args: Prisma.OrdemServicoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdemServicoPayload>
          }
          createMany: {
            args: Prisma.OrdemServicoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrdemServicoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdemServicoPayload>[]
          }
          delete: {
            args: Prisma.OrdemServicoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdemServicoPayload>
          }
          update: {
            args: Prisma.OrdemServicoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdemServicoPayload>
          }
          deleteMany: {
            args: Prisma.OrdemServicoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrdemServicoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrdemServicoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdemServicoPayload>[]
          }
          upsert: {
            args: Prisma.OrdemServicoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdemServicoPayload>
          }
          aggregate: {
            args: Prisma.OrdemServicoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrdemServico>
          }
          groupBy: {
            args: Prisma.OrdemServicoGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrdemServicoGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrdemServicoCountArgs<ExtArgs>
            result: $Utils.Optional<OrdemServicoCountAggregateOutputType> | number
          }
        }
      }
      ItemOS: {
        payload: Prisma.$ItemOSPayload<ExtArgs>
        fields: Prisma.ItemOSFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemOSFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemOSPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemOSFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemOSPayload>
          }
          findFirst: {
            args: Prisma.ItemOSFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemOSPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemOSFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemOSPayload>
          }
          findMany: {
            args: Prisma.ItemOSFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemOSPayload>[]
          }
          create: {
            args: Prisma.ItemOSCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemOSPayload>
          }
          createMany: {
            args: Prisma.ItemOSCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemOSCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemOSPayload>[]
          }
          delete: {
            args: Prisma.ItemOSDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemOSPayload>
          }
          update: {
            args: Prisma.ItemOSUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemOSPayload>
          }
          deleteMany: {
            args: Prisma.ItemOSDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemOSUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItemOSUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemOSPayload>[]
          }
          upsert: {
            args: Prisma.ItemOSUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemOSPayload>
          }
          aggregate: {
            args: Prisma.ItemOSAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItemOS>
          }
          groupBy: {
            args: Prisma.ItemOSGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemOSGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemOSCountArgs<ExtArgs>
            result: $Utils.Optional<ItemOSCountAggregateOutputType> | number
          }
        }
      }
      ItemEstoque: {
        payload: Prisma.$ItemEstoquePayload<ExtArgs>
        fields: Prisma.ItemEstoqueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemEstoqueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEstoquePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemEstoqueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEstoquePayload>
          }
          findFirst: {
            args: Prisma.ItemEstoqueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEstoquePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemEstoqueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEstoquePayload>
          }
          findMany: {
            args: Prisma.ItemEstoqueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEstoquePayload>[]
          }
          create: {
            args: Prisma.ItemEstoqueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEstoquePayload>
          }
          createMany: {
            args: Prisma.ItemEstoqueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemEstoqueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEstoquePayload>[]
          }
          delete: {
            args: Prisma.ItemEstoqueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEstoquePayload>
          }
          update: {
            args: Prisma.ItemEstoqueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEstoquePayload>
          }
          deleteMany: {
            args: Prisma.ItemEstoqueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemEstoqueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItemEstoqueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEstoquePayload>[]
          }
          upsert: {
            args: Prisma.ItemEstoqueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEstoquePayload>
          }
          aggregate: {
            args: Prisma.ItemEstoqueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItemEstoque>
          }
          groupBy: {
            args: Prisma.ItemEstoqueGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemEstoqueGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemEstoqueCountArgs<ExtArgs>
            result: $Utils.Optional<ItemEstoqueCountAggregateOutputType> | number
          }
        }
      }
      Locacao: {
        payload: Prisma.$LocacaoPayload<ExtArgs>
        fields: Prisma.LocacaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocacaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocacaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocacaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocacaoPayload>
          }
          findFirst: {
            args: Prisma.LocacaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocacaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocacaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocacaoPayload>
          }
          findMany: {
            args: Prisma.LocacaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocacaoPayload>[]
          }
          create: {
            args: Prisma.LocacaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocacaoPayload>
          }
          createMany: {
            args: Prisma.LocacaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocacaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocacaoPayload>[]
          }
          delete: {
            args: Prisma.LocacaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocacaoPayload>
          }
          update: {
            args: Prisma.LocacaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocacaoPayload>
          }
          deleteMany: {
            args: Prisma.LocacaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocacaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocacaoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocacaoPayload>[]
          }
          upsert: {
            args: Prisma.LocacaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocacaoPayload>
          }
          aggregate: {
            args: Prisma.LocacaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocacao>
          }
          groupBy: {
            args: Prisma.LocacaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocacaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocacaoCountArgs<ExtArgs>
            result: $Utils.Optional<LocacaoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    pedido?: PedidoOmit
    pedidoLog?: PedidoLogOmit
    chamado?: ChamadoOmit
    ordemServico?: OrdemServicoOmit
    itemOS?: ItemOSOmit
    itemEstoque?: ItemEstoqueOmit
    locacao?: LocacaoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PedidoCountOutputType
   */

  export type PedidoCountOutputType = {
    logs: number
  }

  export type PedidoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | PedidoCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * PedidoCountOutputType without action
   */
  export type PedidoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoCountOutputType
     */
    select?: PedidoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PedidoCountOutputType without action
   */
  export type PedidoCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoLogWhereInput
  }


  /**
   * Count Type ChamadoCountOutputType
   */

  export type ChamadoCountOutputType = {
    ordensServico: number
  }

  export type ChamadoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ordensServico?: boolean | ChamadoCountOutputTypeCountOrdensServicoArgs
  }

  // Custom InputTypes
  /**
   * ChamadoCountOutputType without action
   */
  export type ChamadoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChamadoCountOutputType
     */
    select?: ChamadoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChamadoCountOutputType without action
   */
  export type ChamadoCountOutputTypeCountOrdensServicoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrdemServicoWhereInput
  }


  /**
   * Count Type OrdemServicoCountOutputType
   */

  export type OrdemServicoCountOutputType = {
    itensUsados: number
  }

  export type OrdemServicoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itensUsados?: boolean | OrdemServicoCountOutputTypeCountItensUsadosArgs
  }

  // Custom InputTypes
  /**
   * OrdemServicoCountOutputType without action
   */
  export type OrdemServicoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrdemServicoCountOutputType
     */
    select?: OrdemServicoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrdemServicoCountOutputType without action
   */
  export type OrdemServicoCountOutputTypeCountItensUsadosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemOSWhereInput
  }


  /**
   * Count Type ItemEstoqueCountOutputType
   */

  export type ItemEstoqueCountOutputType = {
    itensOS: number
  }

  export type ItemEstoqueCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itensOS?: boolean | ItemEstoqueCountOutputTypeCountItensOSArgs
  }

  // Custom InputTypes
  /**
   * ItemEstoqueCountOutputType without action
   */
  export type ItemEstoqueCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEstoqueCountOutputType
     */
    select?: ItemEstoqueCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ItemEstoqueCountOutputType without action
   */
  export type ItemEstoqueCountOutputTypeCountItensOSArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemOSWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Pedido
   */

  export type AggregatePedido = {
    _count: PedidoCountAggregateOutputType | null
    _avg: PedidoAvgAggregateOutputType | null
    _sum: PedidoSumAggregateOutputType | null
    _min: PedidoMinAggregateOutputType | null
    _max: PedidoMaxAggregateOutputType | null
  }

  export type PedidoAvgAggregateOutputType = {
    id: number | null
  }

  export type PedidoSumAggregateOutputType = {
    id: number | null
  }

  export type PedidoMinAggregateOutputType = {
    id: number | null
    cliente: string | null
    descricao: string | null
    status: string | null
    prioridade: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PedidoMaxAggregateOutputType = {
    id: number | null
    cliente: string | null
    descricao: string | null
    status: string | null
    prioridade: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PedidoCountAggregateOutputType = {
    id: number
    cliente: number
    descricao: number
    status: number
    prioridade: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PedidoAvgAggregateInputType = {
    id?: true
  }

  export type PedidoSumAggregateInputType = {
    id?: true
  }

  export type PedidoMinAggregateInputType = {
    id?: true
    cliente?: true
    descricao?: true
    status?: true
    prioridade?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PedidoMaxAggregateInputType = {
    id?: true
    cliente?: true
    descricao?: true
    status?: true
    prioridade?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PedidoCountAggregateInputType = {
    id?: true
    cliente?: true
    descricao?: true
    status?: true
    prioridade?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PedidoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pedido to aggregate.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pedidos
    **/
    _count?: true | PedidoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PedidoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PedidoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PedidoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PedidoMaxAggregateInputType
  }

  export type GetPedidoAggregateType<T extends PedidoAggregateArgs> = {
        [P in keyof T & keyof AggregatePedido]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedido[P]>
      : GetScalarType<T[P], AggregatePedido[P]>
  }




  export type PedidoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoWhereInput
    orderBy?: PedidoOrderByWithAggregationInput | PedidoOrderByWithAggregationInput[]
    by: PedidoScalarFieldEnum[] | PedidoScalarFieldEnum
    having?: PedidoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PedidoCountAggregateInputType | true
    _avg?: PedidoAvgAggregateInputType
    _sum?: PedidoSumAggregateInputType
    _min?: PedidoMinAggregateInputType
    _max?: PedidoMaxAggregateInputType
  }

  export type PedidoGroupByOutputType = {
    id: number
    cliente: string
    descricao: string
    status: string
    prioridade: string
    createdAt: Date
    updatedAt: Date
    _count: PedidoCountAggregateOutputType | null
    _avg: PedidoAvgAggregateOutputType | null
    _sum: PedidoSumAggregateOutputType | null
    _min: PedidoMinAggregateOutputType | null
    _max: PedidoMaxAggregateOutputType | null
  }

  type GetPedidoGroupByPayload<T extends PedidoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PedidoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PedidoGroupByOutputType[P]>
            : GetScalarType<T[P], PedidoGroupByOutputType[P]>
        }
      >
    >


  export type PedidoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cliente?: boolean
    descricao?: boolean
    status?: boolean
    prioridade?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    logs?: boolean | Pedido$logsArgs<ExtArgs>
    _count?: boolean | PedidoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedido"]>

  export type PedidoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cliente?: boolean
    descricao?: boolean
    status?: boolean
    prioridade?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pedido"]>

  export type PedidoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cliente?: boolean
    descricao?: boolean
    status?: boolean
    prioridade?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pedido"]>

  export type PedidoSelectScalar = {
    id?: boolean
    cliente?: boolean
    descricao?: boolean
    status?: boolean
    prioridade?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PedidoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cliente" | "descricao" | "status" | "prioridade" | "createdAt" | "updatedAt", ExtArgs["result"]["pedido"]>
  export type PedidoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | Pedido$logsArgs<ExtArgs>
    _count?: boolean | PedidoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PedidoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PedidoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PedidoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pedido"
    objects: {
      logs: Prisma.$PedidoLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cliente: string
      descricao: string
      status: string
      prioridade: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pedido"]>
    composites: {}
  }

  type PedidoGetPayload<S extends boolean | null | undefined | PedidoDefaultArgs> = $Result.GetResult<Prisma.$PedidoPayload, S>

  type PedidoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PedidoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PedidoCountAggregateInputType | true
    }

  export interface PedidoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pedido'], meta: { name: 'Pedido' } }
    /**
     * Find zero or one Pedido that matches the filter.
     * @param {PedidoFindUniqueArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PedidoFindUniqueArgs>(args: SelectSubset<T, PedidoFindUniqueArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pedido that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PedidoFindUniqueOrThrowArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PedidoFindUniqueOrThrowArgs>(args: SelectSubset<T, PedidoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedido that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindFirstArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PedidoFindFirstArgs>(args?: SelectSubset<T, PedidoFindFirstArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedido that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindFirstOrThrowArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PedidoFindFirstOrThrowArgs>(args?: SelectSubset<T, PedidoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pedidos
     * const pedidos = await prisma.pedido.findMany()
     * 
     * // Get first 10 Pedidos
     * const pedidos = await prisma.pedido.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pedidoWithIdOnly = await prisma.pedido.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PedidoFindManyArgs>(args?: SelectSubset<T, PedidoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pedido.
     * @param {PedidoCreateArgs} args - Arguments to create a Pedido.
     * @example
     * // Create one Pedido
     * const Pedido = await prisma.pedido.create({
     *   data: {
     *     // ... data to create a Pedido
     *   }
     * })
     * 
     */
    create<T extends PedidoCreateArgs>(args: SelectSubset<T, PedidoCreateArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pedidos.
     * @param {PedidoCreateManyArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedido = await prisma.pedido.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PedidoCreateManyArgs>(args?: SelectSubset<T, PedidoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pedidos and returns the data saved in the database.
     * @param {PedidoCreateManyAndReturnArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedido = await prisma.pedido.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pedidos and only return the `id`
     * const pedidoWithIdOnly = await prisma.pedido.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PedidoCreateManyAndReturnArgs>(args?: SelectSubset<T, PedidoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pedido.
     * @param {PedidoDeleteArgs} args - Arguments to delete one Pedido.
     * @example
     * // Delete one Pedido
     * const Pedido = await prisma.pedido.delete({
     *   where: {
     *     // ... filter to delete one Pedido
     *   }
     * })
     * 
     */
    delete<T extends PedidoDeleteArgs>(args: SelectSubset<T, PedidoDeleteArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pedido.
     * @param {PedidoUpdateArgs} args - Arguments to update one Pedido.
     * @example
     * // Update one Pedido
     * const pedido = await prisma.pedido.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PedidoUpdateArgs>(args: SelectSubset<T, PedidoUpdateArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pedidos.
     * @param {PedidoDeleteManyArgs} args - Arguments to filter Pedidos to delete.
     * @example
     * // Delete a few Pedidos
     * const { count } = await prisma.pedido.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PedidoDeleteManyArgs>(args?: SelectSubset<T, PedidoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pedidos
     * const pedido = await prisma.pedido.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PedidoUpdateManyArgs>(args: SelectSubset<T, PedidoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedidos and returns the data updated in the database.
     * @param {PedidoUpdateManyAndReturnArgs} args - Arguments to update many Pedidos.
     * @example
     * // Update many Pedidos
     * const pedido = await prisma.pedido.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pedidos and only return the `id`
     * const pedidoWithIdOnly = await prisma.pedido.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PedidoUpdateManyAndReturnArgs>(args: SelectSubset<T, PedidoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pedido.
     * @param {PedidoUpsertArgs} args - Arguments to update or create a Pedido.
     * @example
     * // Update or create a Pedido
     * const pedido = await prisma.pedido.upsert({
     *   create: {
     *     // ... data to create a Pedido
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pedido we want to update
     *   }
     * })
     */
    upsert<T extends PedidoUpsertArgs>(args: SelectSubset<T, PedidoUpsertArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoCountArgs} args - Arguments to filter Pedidos to count.
     * @example
     * // Count the number of Pedidos
     * const count = await prisma.pedido.count({
     *   where: {
     *     // ... the filter for the Pedidos we want to count
     *   }
     * })
    **/
    count<T extends PedidoCountArgs>(
      args?: Subset<T, PedidoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PedidoAggregateArgs>(args: Subset<T, PedidoAggregateArgs>): Prisma.PrismaPromise<GetPedidoAggregateType<T>>

    /**
     * Group by Pedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PedidoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PedidoGroupByArgs['orderBy'] }
        : { orderBy?: PedidoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PedidoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPedidoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pedido model
   */
  readonly fields: PedidoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pedido.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PedidoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    logs<T extends Pedido$logsArgs<ExtArgs> = {}>(args?: Subset<T, Pedido$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pedido model
   */
  interface PedidoFieldRefs {
    readonly id: FieldRef<"Pedido", 'Int'>
    readonly cliente: FieldRef<"Pedido", 'String'>
    readonly descricao: FieldRef<"Pedido", 'String'>
    readonly status: FieldRef<"Pedido", 'String'>
    readonly prioridade: FieldRef<"Pedido", 'String'>
    readonly createdAt: FieldRef<"Pedido", 'DateTime'>
    readonly updatedAt: FieldRef<"Pedido", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pedido findUnique
   */
  export type PedidoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido findUniqueOrThrow
   */
  export type PedidoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido findFirst
   */
  export type PedidoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pedidos.
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pedidos.
     */
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Pedido findFirstOrThrow
   */
  export type PedidoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pedidos.
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pedidos.
     */
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Pedido findMany
   */
  export type PedidoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedidos to fetch.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pedidos.
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Pedido create
   */
  export type PedidoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * The data needed to create a Pedido.
     */
    data: XOR<PedidoCreateInput, PedidoUncheckedCreateInput>
  }

  /**
   * Pedido createMany
   */
  export type PedidoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pedidos.
     */
    data: PedidoCreateManyInput | PedidoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pedido createManyAndReturn
   */
  export type PedidoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * The data used to create many Pedidos.
     */
    data: PedidoCreateManyInput | PedidoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pedido update
   */
  export type PedidoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * The data needed to update a Pedido.
     */
    data: XOR<PedidoUpdateInput, PedidoUncheckedUpdateInput>
    /**
     * Choose, which Pedido to update.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido updateMany
   */
  export type PedidoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pedidos.
     */
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyInput>
    /**
     * Filter which Pedidos to update
     */
    where?: PedidoWhereInput
    /**
     * Limit how many Pedidos to update.
     */
    limit?: number
  }

  /**
   * Pedido updateManyAndReturn
   */
  export type PedidoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * The data used to update Pedidos.
     */
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyInput>
    /**
     * Filter which Pedidos to update
     */
    where?: PedidoWhereInput
    /**
     * Limit how many Pedidos to update.
     */
    limit?: number
  }

  /**
   * Pedido upsert
   */
  export type PedidoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * The filter to search for the Pedido to update in case it exists.
     */
    where: PedidoWhereUniqueInput
    /**
     * In case the Pedido found by the `where` argument doesn't exist, create a new Pedido with this data.
     */
    create: XOR<PedidoCreateInput, PedidoUncheckedCreateInput>
    /**
     * In case the Pedido was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PedidoUpdateInput, PedidoUncheckedUpdateInput>
  }

  /**
   * Pedido delete
   */
  export type PedidoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter which Pedido to delete.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido deleteMany
   */
  export type PedidoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pedidos to delete
     */
    where?: PedidoWhereInput
    /**
     * Limit how many Pedidos to delete.
     */
    limit?: number
  }

  /**
   * Pedido.logs
   */
  export type Pedido$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoLog
     */
    select?: PedidoLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoLog
     */
    omit?: PedidoLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoLogInclude<ExtArgs> | null
    where?: PedidoLogWhereInput
    orderBy?: PedidoLogOrderByWithRelationInput | PedidoLogOrderByWithRelationInput[]
    cursor?: PedidoLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidoLogScalarFieldEnum | PedidoLogScalarFieldEnum[]
  }

  /**
   * Pedido without action
   */
  export type PedidoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
  }


  /**
   * Model PedidoLog
   */

  export type AggregatePedidoLog = {
    _count: PedidoLogCountAggregateOutputType | null
    _avg: PedidoLogAvgAggregateOutputType | null
    _sum: PedidoLogSumAggregateOutputType | null
    _min: PedidoLogMinAggregateOutputType | null
    _max: PedidoLogMaxAggregateOutputType | null
  }

  export type PedidoLogAvgAggregateOutputType = {
    id: number | null
    pedidoId: number | null
  }

  export type PedidoLogSumAggregateOutputType = {
    id: number | null
    pedidoId: number | null
  }

  export type PedidoLogMinAggregateOutputType = {
    id: number | null
    pedidoId: number | null
    acao: string | null
    detalhes: string | null
    usuario: string | null
    createdAt: Date | null
  }

  export type PedidoLogMaxAggregateOutputType = {
    id: number | null
    pedidoId: number | null
    acao: string | null
    detalhes: string | null
    usuario: string | null
    createdAt: Date | null
  }

  export type PedidoLogCountAggregateOutputType = {
    id: number
    pedidoId: number
    acao: number
    detalhes: number
    usuario: number
    createdAt: number
    _all: number
  }


  export type PedidoLogAvgAggregateInputType = {
    id?: true
    pedidoId?: true
  }

  export type PedidoLogSumAggregateInputType = {
    id?: true
    pedidoId?: true
  }

  export type PedidoLogMinAggregateInputType = {
    id?: true
    pedidoId?: true
    acao?: true
    detalhes?: true
    usuario?: true
    createdAt?: true
  }

  export type PedidoLogMaxAggregateInputType = {
    id?: true
    pedidoId?: true
    acao?: true
    detalhes?: true
    usuario?: true
    createdAt?: true
  }

  export type PedidoLogCountAggregateInputType = {
    id?: true
    pedidoId?: true
    acao?: true
    detalhes?: true
    usuario?: true
    createdAt?: true
    _all?: true
  }

  export type PedidoLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PedidoLog to aggregate.
     */
    where?: PedidoLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoLogs to fetch.
     */
    orderBy?: PedidoLogOrderByWithRelationInput | PedidoLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PedidoLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PedidoLogs
    **/
    _count?: true | PedidoLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PedidoLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PedidoLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PedidoLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PedidoLogMaxAggregateInputType
  }

  export type GetPedidoLogAggregateType<T extends PedidoLogAggregateArgs> = {
        [P in keyof T & keyof AggregatePedidoLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedidoLog[P]>
      : GetScalarType<T[P], AggregatePedidoLog[P]>
  }




  export type PedidoLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoLogWhereInput
    orderBy?: PedidoLogOrderByWithAggregationInput | PedidoLogOrderByWithAggregationInput[]
    by: PedidoLogScalarFieldEnum[] | PedidoLogScalarFieldEnum
    having?: PedidoLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PedidoLogCountAggregateInputType | true
    _avg?: PedidoLogAvgAggregateInputType
    _sum?: PedidoLogSumAggregateInputType
    _min?: PedidoLogMinAggregateInputType
    _max?: PedidoLogMaxAggregateInputType
  }

  export type PedidoLogGroupByOutputType = {
    id: number
    pedidoId: number
    acao: string
    detalhes: string | null
    usuario: string
    createdAt: Date
    _count: PedidoLogCountAggregateOutputType | null
    _avg: PedidoLogAvgAggregateOutputType | null
    _sum: PedidoLogSumAggregateOutputType | null
    _min: PedidoLogMinAggregateOutputType | null
    _max: PedidoLogMaxAggregateOutputType | null
  }

  type GetPedidoLogGroupByPayload<T extends PedidoLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidoLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PedidoLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PedidoLogGroupByOutputType[P]>
            : GetScalarType<T[P], PedidoLogGroupByOutputType[P]>
        }
      >
    >


  export type PedidoLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pedidoId?: boolean
    acao?: boolean
    detalhes?: boolean
    usuario?: boolean
    createdAt?: boolean
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidoLog"]>

  export type PedidoLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pedidoId?: boolean
    acao?: boolean
    detalhes?: boolean
    usuario?: boolean
    createdAt?: boolean
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidoLog"]>

  export type PedidoLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pedidoId?: boolean
    acao?: boolean
    detalhes?: boolean
    usuario?: boolean
    createdAt?: boolean
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidoLog"]>

  export type PedidoLogSelectScalar = {
    id?: boolean
    pedidoId?: boolean
    acao?: boolean
    detalhes?: boolean
    usuario?: boolean
    createdAt?: boolean
  }

  export type PedidoLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pedidoId" | "acao" | "detalhes" | "usuario" | "createdAt", ExtArgs["result"]["pedidoLog"]>
  export type PedidoLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }
  export type PedidoLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }
  export type PedidoLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }

  export type $PedidoLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PedidoLog"
    objects: {
      pedido: Prisma.$PedidoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      pedidoId: number
      acao: string
      detalhes: string | null
      usuario: string
      createdAt: Date
    }, ExtArgs["result"]["pedidoLog"]>
    composites: {}
  }

  type PedidoLogGetPayload<S extends boolean | null | undefined | PedidoLogDefaultArgs> = $Result.GetResult<Prisma.$PedidoLogPayload, S>

  type PedidoLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PedidoLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PedidoLogCountAggregateInputType | true
    }

  export interface PedidoLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PedidoLog'], meta: { name: 'PedidoLog' } }
    /**
     * Find zero or one PedidoLog that matches the filter.
     * @param {PedidoLogFindUniqueArgs} args - Arguments to find a PedidoLog
     * @example
     * // Get one PedidoLog
     * const pedidoLog = await prisma.pedidoLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PedidoLogFindUniqueArgs>(args: SelectSubset<T, PedidoLogFindUniqueArgs<ExtArgs>>): Prisma__PedidoLogClient<$Result.GetResult<Prisma.$PedidoLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PedidoLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PedidoLogFindUniqueOrThrowArgs} args - Arguments to find a PedidoLog
     * @example
     * // Get one PedidoLog
     * const pedidoLog = await prisma.pedidoLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PedidoLogFindUniqueOrThrowArgs>(args: SelectSubset<T, PedidoLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PedidoLogClient<$Result.GetResult<Prisma.$PedidoLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PedidoLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoLogFindFirstArgs} args - Arguments to find a PedidoLog
     * @example
     * // Get one PedidoLog
     * const pedidoLog = await prisma.pedidoLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PedidoLogFindFirstArgs>(args?: SelectSubset<T, PedidoLogFindFirstArgs<ExtArgs>>): Prisma__PedidoLogClient<$Result.GetResult<Prisma.$PedidoLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PedidoLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoLogFindFirstOrThrowArgs} args - Arguments to find a PedidoLog
     * @example
     * // Get one PedidoLog
     * const pedidoLog = await prisma.pedidoLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PedidoLogFindFirstOrThrowArgs>(args?: SelectSubset<T, PedidoLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__PedidoLogClient<$Result.GetResult<Prisma.$PedidoLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PedidoLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PedidoLogs
     * const pedidoLogs = await prisma.pedidoLog.findMany()
     * 
     * // Get first 10 PedidoLogs
     * const pedidoLogs = await prisma.pedidoLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pedidoLogWithIdOnly = await prisma.pedidoLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PedidoLogFindManyArgs>(args?: SelectSubset<T, PedidoLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PedidoLog.
     * @param {PedidoLogCreateArgs} args - Arguments to create a PedidoLog.
     * @example
     * // Create one PedidoLog
     * const PedidoLog = await prisma.pedidoLog.create({
     *   data: {
     *     // ... data to create a PedidoLog
     *   }
     * })
     * 
     */
    create<T extends PedidoLogCreateArgs>(args: SelectSubset<T, PedidoLogCreateArgs<ExtArgs>>): Prisma__PedidoLogClient<$Result.GetResult<Prisma.$PedidoLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PedidoLogs.
     * @param {PedidoLogCreateManyArgs} args - Arguments to create many PedidoLogs.
     * @example
     * // Create many PedidoLogs
     * const pedidoLog = await prisma.pedidoLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PedidoLogCreateManyArgs>(args?: SelectSubset<T, PedidoLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PedidoLogs and returns the data saved in the database.
     * @param {PedidoLogCreateManyAndReturnArgs} args - Arguments to create many PedidoLogs.
     * @example
     * // Create many PedidoLogs
     * const pedidoLog = await prisma.pedidoLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PedidoLogs and only return the `id`
     * const pedidoLogWithIdOnly = await prisma.pedidoLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PedidoLogCreateManyAndReturnArgs>(args?: SelectSubset<T, PedidoLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PedidoLog.
     * @param {PedidoLogDeleteArgs} args - Arguments to delete one PedidoLog.
     * @example
     * // Delete one PedidoLog
     * const PedidoLog = await prisma.pedidoLog.delete({
     *   where: {
     *     // ... filter to delete one PedidoLog
     *   }
     * })
     * 
     */
    delete<T extends PedidoLogDeleteArgs>(args: SelectSubset<T, PedidoLogDeleteArgs<ExtArgs>>): Prisma__PedidoLogClient<$Result.GetResult<Prisma.$PedidoLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PedidoLog.
     * @param {PedidoLogUpdateArgs} args - Arguments to update one PedidoLog.
     * @example
     * // Update one PedidoLog
     * const pedidoLog = await prisma.pedidoLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PedidoLogUpdateArgs>(args: SelectSubset<T, PedidoLogUpdateArgs<ExtArgs>>): Prisma__PedidoLogClient<$Result.GetResult<Prisma.$PedidoLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PedidoLogs.
     * @param {PedidoLogDeleteManyArgs} args - Arguments to filter PedidoLogs to delete.
     * @example
     * // Delete a few PedidoLogs
     * const { count } = await prisma.pedidoLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PedidoLogDeleteManyArgs>(args?: SelectSubset<T, PedidoLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PedidoLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PedidoLogs
     * const pedidoLog = await prisma.pedidoLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PedidoLogUpdateManyArgs>(args: SelectSubset<T, PedidoLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PedidoLogs and returns the data updated in the database.
     * @param {PedidoLogUpdateManyAndReturnArgs} args - Arguments to update many PedidoLogs.
     * @example
     * // Update many PedidoLogs
     * const pedidoLog = await prisma.pedidoLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PedidoLogs and only return the `id`
     * const pedidoLogWithIdOnly = await prisma.pedidoLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PedidoLogUpdateManyAndReturnArgs>(args: SelectSubset<T, PedidoLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PedidoLog.
     * @param {PedidoLogUpsertArgs} args - Arguments to update or create a PedidoLog.
     * @example
     * // Update or create a PedidoLog
     * const pedidoLog = await prisma.pedidoLog.upsert({
     *   create: {
     *     // ... data to create a PedidoLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PedidoLog we want to update
     *   }
     * })
     */
    upsert<T extends PedidoLogUpsertArgs>(args: SelectSubset<T, PedidoLogUpsertArgs<ExtArgs>>): Prisma__PedidoLogClient<$Result.GetResult<Prisma.$PedidoLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PedidoLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoLogCountArgs} args - Arguments to filter PedidoLogs to count.
     * @example
     * // Count the number of PedidoLogs
     * const count = await prisma.pedidoLog.count({
     *   where: {
     *     // ... the filter for the PedidoLogs we want to count
     *   }
     * })
    **/
    count<T extends PedidoLogCountArgs>(
      args?: Subset<T, PedidoLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidoLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PedidoLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PedidoLogAggregateArgs>(args: Subset<T, PedidoLogAggregateArgs>): Prisma.PrismaPromise<GetPedidoLogAggregateType<T>>

    /**
     * Group by PedidoLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PedidoLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PedidoLogGroupByArgs['orderBy'] }
        : { orderBy?: PedidoLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PedidoLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPedidoLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PedidoLog model
   */
  readonly fields: PedidoLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PedidoLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PedidoLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pedido<T extends PedidoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PedidoDefaultArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PedidoLog model
   */
  interface PedidoLogFieldRefs {
    readonly id: FieldRef<"PedidoLog", 'Int'>
    readonly pedidoId: FieldRef<"PedidoLog", 'Int'>
    readonly acao: FieldRef<"PedidoLog", 'String'>
    readonly detalhes: FieldRef<"PedidoLog", 'String'>
    readonly usuario: FieldRef<"PedidoLog", 'String'>
    readonly createdAt: FieldRef<"PedidoLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PedidoLog findUnique
   */
  export type PedidoLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoLog
     */
    select?: PedidoLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoLog
     */
    omit?: PedidoLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoLogInclude<ExtArgs> | null
    /**
     * Filter, which PedidoLog to fetch.
     */
    where: PedidoLogWhereUniqueInput
  }

  /**
   * PedidoLog findUniqueOrThrow
   */
  export type PedidoLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoLog
     */
    select?: PedidoLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoLog
     */
    omit?: PedidoLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoLogInclude<ExtArgs> | null
    /**
     * Filter, which PedidoLog to fetch.
     */
    where: PedidoLogWhereUniqueInput
  }

  /**
   * PedidoLog findFirst
   */
  export type PedidoLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoLog
     */
    select?: PedidoLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoLog
     */
    omit?: PedidoLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoLogInclude<ExtArgs> | null
    /**
     * Filter, which PedidoLog to fetch.
     */
    where?: PedidoLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoLogs to fetch.
     */
    orderBy?: PedidoLogOrderByWithRelationInput | PedidoLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PedidoLogs.
     */
    cursor?: PedidoLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PedidoLogs.
     */
    distinct?: PedidoLogScalarFieldEnum | PedidoLogScalarFieldEnum[]
  }

  /**
   * PedidoLog findFirstOrThrow
   */
  export type PedidoLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoLog
     */
    select?: PedidoLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoLog
     */
    omit?: PedidoLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoLogInclude<ExtArgs> | null
    /**
     * Filter, which PedidoLog to fetch.
     */
    where?: PedidoLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoLogs to fetch.
     */
    orderBy?: PedidoLogOrderByWithRelationInput | PedidoLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PedidoLogs.
     */
    cursor?: PedidoLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PedidoLogs.
     */
    distinct?: PedidoLogScalarFieldEnum | PedidoLogScalarFieldEnum[]
  }

  /**
   * PedidoLog findMany
   */
  export type PedidoLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoLog
     */
    select?: PedidoLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoLog
     */
    omit?: PedidoLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoLogInclude<ExtArgs> | null
    /**
     * Filter, which PedidoLogs to fetch.
     */
    where?: PedidoLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoLogs to fetch.
     */
    orderBy?: PedidoLogOrderByWithRelationInput | PedidoLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PedidoLogs.
     */
    cursor?: PedidoLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoLogs.
     */
    skip?: number
    distinct?: PedidoLogScalarFieldEnum | PedidoLogScalarFieldEnum[]
  }

  /**
   * PedidoLog create
   */
  export type PedidoLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoLog
     */
    select?: PedidoLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoLog
     */
    omit?: PedidoLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoLogInclude<ExtArgs> | null
    /**
     * The data needed to create a PedidoLog.
     */
    data: XOR<PedidoLogCreateInput, PedidoLogUncheckedCreateInput>
  }

  /**
   * PedidoLog createMany
   */
  export type PedidoLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PedidoLogs.
     */
    data: PedidoLogCreateManyInput | PedidoLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PedidoLog createManyAndReturn
   */
  export type PedidoLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoLog
     */
    select?: PedidoLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoLog
     */
    omit?: PedidoLogOmit<ExtArgs> | null
    /**
     * The data used to create many PedidoLogs.
     */
    data: PedidoLogCreateManyInput | PedidoLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PedidoLog update
   */
  export type PedidoLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoLog
     */
    select?: PedidoLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoLog
     */
    omit?: PedidoLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoLogInclude<ExtArgs> | null
    /**
     * The data needed to update a PedidoLog.
     */
    data: XOR<PedidoLogUpdateInput, PedidoLogUncheckedUpdateInput>
    /**
     * Choose, which PedidoLog to update.
     */
    where: PedidoLogWhereUniqueInput
  }

  /**
   * PedidoLog updateMany
   */
  export type PedidoLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PedidoLogs.
     */
    data: XOR<PedidoLogUpdateManyMutationInput, PedidoLogUncheckedUpdateManyInput>
    /**
     * Filter which PedidoLogs to update
     */
    where?: PedidoLogWhereInput
    /**
     * Limit how many PedidoLogs to update.
     */
    limit?: number
  }

  /**
   * PedidoLog updateManyAndReturn
   */
  export type PedidoLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoLog
     */
    select?: PedidoLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoLog
     */
    omit?: PedidoLogOmit<ExtArgs> | null
    /**
     * The data used to update PedidoLogs.
     */
    data: XOR<PedidoLogUpdateManyMutationInput, PedidoLogUncheckedUpdateManyInput>
    /**
     * Filter which PedidoLogs to update
     */
    where?: PedidoLogWhereInput
    /**
     * Limit how many PedidoLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PedidoLog upsert
   */
  export type PedidoLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoLog
     */
    select?: PedidoLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoLog
     */
    omit?: PedidoLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoLogInclude<ExtArgs> | null
    /**
     * The filter to search for the PedidoLog to update in case it exists.
     */
    where: PedidoLogWhereUniqueInput
    /**
     * In case the PedidoLog found by the `where` argument doesn't exist, create a new PedidoLog with this data.
     */
    create: XOR<PedidoLogCreateInput, PedidoLogUncheckedCreateInput>
    /**
     * In case the PedidoLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PedidoLogUpdateInput, PedidoLogUncheckedUpdateInput>
  }

  /**
   * PedidoLog delete
   */
  export type PedidoLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoLog
     */
    select?: PedidoLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoLog
     */
    omit?: PedidoLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoLogInclude<ExtArgs> | null
    /**
     * Filter which PedidoLog to delete.
     */
    where: PedidoLogWhereUniqueInput
  }

  /**
   * PedidoLog deleteMany
   */
  export type PedidoLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PedidoLogs to delete
     */
    where?: PedidoLogWhereInput
    /**
     * Limit how many PedidoLogs to delete.
     */
    limit?: number
  }

  /**
   * PedidoLog without action
   */
  export type PedidoLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoLog
     */
    select?: PedidoLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoLog
     */
    omit?: PedidoLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoLogInclude<ExtArgs> | null
  }


  /**
   * Model Chamado
   */

  export type AggregateChamado = {
    _count: ChamadoCountAggregateOutputType | null
    _avg: ChamadoAvgAggregateOutputType | null
    _sum: ChamadoSumAggregateOutputType | null
    _min: ChamadoMinAggregateOutputType | null
    _max: ChamadoMaxAggregateOutputType | null
  }

  export type ChamadoAvgAggregateOutputType = {
    id: number | null
  }

  export type ChamadoSumAggregateOutputType = {
    id: number | null
  }

  export type ChamadoMinAggregateOutputType = {
    id: number | null
    titulo: string | null
    descricao: string | null
    prioridade: string | null
    status: string | null
    cliente: string | null
    tecnico: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChamadoMaxAggregateOutputType = {
    id: number | null
    titulo: string | null
    descricao: string | null
    prioridade: string | null
    status: string | null
    cliente: string | null
    tecnico: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChamadoCountAggregateOutputType = {
    id: number
    titulo: number
    descricao: number
    prioridade: number
    status: number
    cliente: number
    tecnico: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChamadoAvgAggregateInputType = {
    id?: true
  }

  export type ChamadoSumAggregateInputType = {
    id?: true
  }

  export type ChamadoMinAggregateInputType = {
    id?: true
    titulo?: true
    descricao?: true
    prioridade?: true
    status?: true
    cliente?: true
    tecnico?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChamadoMaxAggregateInputType = {
    id?: true
    titulo?: true
    descricao?: true
    prioridade?: true
    status?: true
    cliente?: true
    tecnico?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChamadoCountAggregateInputType = {
    id?: true
    titulo?: true
    descricao?: true
    prioridade?: true
    status?: true
    cliente?: true
    tecnico?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChamadoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chamado to aggregate.
     */
    where?: ChamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chamados to fetch.
     */
    orderBy?: ChamadoOrderByWithRelationInput | ChamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Chamados
    **/
    _count?: true | ChamadoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChamadoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChamadoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChamadoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChamadoMaxAggregateInputType
  }

  export type GetChamadoAggregateType<T extends ChamadoAggregateArgs> = {
        [P in keyof T & keyof AggregateChamado]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChamado[P]>
      : GetScalarType<T[P], AggregateChamado[P]>
  }




  export type ChamadoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChamadoWhereInput
    orderBy?: ChamadoOrderByWithAggregationInput | ChamadoOrderByWithAggregationInput[]
    by: ChamadoScalarFieldEnum[] | ChamadoScalarFieldEnum
    having?: ChamadoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChamadoCountAggregateInputType | true
    _avg?: ChamadoAvgAggregateInputType
    _sum?: ChamadoSumAggregateInputType
    _min?: ChamadoMinAggregateInputType
    _max?: ChamadoMaxAggregateInputType
  }

  export type ChamadoGroupByOutputType = {
    id: number
    titulo: string
    descricao: string
    prioridade: string
    status: string
    cliente: string | null
    tecnico: string | null
    createdAt: Date
    updatedAt: Date
    _count: ChamadoCountAggregateOutputType | null
    _avg: ChamadoAvgAggregateOutputType | null
    _sum: ChamadoSumAggregateOutputType | null
    _min: ChamadoMinAggregateOutputType | null
    _max: ChamadoMaxAggregateOutputType | null
  }

  type GetChamadoGroupByPayload<T extends ChamadoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChamadoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChamadoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChamadoGroupByOutputType[P]>
            : GetScalarType<T[P], ChamadoGroupByOutputType[P]>
        }
      >
    >


  export type ChamadoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descricao?: boolean
    prioridade?: boolean
    status?: boolean
    cliente?: boolean
    tecnico?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ordensServico?: boolean | Chamado$ordensServicoArgs<ExtArgs>
    _count?: boolean | ChamadoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chamado"]>

  export type ChamadoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descricao?: boolean
    prioridade?: boolean
    status?: boolean
    cliente?: boolean
    tecnico?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chamado"]>

  export type ChamadoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descricao?: boolean
    prioridade?: boolean
    status?: boolean
    cliente?: boolean
    tecnico?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chamado"]>

  export type ChamadoSelectScalar = {
    id?: boolean
    titulo?: boolean
    descricao?: boolean
    prioridade?: boolean
    status?: boolean
    cliente?: boolean
    tecnico?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChamadoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titulo" | "descricao" | "prioridade" | "status" | "cliente" | "tecnico" | "createdAt" | "updatedAt", ExtArgs["result"]["chamado"]>
  export type ChamadoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ordensServico?: boolean | Chamado$ordensServicoArgs<ExtArgs>
    _count?: boolean | ChamadoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChamadoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ChamadoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ChamadoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Chamado"
    objects: {
      ordensServico: Prisma.$OrdemServicoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      titulo: string
      descricao: string
      prioridade: string
      status: string
      cliente: string | null
      tecnico: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["chamado"]>
    composites: {}
  }

  type ChamadoGetPayload<S extends boolean | null | undefined | ChamadoDefaultArgs> = $Result.GetResult<Prisma.$ChamadoPayload, S>

  type ChamadoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChamadoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChamadoCountAggregateInputType | true
    }

  export interface ChamadoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Chamado'], meta: { name: 'Chamado' } }
    /**
     * Find zero or one Chamado that matches the filter.
     * @param {ChamadoFindUniqueArgs} args - Arguments to find a Chamado
     * @example
     * // Get one Chamado
     * const chamado = await prisma.chamado.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChamadoFindUniqueArgs>(args: SelectSubset<T, ChamadoFindUniqueArgs<ExtArgs>>): Prisma__ChamadoClient<$Result.GetResult<Prisma.$ChamadoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chamado that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChamadoFindUniqueOrThrowArgs} args - Arguments to find a Chamado
     * @example
     * // Get one Chamado
     * const chamado = await prisma.chamado.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChamadoFindUniqueOrThrowArgs>(args: SelectSubset<T, ChamadoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChamadoClient<$Result.GetResult<Prisma.$ChamadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chamado that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChamadoFindFirstArgs} args - Arguments to find a Chamado
     * @example
     * // Get one Chamado
     * const chamado = await prisma.chamado.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChamadoFindFirstArgs>(args?: SelectSubset<T, ChamadoFindFirstArgs<ExtArgs>>): Prisma__ChamadoClient<$Result.GetResult<Prisma.$ChamadoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chamado that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChamadoFindFirstOrThrowArgs} args - Arguments to find a Chamado
     * @example
     * // Get one Chamado
     * const chamado = await prisma.chamado.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChamadoFindFirstOrThrowArgs>(args?: SelectSubset<T, ChamadoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChamadoClient<$Result.GetResult<Prisma.$ChamadoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Chamados that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChamadoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chamados
     * const chamados = await prisma.chamado.findMany()
     * 
     * // Get first 10 Chamados
     * const chamados = await prisma.chamado.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chamadoWithIdOnly = await prisma.chamado.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChamadoFindManyArgs>(args?: SelectSubset<T, ChamadoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChamadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chamado.
     * @param {ChamadoCreateArgs} args - Arguments to create a Chamado.
     * @example
     * // Create one Chamado
     * const Chamado = await prisma.chamado.create({
     *   data: {
     *     // ... data to create a Chamado
     *   }
     * })
     * 
     */
    create<T extends ChamadoCreateArgs>(args: SelectSubset<T, ChamadoCreateArgs<ExtArgs>>): Prisma__ChamadoClient<$Result.GetResult<Prisma.$ChamadoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Chamados.
     * @param {ChamadoCreateManyArgs} args - Arguments to create many Chamados.
     * @example
     * // Create many Chamados
     * const chamado = await prisma.chamado.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChamadoCreateManyArgs>(args?: SelectSubset<T, ChamadoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Chamados and returns the data saved in the database.
     * @param {ChamadoCreateManyAndReturnArgs} args - Arguments to create many Chamados.
     * @example
     * // Create many Chamados
     * const chamado = await prisma.chamado.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Chamados and only return the `id`
     * const chamadoWithIdOnly = await prisma.chamado.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChamadoCreateManyAndReturnArgs>(args?: SelectSubset<T, ChamadoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChamadoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Chamado.
     * @param {ChamadoDeleteArgs} args - Arguments to delete one Chamado.
     * @example
     * // Delete one Chamado
     * const Chamado = await prisma.chamado.delete({
     *   where: {
     *     // ... filter to delete one Chamado
     *   }
     * })
     * 
     */
    delete<T extends ChamadoDeleteArgs>(args: SelectSubset<T, ChamadoDeleteArgs<ExtArgs>>): Prisma__ChamadoClient<$Result.GetResult<Prisma.$ChamadoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chamado.
     * @param {ChamadoUpdateArgs} args - Arguments to update one Chamado.
     * @example
     * // Update one Chamado
     * const chamado = await prisma.chamado.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChamadoUpdateArgs>(args: SelectSubset<T, ChamadoUpdateArgs<ExtArgs>>): Prisma__ChamadoClient<$Result.GetResult<Prisma.$ChamadoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Chamados.
     * @param {ChamadoDeleteManyArgs} args - Arguments to filter Chamados to delete.
     * @example
     * // Delete a few Chamados
     * const { count } = await prisma.chamado.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChamadoDeleteManyArgs>(args?: SelectSubset<T, ChamadoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chamados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChamadoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chamados
     * const chamado = await prisma.chamado.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChamadoUpdateManyArgs>(args: SelectSubset<T, ChamadoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chamados and returns the data updated in the database.
     * @param {ChamadoUpdateManyAndReturnArgs} args - Arguments to update many Chamados.
     * @example
     * // Update many Chamados
     * const chamado = await prisma.chamado.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Chamados and only return the `id`
     * const chamadoWithIdOnly = await prisma.chamado.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChamadoUpdateManyAndReturnArgs>(args: SelectSubset<T, ChamadoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChamadoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Chamado.
     * @param {ChamadoUpsertArgs} args - Arguments to update or create a Chamado.
     * @example
     * // Update or create a Chamado
     * const chamado = await prisma.chamado.upsert({
     *   create: {
     *     // ... data to create a Chamado
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chamado we want to update
     *   }
     * })
     */
    upsert<T extends ChamadoUpsertArgs>(args: SelectSubset<T, ChamadoUpsertArgs<ExtArgs>>): Prisma__ChamadoClient<$Result.GetResult<Prisma.$ChamadoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Chamados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChamadoCountArgs} args - Arguments to filter Chamados to count.
     * @example
     * // Count the number of Chamados
     * const count = await prisma.chamado.count({
     *   where: {
     *     // ... the filter for the Chamados we want to count
     *   }
     * })
    **/
    count<T extends ChamadoCountArgs>(
      args?: Subset<T, ChamadoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChamadoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chamado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChamadoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChamadoAggregateArgs>(args: Subset<T, ChamadoAggregateArgs>): Prisma.PrismaPromise<GetChamadoAggregateType<T>>

    /**
     * Group by Chamado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChamadoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChamadoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChamadoGroupByArgs['orderBy'] }
        : { orderBy?: ChamadoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChamadoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChamadoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Chamado model
   */
  readonly fields: ChamadoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Chamado.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChamadoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ordensServico<T extends Chamado$ordensServicoArgs<ExtArgs> = {}>(args?: Subset<T, Chamado$ordensServicoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrdemServicoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Chamado model
   */
  interface ChamadoFieldRefs {
    readonly id: FieldRef<"Chamado", 'Int'>
    readonly titulo: FieldRef<"Chamado", 'String'>
    readonly descricao: FieldRef<"Chamado", 'String'>
    readonly prioridade: FieldRef<"Chamado", 'String'>
    readonly status: FieldRef<"Chamado", 'String'>
    readonly cliente: FieldRef<"Chamado", 'String'>
    readonly tecnico: FieldRef<"Chamado", 'String'>
    readonly createdAt: FieldRef<"Chamado", 'DateTime'>
    readonly updatedAt: FieldRef<"Chamado", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Chamado findUnique
   */
  export type ChamadoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamado
     */
    select?: ChamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chamado
     */
    omit?: ChamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChamadoInclude<ExtArgs> | null
    /**
     * Filter, which Chamado to fetch.
     */
    where: ChamadoWhereUniqueInput
  }

  /**
   * Chamado findUniqueOrThrow
   */
  export type ChamadoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamado
     */
    select?: ChamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chamado
     */
    omit?: ChamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChamadoInclude<ExtArgs> | null
    /**
     * Filter, which Chamado to fetch.
     */
    where: ChamadoWhereUniqueInput
  }

  /**
   * Chamado findFirst
   */
  export type ChamadoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamado
     */
    select?: ChamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chamado
     */
    omit?: ChamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChamadoInclude<ExtArgs> | null
    /**
     * Filter, which Chamado to fetch.
     */
    where?: ChamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chamados to fetch.
     */
    orderBy?: ChamadoOrderByWithRelationInput | ChamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chamados.
     */
    cursor?: ChamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chamados.
     */
    distinct?: ChamadoScalarFieldEnum | ChamadoScalarFieldEnum[]
  }

  /**
   * Chamado findFirstOrThrow
   */
  export type ChamadoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamado
     */
    select?: ChamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chamado
     */
    omit?: ChamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChamadoInclude<ExtArgs> | null
    /**
     * Filter, which Chamado to fetch.
     */
    where?: ChamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chamados to fetch.
     */
    orderBy?: ChamadoOrderByWithRelationInput | ChamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chamados.
     */
    cursor?: ChamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chamados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chamados.
     */
    distinct?: ChamadoScalarFieldEnum | ChamadoScalarFieldEnum[]
  }

  /**
   * Chamado findMany
   */
  export type ChamadoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamado
     */
    select?: ChamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chamado
     */
    omit?: ChamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChamadoInclude<ExtArgs> | null
    /**
     * Filter, which Chamados to fetch.
     */
    where?: ChamadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chamados to fetch.
     */
    orderBy?: ChamadoOrderByWithRelationInput | ChamadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Chamados.
     */
    cursor?: ChamadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chamados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chamados.
     */
    skip?: number
    distinct?: ChamadoScalarFieldEnum | ChamadoScalarFieldEnum[]
  }

  /**
   * Chamado create
   */
  export type ChamadoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamado
     */
    select?: ChamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chamado
     */
    omit?: ChamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChamadoInclude<ExtArgs> | null
    /**
     * The data needed to create a Chamado.
     */
    data: XOR<ChamadoCreateInput, ChamadoUncheckedCreateInput>
  }

  /**
   * Chamado createMany
   */
  export type ChamadoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Chamados.
     */
    data: ChamadoCreateManyInput | ChamadoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Chamado createManyAndReturn
   */
  export type ChamadoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamado
     */
    select?: ChamadoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chamado
     */
    omit?: ChamadoOmit<ExtArgs> | null
    /**
     * The data used to create many Chamados.
     */
    data: ChamadoCreateManyInput | ChamadoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Chamado update
   */
  export type ChamadoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamado
     */
    select?: ChamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chamado
     */
    omit?: ChamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChamadoInclude<ExtArgs> | null
    /**
     * The data needed to update a Chamado.
     */
    data: XOR<ChamadoUpdateInput, ChamadoUncheckedUpdateInput>
    /**
     * Choose, which Chamado to update.
     */
    where: ChamadoWhereUniqueInput
  }

  /**
   * Chamado updateMany
   */
  export type ChamadoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Chamados.
     */
    data: XOR<ChamadoUpdateManyMutationInput, ChamadoUncheckedUpdateManyInput>
    /**
     * Filter which Chamados to update
     */
    where?: ChamadoWhereInput
    /**
     * Limit how many Chamados to update.
     */
    limit?: number
  }

  /**
   * Chamado updateManyAndReturn
   */
  export type ChamadoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamado
     */
    select?: ChamadoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chamado
     */
    omit?: ChamadoOmit<ExtArgs> | null
    /**
     * The data used to update Chamados.
     */
    data: XOR<ChamadoUpdateManyMutationInput, ChamadoUncheckedUpdateManyInput>
    /**
     * Filter which Chamados to update
     */
    where?: ChamadoWhereInput
    /**
     * Limit how many Chamados to update.
     */
    limit?: number
  }

  /**
   * Chamado upsert
   */
  export type ChamadoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamado
     */
    select?: ChamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chamado
     */
    omit?: ChamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChamadoInclude<ExtArgs> | null
    /**
     * The filter to search for the Chamado to update in case it exists.
     */
    where: ChamadoWhereUniqueInput
    /**
     * In case the Chamado found by the `where` argument doesn't exist, create a new Chamado with this data.
     */
    create: XOR<ChamadoCreateInput, ChamadoUncheckedCreateInput>
    /**
     * In case the Chamado was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChamadoUpdateInput, ChamadoUncheckedUpdateInput>
  }

  /**
   * Chamado delete
   */
  export type ChamadoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamado
     */
    select?: ChamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chamado
     */
    omit?: ChamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChamadoInclude<ExtArgs> | null
    /**
     * Filter which Chamado to delete.
     */
    where: ChamadoWhereUniqueInput
  }

  /**
   * Chamado deleteMany
   */
  export type ChamadoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chamados to delete
     */
    where?: ChamadoWhereInput
    /**
     * Limit how many Chamados to delete.
     */
    limit?: number
  }

  /**
   * Chamado.ordensServico
   */
  export type Chamado$ordensServicoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrdemServico
     */
    select?: OrdemServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrdemServico
     */
    omit?: OrdemServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrdemServicoInclude<ExtArgs> | null
    where?: OrdemServicoWhereInput
    orderBy?: OrdemServicoOrderByWithRelationInput | OrdemServicoOrderByWithRelationInput[]
    cursor?: OrdemServicoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrdemServicoScalarFieldEnum | OrdemServicoScalarFieldEnum[]
  }

  /**
   * Chamado without action
   */
  export type ChamadoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamado
     */
    select?: ChamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chamado
     */
    omit?: ChamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChamadoInclude<ExtArgs> | null
  }


  /**
   * Model OrdemServico
   */

  export type AggregateOrdemServico = {
    _count: OrdemServicoCountAggregateOutputType | null
    _avg: OrdemServicoAvgAggregateOutputType | null
    _sum: OrdemServicoSumAggregateOutputType | null
    _min: OrdemServicoMinAggregateOutputType | null
    _max: OrdemServicoMaxAggregateOutputType | null
  }

  export type OrdemServicoAvgAggregateOutputType = {
    id: number | null
    chamadoId: number | null
    valorMaoObra: number | null
  }

  export type OrdemServicoSumAggregateOutputType = {
    id: number | null
    chamadoId: number | null
    valorMaoObra: number | null
  }

  export type OrdemServicoMinAggregateOutputType = {
    id: number | null
    numero: string | null
    chamadoId: number | null
    cliente: string | null
    descricao: string | null
    status: string | null
    valorMaoObra: number | null
    observacoes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrdemServicoMaxAggregateOutputType = {
    id: number | null
    numero: string | null
    chamadoId: number | null
    cliente: string | null
    descricao: string | null
    status: string | null
    valorMaoObra: number | null
    observacoes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrdemServicoCountAggregateOutputType = {
    id: number
    numero: number
    chamadoId: number
    cliente: number
    descricao: number
    status: number
    valorMaoObra: number
    observacoes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrdemServicoAvgAggregateInputType = {
    id?: true
    chamadoId?: true
    valorMaoObra?: true
  }

  export type OrdemServicoSumAggregateInputType = {
    id?: true
    chamadoId?: true
    valorMaoObra?: true
  }

  export type OrdemServicoMinAggregateInputType = {
    id?: true
    numero?: true
    chamadoId?: true
    cliente?: true
    descricao?: true
    status?: true
    valorMaoObra?: true
    observacoes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrdemServicoMaxAggregateInputType = {
    id?: true
    numero?: true
    chamadoId?: true
    cliente?: true
    descricao?: true
    status?: true
    valorMaoObra?: true
    observacoes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrdemServicoCountAggregateInputType = {
    id?: true
    numero?: true
    chamadoId?: true
    cliente?: true
    descricao?: true
    status?: true
    valorMaoObra?: true
    observacoes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrdemServicoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrdemServico to aggregate.
     */
    where?: OrdemServicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrdemServicos to fetch.
     */
    orderBy?: OrdemServicoOrderByWithRelationInput | OrdemServicoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrdemServicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrdemServicos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrdemServicos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrdemServicos
    **/
    _count?: true | OrdemServicoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrdemServicoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrdemServicoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrdemServicoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrdemServicoMaxAggregateInputType
  }

  export type GetOrdemServicoAggregateType<T extends OrdemServicoAggregateArgs> = {
        [P in keyof T & keyof AggregateOrdemServico]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrdemServico[P]>
      : GetScalarType<T[P], AggregateOrdemServico[P]>
  }




  export type OrdemServicoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrdemServicoWhereInput
    orderBy?: OrdemServicoOrderByWithAggregationInput | OrdemServicoOrderByWithAggregationInput[]
    by: OrdemServicoScalarFieldEnum[] | OrdemServicoScalarFieldEnum
    having?: OrdemServicoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrdemServicoCountAggregateInputType | true
    _avg?: OrdemServicoAvgAggregateInputType
    _sum?: OrdemServicoSumAggregateInputType
    _min?: OrdemServicoMinAggregateInputType
    _max?: OrdemServicoMaxAggregateInputType
  }

  export type OrdemServicoGroupByOutputType = {
    id: number
    numero: string
    chamadoId: number | null
    cliente: string | null
    descricao: string
    status: string
    valorMaoObra: number | null
    observacoes: string | null
    createdAt: Date
    updatedAt: Date
    _count: OrdemServicoCountAggregateOutputType | null
    _avg: OrdemServicoAvgAggregateOutputType | null
    _sum: OrdemServicoSumAggregateOutputType | null
    _min: OrdemServicoMinAggregateOutputType | null
    _max: OrdemServicoMaxAggregateOutputType | null
  }

  type GetOrdemServicoGroupByPayload<T extends OrdemServicoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrdemServicoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrdemServicoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrdemServicoGroupByOutputType[P]>
            : GetScalarType<T[P], OrdemServicoGroupByOutputType[P]>
        }
      >
    >


  export type OrdemServicoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    chamadoId?: boolean
    cliente?: boolean
    descricao?: boolean
    status?: boolean
    valorMaoObra?: boolean
    observacoes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chamado?: boolean | OrdemServico$chamadoArgs<ExtArgs>
    itensUsados?: boolean | OrdemServico$itensUsadosArgs<ExtArgs>
    _count?: boolean | OrdemServicoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ordemServico"]>

  export type OrdemServicoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    chamadoId?: boolean
    cliente?: boolean
    descricao?: boolean
    status?: boolean
    valorMaoObra?: boolean
    observacoes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chamado?: boolean | OrdemServico$chamadoArgs<ExtArgs>
  }, ExtArgs["result"]["ordemServico"]>

  export type OrdemServicoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    chamadoId?: boolean
    cliente?: boolean
    descricao?: boolean
    status?: boolean
    valorMaoObra?: boolean
    observacoes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chamado?: boolean | OrdemServico$chamadoArgs<ExtArgs>
  }, ExtArgs["result"]["ordemServico"]>

  export type OrdemServicoSelectScalar = {
    id?: boolean
    numero?: boolean
    chamadoId?: boolean
    cliente?: boolean
    descricao?: boolean
    status?: boolean
    valorMaoObra?: boolean
    observacoes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrdemServicoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numero" | "chamadoId" | "cliente" | "descricao" | "status" | "valorMaoObra" | "observacoes" | "createdAt" | "updatedAt", ExtArgs["result"]["ordemServico"]>
  export type OrdemServicoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chamado?: boolean | OrdemServico$chamadoArgs<ExtArgs>
    itensUsados?: boolean | OrdemServico$itensUsadosArgs<ExtArgs>
    _count?: boolean | OrdemServicoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrdemServicoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chamado?: boolean | OrdemServico$chamadoArgs<ExtArgs>
  }
  export type OrdemServicoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chamado?: boolean | OrdemServico$chamadoArgs<ExtArgs>
  }

  export type $OrdemServicoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrdemServico"
    objects: {
      chamado: Prisma.$ChamadoPayload<ExtArgs> | null
      itensUsados: Prisma.$ItemOSPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      numero: string
      chamadoId: number | null
      cliente: string | null
      descricao: string
      status: string
      valorMaoObra: number | null
      observacoes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ordemServico"]>
    composites: {}
  }

  type OrdemServicoGetPayload<S extends boolean | null | undefined | OrdemServicoDefaultArgs> = $Result.GetResult<Prisma.$OrdemServicoPayload, S>

  type OrdemServicoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrdemServicoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrdemServicoCountAggregateInputType | true
    }

  export interface OrdemServicoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrdemServico'], meta: { name: 'OrdemServico' } }
    /**
     * Find zero or one OrdemServico that matches the filter.
     * @param {OrdemServicoFindUniqueArgs} args - Arguments to find a OrdemServico
     * @example
     * // Get one OrdemServico
     * const ordemServico = await prisma.ordemServico.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrdemServicoFindUniqueArgs>(args: SelectSubset<T, OrdemServicoFindUniqueArgs<ExtArgs>>): Prisma__OrdemServicoClient<$Result.GetResult<Prisma.$OrdemServicoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrdemServico that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrdemServicoFindUniqueOrThrowArgs} args - Arguments to find a OrdemServico
     * @example
     * // Get one OrdemServico
     * const ordemServico = await prisma.ordemServico.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrdemServicoFindUniqueOrThrowArgs>(args: SelectSubset<T, OrdemServicoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrdemServicoClient<$Result.GetResult<Prisma.$OrdemServicoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrdemServico that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrdemServicoFindFirstArgs} args - Arguments to find a OrdemServico
     * @example
     * // Get one OrdemServico
     * const ordemServico = await prisma.ordemServico.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrdemServicoFindFirstArgs>(args?: SelectSubset<T, OrdemServicoFindFirstArgs<ExtArgs>>): Prisma__OrdemServicoClient<$Result.GetResult<Prisma.$OrdemServicoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrdemServico that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrdemServicoFindFirstOrThrowArgs} args - Arguments to find a OrdemServico
     * @example
     * // Get one OrdemServico
     * const ordemServico = await prisma.ordemServico.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrdemServicoFindFirstOrThrowArgs>(args?: SelectSubset<T, OrdemServicoFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrdemServicoClient<$Result.GetResult<Prisma.$OrdemServicoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrdemServicos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrdemServicoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrdemServicos
     * const ordemServicos = await prisma.ordemServico.findMany()
     * 
     * // Get first 10 OrdemServicos
     * const ordemServicos = await prisma.ordemServico.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ordemServicoWithIdOnly = await prisma.ordemServico.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrdemServicoFindManyArgs>(args?: SelectSubset<T, OrdemServicoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrdemServicoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrdemServico.
     * @param {OrdemServicoCreateArgs} args - Arguments to create a OrdemServico.
     * @example
     * // Create one OrdemServico
     * const OrdemServico = await prisma.ordemServico.create({
     *   data: {
     *     // ... data to create a OrdemServico
     *   }
     * })
     * 
     */
    create<T extends OrdemServicoCreateArgs>(args: SelectSubset<T, OrdemServicoCreateArgs<ExtArgs>>): Prisma__OrdemServicoClient<$Result.GetResult<Prisma.$OrdemServicoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrdemServicos.
     * @param {OrdemServicoCreateManyArgs} args - Arguments to create many OrdemServicos.
     * @example
     * // Create many OrdemServicos
     * const ordemServico = await prisma.ordemServico.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrdemServicoCreateManyArgs>(args?: SelectSubset<T, OrdemServicoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrdemServicos and returns the data saved in the database.
     * @param {OrdemServicoCreateManyAndReturnArgs} args - Arguments to create many OrdemServicos.
     * @example
     * // Create many OrdemServicos
     * const ordemServico = await prisma.ordemServico.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrdemServicos and only return the `id`
     * const ordemServicoWithIdOnly = await prisma.ordemServico.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrdemServicoCreateManyAndReturnArgs>(args?: SelectSubset<T, OrdemServicoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrdemServicoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrdemServico.
     * @param {OrdemServicoDeleteArgs} args - Arguments to delete one OrdemServico.
     * @example
     * // Delete one OrdemServico
     * const OrdemServico = await prisma.ordemServico.delete({
     *   where: {
     *     // ... filter to delete one OrdemServico
     *   }
     * })
     * 
     */
    delete<T extends OrdemServicoDeleteArgs>(args: SelectSubset<T, OrdemServicoDeleteArgs<ExtArgs>>): Prisma__OrdemServicoClient<$Result.GetResult<Prisma.$OrdemServicoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrdemServico.
     * @param {OrdemServicoUpdateArgs} args - Arguments to update one OrdemServico.
     * @example
     * // Update one OrdemServico
     * const ordemServico = await prisma.ordemServico.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrdemServicoUpdateArgs>(args: SelectSubset<T, OrdemServicoUpdateArgs<ExtArgs>>): Prisma__OrdemServicoClient<$Result.GetResult<Prisma.$OrdemServicoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrdemServicos.
     * @param {OrdemServicoDeleteManyArgs} args - Arguments to filter OrdemServicos to delete.
     * @example
     * // Delete a few OrdemServicos
     * const { count } = await prisma.ordemServico.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrdemServicoDeleteManyArgs>(args?: SelectSubset<T, OrdemServicoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrdemServicos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrdemServicoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrdemServicos
     * const ordemServico = await prisma.ordemServico.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrdemServicoUpdateManyArgs>(args: SelectSubset<T, OrdemServicoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrdemServicos and returns the data updated in the database.
     * @param {OrdemServicoUpdateManyAndReturnArgs} args - Arguments to update many OrdemServicos.
     * @example
     * // Update many OrdemServicos
     * const ordemServico = await prisma.ordemServico.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrdemServicos and only return the `id`
     * const ordemServicoWithIdOnly = await prisma.ordemServico.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrdemServicoUpdateManyAndReturnArgs>(args: SelectSubset<T, OrdemServicoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrdemServicoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrdemServico.
     * @param {OrdemServicoUpsertArgs} args - Arguments to update or create a OrdemServico.
     * @example
     * // Update or create a OrdemServico
     * const ordemServico = await prisma.ordemServico.upsert({
     *   create: {
     *     // ... data to create a OrdemServico
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrdemServico we want to update
     *   }
     * })
     */
    upsert<T extends OrdemServicoUpsertArgs>(args: SelectSubset<T, OrdemServicoUpsertArgs<ExtArgs>>): Prisma__OrdemServicoClient<$Result.GetResult<Prisma.$OrdemServicoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrdemServicos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrdemServicoCountArgs} args - Arguments to filter OrdemServicos to count.
     * @example
     * // Count the number of OrdemServicos
     * const count = await prisma.ordemServico.count({
     *   where: {
     *     // ... the filter for the OrdemServicos we want to count
     *   }
     * })
    **/
    count<T extends OrdemServicoCountArgs>(
      args?: Subset<T, OrdemServicoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrdemServicoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrdemServico.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrdemServicoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrdemServicoAggregateArgs>(args: Subset<T, OrdemServicoAggregateArgs>): Prisma.PrismaPromise<GetOrdemServicoAggregateType<T>>

    /**
     * Group by OrdemServico.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrdemServicoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrdemServicoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrdemServicoGroupByArgs['orderBy'] }
        : { orderBy?: OrdemServicoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrdemServicoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrdemServicoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrdemServico model
   */
  readonly fields: OrdemServicoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrdemServico.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrdemServicoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chamado<T extends OrdemServico$chamadoArgs<ExtArgs> = {}>(args?: Subset<T, OrdemServico$chamadoArgs<ExtArgs>>): Prisma__ChamadoClient<$Result.GetResult<Prisma.$ChamadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    itensUsados<T extends OrdemServico$itensUsadosArgs<ExtArgs> = {}>(args?: Subset<T, OrdemServico$itensUsadosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemOSPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrdemServico model
   */
  interface OrdemServicoFieldRefs {
    readonly id: FieldRef<"OrdemServico", 'Int'>
    readonly numero: FieldRef<"OrdemServico", 'String'>
    readonly chamadoId: FieldRef<"OrdemServico", 'Int'>
    readonly cliente: FieldRef<"OrdemServico", 'String'>
    readonly descricao: FieldRef<"OrdemServico", 'String'>
    readonly status: FieldRef<"OrdemServico", 'String'>
    readonly valorMaoObra: FieldRef<"OrdemServico", 'Float'>
    readonly observacoes: FieldRef<"OrdemServico", 'String'>
    readonly createdAt: FieldRef<"OrdemServico", 'DateTime'>
    readonly updatedAt: FieldRef<"OrdemServico", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrdemServico findUnique
   */
  export type OrdemServicoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrdemServico
     */
    select?: OrdemServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrdemServico
     */
    omit?: OrdemServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrdemServicoInclude<ExtArgs> | null
    /**
     * Filter, which OrdemServico to fetch.
     */
    where: OrdemServicoWhereUniqueInput
  }

  /**
   * OrdemServico findUniqueOrThrow
   */
  export type OrdemServicoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrdemServico
     */
    select?: OrdemServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrdemServico
     */
    omit?: OrdemServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrdemServicoInclude<ExtArgs> | null
    /**
     * Filter, which OrdemServico to fetch.
     */
    where: OrdemServicoWhereUniqueInput
  }

  /**
   * OrdemServico findFirst
   */
  export type OrdemServicoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrdemServico
     */
    select?: OrdemServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrdemServico
     */
    omit?: OrdemServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrdemServicoInclude<ExtArgs> | null
    /**
     * Filter, which OrdemServico to fetch.
     */
    where?: OrdemServicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrdemServicos to fetch.
     */
    orderBy?: OrdemServicoOrderByWithRelationInput | OrdemServicoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrdemServicos.
     */
    cursor?: OrdemServicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrdemServicos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrdemServicos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrdemServicos.
     */
    distinct?: OrdemServicoScalarFieldEnum | OrdemServicoScalarFieldEnum[]
  }

  /**
   * OrdemServico findFirstOrThrow
   */
  export type OrdemServicoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrdemServico
     */
    select?: OrdemServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrdemServico
     */
    omit?: OrdemServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrdemServicoInclude<ExtArgs> | null
    /**
     * Filter, which OrdemServico to fetch.
     */
    where?: OrdemServicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrdemServicos to fetch.
     */
    orderBy?: OrdemServicoOrderByWithRelationInput | OrdemServicoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrdemServicos.
     */
    cursor?: OrdemServicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrdemServicos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrdemServicos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrdemServicos.
     */
    distinct?: OrdemServicoScalarFieldEnum | OrdemServicoScalarFieldEnum[]
  }

  /**
   * OrdemServico findMany
   */
  export type OrdemServicoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrdemServico
     */
    select?: OrdemServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrdemServico
     */
    omit?: OrdemServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrdemServicoInclude<ExtArgs> | null
    /**
     * Filter, which OrdemServicos to fetch.
     */
    where?: OrdemServicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrdemServicos to fetch.
     */
    orderBy?: OrdemServicoOrderByWithRelationInput | OrdemServicoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrdemServicos.
     */
    cursor?: OrdemServicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrdemServicos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrdemServicos.
     */
    skip?: number
    distinct?: OrdemServicoScalarFieldEnum | OrdemServicoScalarFieldEnum[]
  }

  /**
   * OrdemServico create
   */
  export type OrdemServicoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrdemServico
     */
    select?: OrdemServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrdemServico
     */
    omit?: OrdemServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrdemServicoInclude<ExtArgs> | null
    /**
     * The data needed to create a OrdemServico.
     */
    data: XOR<OrdemServicoCreateInput, OrdemServicoUncheckedCreateInput>
  }

  /**
   * OrdemServico createMany
   */
  export type OrdemServicoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrdemServicos.
     */
    data: OrdemServicoCreateManyInput | OrdemServicoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrdemServico createManyAndReturn
   */
  export type OrdemServicoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrdemServico
     */
    select?: OrdemServicoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrdemServico
     */
    omit?: OrdemServicoOmit<ExtArgs> | null
    /**
     * The data used to create many OrdemServicos.
     */
    data: OrdemServicoCreateManyInput | OrdemServicoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrdemServicoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrdemServico update
   */
  export type OrdemServicoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrdemServico
     */
    select?: OrdemServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrdemServico
     */
    omit?: OrdemServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrdemServicoInclude<ExtArgs> | null
    /**
     * The data needed to update a OrdemServico.
     */
    data: XOR<OrdemServicoUpdateInput, OrdemServicoUncheckedUpdateInput>
    /**
     * Choose, which OrdemServico to update.
     */
    where: OrdemServicoWhereUniqueInput
  }

  /**
   * OrdemServico updateMany
   */
  export type OrdemServicoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrdemServicos.
     */
    data: XOR<OrdemServicoUpdateManyMutationInput, OrdemServicoUncheckedUpdateManyInput>
    /**
     * Filter which OrdemServicos to update
     */
    where?: OrdemServicoWhereInput
    /**
     * Limit how many OrdemServicos to update.
     */
    limit?: number
  }

  /**
   * OrdemServico updateManyAndReturn
   */
  export type OrdemServicoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrdemServico
     */
    select?: OrdemServicoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrdemServico
     */
    omit?: OrdemServicoOmit<ExtArgs> | null
    /**
     * The data used to update OrdemServicos.
     */
    data: XOR<OrdemServicoUpdateManyMutationInput, OrdemServicoUncheckedUpdateManyInput>
    /**
     * Filter which OrdemServicos to update
     */
    where?: OrdemServicoWhereInput
    /**
     * Limit how many OrdemServicos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrdemServicoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrdemServico upsert
   */
  export type OrdemServicoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrdemServico
     */
    select?: OrdemServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrdemServico
     */
    omit?: OrdemServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrdemServicoInclude<ExtArgs> | null
    /**
     * The filter to search for the OrdemServico to update in case it exists.
     */
    where: OrdemServicoWhereUniqueInput
    /**
     * In case the OrdemServico found by the `where` argument doesn't exist, create a new OrdemServico with this data.
     */
    create: XOR<OrdemServicoCreateInput, OrdemServicoUncheckedCreateInput>
    /**
     * In case the OrdemServico was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrdemServicoUpdateInput, OrdemServicoUncheckedUpdateInput>
  }

  /**
   * OrdemServico delete
   */
  export type OrdemServicoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrdemServico
     */
    select?: OrdemServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrdemServico
     */
    omit?: OrdemServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrdemServicoInclude<ExtArgs> | null
    /**
     * Filter which OrdemServico to delete.
     */
    where: OrdemServicoWhereUniqueInput
  }

  /**
   * OrdemServico deleteMany
   */
  export type OrdemServicoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrdemServicos to delete
     */
    where?: OrdemServicoWhereInput
    /**
     * Limit how many OrdemServicos to delete.
     */
    limit?: number
  }

  /**
   * OrdemServico.chamado
   */
  export type OrdemServico$chamadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamado
     */
    select?: ChamadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chamado
     */
    omit?: ChamadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChamadoInclude<ExtArgs> | null
    where?: ChamadoWhereInput
  }

  /**
   * OrdemServico.itensUsados
   */
  export type OrdemServico$itensUsadosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemOS
     */
    select?: ItemOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemOS
     */
    omit?: ItemOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemOSInclude<ExtArgs> | null
    where?: ItemOSWhereInput
    orderBy?: ItemOSOrderByWithRelationInput | ItemOSOrderByWithRelationInput[]
    cursor?: ItemOSWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemOSScalarFieldEnum | ItemOSScalarFieldEnum[]
  }

  /**
   * OrdemServico without action
   */
  export type OrdemServicoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrdemServico
     */
    select?: OrdemServicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrdemServico
     */
    omit?: OrdemServicoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrdemServicoInclude<ExtArgs> | null
  }


  /**
   * Model ItemOS
   */

  export type AggregateItemOS = {
    _count: ItemOSCountAggregateOutputType | null
    _avg: ItemOSAvgAggregateOutputType | null
    _sum: ItemOSSumAggregateOutputType | null
    _min: ItemOSMinAggregateOutputType | null
    _max: ItemOSMaxAggregateOutputType | null
  }

  export type ItemOSAvgAggregateOutputType = {
    id: number | null
    osId: number | null
    itemEstoqueId: number | null
    quantidade: number | null
    valorUnitario: number | null
  }

  export type ItemOSSumAggregateOutputType = {
    id: number | null
    osId: number | null
    itemEstoqueId: number | null
    quantidade: number | null
    valorUnitario: number | null
  }

  export type ItemOSMinAggregateOutputType = {
    id: number | null
    osId: number | null
    itemEstoqueId: number | null
    quantidade: number | null
    valorUnitario: number | null
  }

  export type ItemOSMaxAggregateOutputType = {
    id: number | null
    osId: number | null
    itemEstoqueId: number | null
    quantidade: number | null
    valorUnitario: number | null
  }

  export type ItemOSCountAggregateOutputType = {
    id: number
    osId: number
    itemEstoqueId: number
    quantidade: number
    valorUnitario: number
    _all: number
  }


  export type ItemOSAvgAggregateInputType = {
    id?: true
    osId?: true
    itemEstoqueId?: true
    quantidade?: true
    valorUnitario?: true
  }

  export type ItemOSSumAggregateInputType = {
    id?: true
    osId?: true
    itemEstoqueId?: true
    quantidade?: true
    valorUnitario?: true
  }

  export type ItemOSMinAggregateInputType = {
    id?: true
    osId?: true
    itemEstoqueId?: true
    quantidade?: true
    valorUnitario?: true
  }

  export type ItemOSMaxAggregateInputType = {
    id?: true
    osId?: true
    itemEstoqueId?: true
    quantidade?: true
    valorUnitario?: true
  }

  export type ItemOSCountAggregateInputType = {
    id?: true
    osId?: true
    itemEstoqueId?: true
    quantidade?: true
    valorUnitario?: true
    _all?: true
  }

  export type ItemOSAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemOS to aggregate.
     */
    where?: ItemOSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemOS to fetch.
     */
    orderBy?: ItemOSOrderByWithRelationInput | ItemOSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemOSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemOS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemOS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItemOS
    **/
    _count?: true | ItemOSCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemOSAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemOSSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemOSMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemOSMaxAggregateInputType
  }

  export type GetItemOSAggregateType<T extends ItemOSAggregateArgs> = {
        [P in keyof T & keyof AggregateItemOS]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemOS[P]>
      : GetScalarType<T[P], AggregateItemOS[P]>
  }




  export type ItemOSGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemOSWhereInput
    orderBy?: ItemOSOrderByWithAggregationInput | ItemOSOrderByWithAggregationInput[]
    by: ItemOSScalarFieldEnum[] | ItemOSScalarFieldEnum
    having?: ItemOSScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemOSCountAggregateInputType | true
    _avg?: ItemOSAvgAggregateInputType
    _sum?: ItemOSSumAggregateInputType
    _min?: ItemOSMinAggregateInputType
    _max?: ItemOSMaxAggregateInputType
  }

  export type ItemOSGroupByOutputType = {
    id: number
    osId: number
    itemEstoqueId: number
    quantidade: number
    valorUnitario: number | null
    _count: ItemOSCountAggregateOutputType | null
    _avg: ItemOSAvgAggregateOutputType | null
    _sum: ItemOSSumAggregateOutputType | null
    _min: ItemOSMinAggregateOutputType | null
    _max: ItemOSMaxAggregateOutputType | null
  }

  type GetItemOSGroupByPayload<T extends ItemOSGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemOSGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemOSGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemOSGroupByOutputType[P]>
            : GetScalarType<T[P], ItemOSGroupByOutputType[P]>
        }
      >
    >


  export type ItemOSSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    osId?: boolean
    itemEstoqueId?: boolean
    quantidade?: boolean
    valorUnitario?: boolean
    os?: boolean | OrdemServicoDefaultArgs<ExtArgs>
    item?: boolean | ItemEstoqueDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemOS"]>

  export type ItemOSSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    osId?: boolean
    itemEstoqueId?: boolean
    quantidade?: boolean
    valorUnitario?: boolean
    os?: boolean | OrdemServicoDefaultArgs<ExtArgs>
    item?: boolean | ItemEstoqueDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemOS"]>

  export type ItemOSSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    osId?: boolean
    itemEstoqueId?: boolean
    quantidade?: boolean
    valorUnitario?: boolean
    os?: boolean | OrdemServicoDefaultArgs<ExtArgs>
    item?: boolean | ItemEstoqueDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemOS"]>

  export type ItemOSSelectScalar = {
    id?: boolean
    osId?: boolean
    itemEstoqueId?: boolean
    quantidade?: boolean
    valorUnitario?: boolean
  }

  export type ItemOSOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "osId" | "itemEstoqueId" | "quantidade" | "valorUnitario", ExtArgs["result"]["itemOS"]>
  export type ItemOSInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    os?: boolean | OrdemServicoDefaultArgs<ExtArgs>
    item?: boolean | ItemEstoqueDefaultArgs<ExtArgs>
  }
  export type ItemOSIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    os?: boolean | OrdemServicoDefaultArgs<ExtArgs>
    item?: boolean | ItemEstoqueDefaultArgs<ExtArgs>
  }
  export type ItemOSIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    os?: boolean | OrdemServicoDefaultArgs<ExtArgs>
    item?: boolean | ItemEstoqueDefaultArgs<ExtArgs>
  }

  export type $ItemOSPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItemOS"
    objects: {
      os: Prisma.$OrdemServicoPayload<ExtArgs>
      item: Prisma.$ItemEstoquePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      osId: number
      itemEstoqueId: number
      quantidade: number
      valorUnitario: number | null
    }, ExtArgs["result"]["itemOS"]>
    composites: {}
  }

  type ItemOSGetPayload<S extends boolean | null | undefined | ItemOSDefaultArgs> = $Result.GetResult<Prisma.$ItemOSPayload, S>

  type ItemOSCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemOSFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemOSCountAggregateInputType | true
    }

  export interface ItemOSDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItemOS'], meta: { name: 'ItemOS' } }
    /**
     * Find zero or one ItemOS that matches the filter.
     * @param {ItemOSFindUniqueArgs} args - Arguments to find a ItemOS
     * @example
     * // Get one ItemOS
     * const itemOS = await prisma.itemOS.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemOSFindUniqueArgs>(args: SelectSubset<T, ItemOSFindUniqueArgs<ExtArgs>>): Prisma__ItemOSClient<$Result.GetResult<Prisma.$ItemOSPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItemOS that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemOSFindUniqueOrThrowArgs} args - Arguments to find a ItemOS
     * @example
     * // Get one ItemOS
     * const itemOS = await prisma.itemOS.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemOSFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemOSFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemOSClient<$Result.GetResult<Prisma.$ItemOSPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemOS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemOSFindFirstArgs} args - Arguments to find a ItemOS
     * @example
     * // Get one ItemOS
     * const itemOS = await prisma.itemOS.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemOSFindFirstArgs>(args?: SelectSubset<T, ItemOSFindFirstArgs<ExtArgs>>): Prisma__ItemOSClient<$Result.GetResult<Prisma.$ItemOSPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemOS that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemOSFindFirstOrThrowArgs} args - Arguments to find a ItemOS
     * @example
     * // Get one ItemOS
     * const itemOS = await prisma.itemOS.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemOSFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemOSFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemOSClient<$Result.GetResult<Prisma.$ItemOSPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItemOS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemOSFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemOS
     * const itemOS = await prisma.itemOS.findMany()
     * 
     * // Get first 10 ItemOS
     * const itemOS = await prisma.itemOS.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemOSWithIdOnly = await prisma.itemOS.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemOSFindManyArgs>(args?: SelectSubset<T, ItemOSFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemOSPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItemOS.
     * @param {ItemOSCreateArgs} args - Arguments to create a ItemOS.
     * @example
     * // Create one ItemOS
     * const ItemOS = await prisma.itemOS.create({
     *   data: {
     *     // ... data to create a ItemOS
     *   }
     * })
     * 
     */
    create<T extends ItemOSCreateArgs>(args: SelectSubset<T, ItemOSCreateArgs<ExtArgs>>): Prisma__ItemOSClient<$Result.GetResult<Prisma.$ItemOSPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItemOS.
     * @param {ItemOSCreateManyArgs} args - Arguments to create many ItemOS.
     * @example
     * // Create many ItemOS
     * const itemOS = await prisma.itemOS.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemOSCreateManyArgs>(args?: SelectSubset<T, ItemOSCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItemOS and returns the data saved in the database.
     * @param {ItemOSCreateManyAndReturnArgs} args - Arguments to create many ItemOS.
     * @example
     * // Create many ItemOS
     * const itemOS = await prisma.itemOS.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItemOS and only return the `id`
     * const itemOSWithIdOnly = await prisma.itemOS.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemOSCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemOSCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemOSPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ItemOS.
     * @param {ItemOSDeleteArgs} args - Arguments to delete one ItemOS.
     * @example
     * // Delete one ItemOS
     * const ItemOS = await prisma.itemOS.delete({
     *   where: {
     *     // ... filter to delete one ItemOS
     *   }
     * })
     * 
     */
    delete<T extends ItemOSDeleteArgs>(args: SelectSubset<T, ItemOSDeleteArgs<ExtArgs>>): Prisma__ItemOSClient<$Result.GetResult<Prisma.$ItemOSPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItemOS.
     * @param {ItemOSUpdateArgs} args - Arguments to update one ItemOS.
     * @example
     * // Update one ItemOS
     * const itemOS = await prisma.itemOS.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemOSUpdateArgs>(args: SelectSubset<T, ItemOSUpdateArgs<ExtArgs>>): Prisma__ItemOSClient<$Result.GetResult<Prisma.$ItemOSPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItemOS.
     * @param {ItemOSDeleteManyArgs} args - Arguments to filter ItemOS to delete.
     * @example
     * // Delete a few ItemOS
     * const { count } = await prisma.itemOS.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemOSDeleteManyArgs>(args?: SelectSubset<T, ItemOSDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemOS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemOSUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemOS
     * const itemOS = await prisma.itemOS.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemOSUpdateManyArgs>(args: SelectSubset<T, ItemOSUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemOS and returns the data updated in the database.
     * @param {ItemOSUpdateManyAndReturnArgs} args - Arguments to update many ItemOS.
     * @example
     * // Update many ItemOS
     * const itemOS = await prisma.itemOS.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ItemOS and only return the `id`
     * const itemOSWithIdOnly = await prisma.itemOS.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ItemOSUpdateManyAndReturnArgs>(args: SelectSubset<T, ItemOSUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemOSPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ItemOS.
     * @param {ItemOSUpsertArgs} args - Arguments to update or create a ItemOS.
     * @example
     * // Update or create a ItemOS
     * const itemOS = await prisma.itemOS.upsert({
     *   create: {
     *     // ... data to create a ItemOS
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemOS we want to update
     *   }
     * })
     */
    upsert<T extends ItemOSUpsertArgs>(args: SelectSubset<T, ItemOSUpsertArgs<ExtArgs>>): Prisma__ItemOSClient<$Result.GetResult<Prisma.$ItemOSPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItemOS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemOSCountArgs} args - Arguments to filter ItemOS to count.
     * @example
     * // Count the number of ItemOS
     * const count = await prisma.itemOS.count({
     *   where: {
     *     // ... the filter for the ItemOS we want to count
     *   }
     * })
    **/
    count<T extends ItemOSCountArgs>(
      args?: Subset<T, ItemOSCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemOSCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItemOS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemOSAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemOSAggregateArgs>(args: Subset<T, ItemOSAggregateArgs>): Prisma.PrismaPromise<GetItemOSAggregateType<T>>

    /**
     * Group by ItemOS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemOSGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemOSGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemOSGroupByArgs['orderBy'] }
        : { orderBy?: ItemOSGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemOSGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemOSGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItemOS model
   */
  readonly fields: ItemOSFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemOS.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemOSClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    os<T extends OrdemServicoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrdemServicoDefaultArgs<ExtArgs>>): Prisma__OrdemServicoClient<$Result.GetResult<Prisma.$OrdemServicoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    item<T extends ItemEstoqueDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItemEstoqueDefaultArgs<ExtArgs>>): Prisma__ItemEstoqueClient<$Result.GetResult<Prisma.$ItemEstoquePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItemOS model
   */
  interface ItemOSFieldRefs {
    readonly id: FieldRef<"ItemOS", 'Int'>
    readonly osId: FieldRef<"ItemOS", 'Int'>
    readonly itemEstoqueId: FieldRef<"ItemOS", 'Int'>
    readonly quantidade: FieldRef<"ItemOS", 'Int'>
    readonly valorUnitario: FieldRef<"ItemOS", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * ItemOS findUnique
   */
  export type ItemOSFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemOS
     */
    select?: ItemOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemOS
     */
    omit?: ItemOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemOSInclude<ExtArgs> | null
    /**
     * Filter, which ItemOS to fetch.
     */
    where: ItemOSWhereUniqueInput
  }

  /**
   * ItemOS findUniqueOrThrow
   */
  export type ItemOSFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemOS
     */
    select?: ItemOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemOS
     */
    omit?: ItemOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemOSInclude<ExtArgs> | null
    /**
     * Filter, which ItemOS to fetch.
     */
    where: ItemOSWhereUniqueInput
  }

  /**
   * ItemOS findFirst
   */
  export type ItemOSFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemOS
     */
    select?: ItemOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemOS
     */
    omit?: ItemOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemOSInclude<ExtArgs> | null
    /**
     * Filter, which ItemOS to fetch.
     */
    where?: ItemOSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemOS to fetch.
     */
    orderBy?: ItemOSOrderByWithRelationInput | ItemOSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemOS.
     */
    cursor?: ItemOSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemOS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemOS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemOS.
     */
    distinct?: ItemOSScalarFieldEnum | ItemOSScalarFieldEnum[]
  }

  /**
   * ItemOS findFirstOrThrow
   */
  export type ItemOSFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemOS
     */
    select?: ItemOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemOS
     */
    omit?: ItemOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemOSInclude<ExtArgs> | null
    /**
     * Filter, which ItemOS to fetch.
     */
    where?: ItemOSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemOS to fetch.
     */
    orderBy?: ItemOSOrderByWithRelationInput | ItemOSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemOS.
     */
    cursor?: ItemOSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemOS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemOS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemOS.
     */
    distinct?: ItemOSScalarFieldEnum | ItemOSScalarFieldEnum[]
  }

  /**
   * ItemOS findMany
   */
  export type ItemOSFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemOS
     */
    select?: ItemOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemOS
     */
    omit?: ItemOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemOSInclude<ExtArgs> | null
    /**
     * Filter, which ItemOS to fetch.
     */
    where?: ItemOSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemOS to fetch.
     */
    orderBy?: ItemOSOrderByWithRelationInput | ItemOSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItemOS.
     */
    cursor?: ItemOSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemOS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemOS.
     */
    skip?: number
    distinct?: ItemOSScalarFieldEnum | ItemOSScalarFieldEnum[]
  }

  /**
   * ItemOS create
   */
  export type ItemOSCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemOS
     */
    select?: ItemOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemOS
     */
    omit?: ItemOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemOSInclude<ExtArgs> | null
    /**
     * The data needed to create a ItemOS.
     */
    data: XOR<ItemOSCreateInput, ItemOSUncheckedCreateInput>
  }

  /**
   * ItemOS createMany
   */
  export type ItemOSCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItemOS.
     */
    data: ItemOSCreateManyInput | ItemOSCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItemOS createManyAndReturn
   */
  export type ItemOSCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemOS
     */
    select?: ItemOSSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemOS
     */
    omit?: ItemOSOmit<ExtArgs> | null
    /**
     * The data used to create many ItemOS.
     */
    data: ItemOSCreateManyInput | ItemOSCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemOSIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemOS update
   */
  export type ItemOSUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemOS
     */
    select?: ItemOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemOS
     */
    omit?: ItemOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemOSInclude<ExtArgs> | null
    /**
     * The data needed to update a ItemOS.
     */
    data: XOR<ItemOSUpdateInput, ItemOSUncheckedUpdateInput>
    /**
     * Choose, which ItemOS to update.
     */
    where: ItemOSWhereUniqueInput
  }

  /**
   * ItemOS updateMany
   */
  export type ItemOSUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItemOS.
     */
    data: XOR<ItemOSUpdateManyMutationInput, ItemOSUncheckedUpdateManyInput>
    /**
     * Filter which ItemOS to update
     */
    where?: ItemOSWhereInput
    /**
     * Limit how many ItemOS to update.
     */
    limit?: number
  }

  /**
   * ItemOS updateManyAndReturn
   */
  export type ItemOSUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemOS
     */
    select?: ItemOSSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemOS
     */
    omit?: ItemOSOmit<ExtArgs> | null
    /**
     * The data used to update ItemOS.
     */
    data: XOR<ItemOSUpdateManyMutationInput, ItemOSUncheckedUpdateManyInput>
    /**
     * Filter which ItemOS to update
     */
    where?: ItemOSWhereInput
    /**
     * Limit how many ItemOS to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemOSIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemOS upsert
   */
  export type ItemOSUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemOS
     */
    select?: ItemOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemOS
     */
    omit?: ItemOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemOSInclude<ExtArgs> | null
    /**
     * The filter to search for the ItemOS to update in case it exists.
     */
    where: ItemOSWhereUniqueInput
    /**
     * In case the ItemOS found by the `where` argument doesn't exist, create a new ItemOS with this data.
     */
    create: XOR<ItemOSCreateInput, ItemOSUncheckedCreateInput>
    /**
     * In case the ItemOS was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemOSUpdateInput, ItemOSUncheckedUpdateInput>
  }

  /**
   * ItemOS delete
   */
  export type ItemOSDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemOS
     */
    select?: ItemOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemOS
     */
    omit?: ItemOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemOSInclude<ExtArgs> | null
    /**
     * Filter which ItemOS to delete.
     */
    where: ItemOSWhereUniqueInput
  }

  /**
   * ItemOS deleteMany
   */
  export type ItemOSDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemOS to delete
     */
    where?: ItemOSWhereInput
    /**
     * Limit how many ItemOS to delete.
     */
    limit?: number
  }

  /**
   * ItemOS without action
   */
  export type ItemOSDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemOS
     */
    select?: ItemOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemOS
     */
    omit?: ItemOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemOSInclude<ExtArgs> | null
  }


  /**
   * Model ItemEstoque
   */

  export type AggregateItemEstoque = {
    _count: ItemEstoqueCountAggregateOutputType | null
    _avg: ItemEstoqueAvgAggregateOutputType | null
    _sum: ItemEstoqueSumAggregateOutputType | null
    _min: ItemEstoqueMinAggregateOutputType | null
    _max: ItemEstoqueMaxAggregateOutputType | null
  }

  export type ItemEstoqueAvgAggregateOutputType = {
    id: number | null
    quantidade: number | null
    minimo: number | null
    valorUnit: number | null
  }

  export type ItemEstoqueSumAggregateOutputType = {
    id: number | null
    quantidade: number | null
    minimo: number | null
    valorUnit: number | null
  }

  export type ItemEstoqueMinAggregateOutputType = {
    id: number | null
    codigo: string | null
    nome: string | null
    descricao: string | null
    categoria: string | null
    quantidade: number | null
    minimo: number | null
    valorUnit: number | null
    fornecedor: string | null
    localizacao: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItemEstoqueMaxAggregateOutputType = {
    id: number | null
    codigo: string | null
    nome: string | null
    descricao: string | null
    categoria: string | null
    quantidade: number | null
    minimo: number | null
    valorUnit: number | null
    fornecedor: string | null
    localizacao: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItemEstoqueCountAggregateOutputType = {
    id: number
    codigo: number
    nome: number
    descricao: number
    categoria: number
    quantidade: number
    minimo: number
    valorUnit: number
    fornecedor: number
    localizacao: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ItemEstoqueAvgAggregateInputType = {
    id?: true
    quantidade?: true
    minimo?: true
    valorUnit?: true
  }

  export type ItemEstoqueSumAggregateInputType = {
    id?: true
    quantidade?: true
    minimo?: true
    valorUnit?: true
  }

  export type ItemEstoqueMinAggregateInputType = {
    id?: true
    codigo?: true
    nome?: true
    descricao?: true
    categoria?: true
    quantidade?: true
    minimo?: true
    valorUnit?: true
    fornecedor?: true
    localizacao?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItemEstoqueMaxAggregateInputType = {
    id?: true
    codigo?: true
    nome?: true
    descricao?: true
    categoria?: true
    quantidade?: true
    minimo?: true
    valorUnit?: true
    fornecedor?: true
    localizacao?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItemEstoqueCountAggregateInputType = {
    id?: true
    codigo?: true
    nome?: true
    descricao?: true
    categoria?: true
    quantidade?: true
    minimo?: true
    valorUnit?: true
    fornecedor?: true
    localizacao?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ItemEstoqueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemEstoque to aggregate.
     */
    where?: ItemEstoqueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemEstoques to fetch.
     */
    orderBy?: ItemEstoqueOrderByWithRelationInput | ItemEstoqueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemEstoqueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemEstoques from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemEstoques.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItemEstoques
    **/
    _count?: true | ItemEstoqueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemEstoqueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemEstoqueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemEstoqueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemEstoqueMaxAggregateInputType
  }

  export type GetItemEstoqueAggregateType<T extends ItemEstoqueAggregateArgs> = {
        [P in keyof T & keyof AggregateItemEstoque]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemEstoque[P]>
      : GetScalarType<T[P], AggregateItemEstoque[P]>
  }




  export type ItemEstoqueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemEstoqueWhereInput
    orderBy?: ItemEstoqueOrderByWithAggregationInput | ItemEstoqueOrderByWithAggregationInput[]
    by: ItemEstoqueScalarFieldEnum[] | ItemEstoqueScalarFieldEnum
    having?: ItemEstoqueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemEstoqueCountAggregateInputType | true
    _avg?: ItemEstoqueAvgAggregateInputType
    _sum?: ItemEstoqueSumAggregateInputType
    _min?: ItemEstoqueMinAggregateInputType
    _max?: ItemEstoqueMaxAggregateInputType
  }

  export type ItemEstoqueGroupByOutputType = {
    id: number
    codigo: string | null
    nome: string
    descricao: string | null
    categoria: string | null
    quantidade: number
    minimo: number
    valorUnit: number | null
    fornecedor: string | null
    localizacao: string | null
    createdAt: Date
    updatedAt: Date
    _count: ItemEstoqueCountAggregateOutputType | null
    _avg: ItemEstoqueAvgAggregateOutputType | null
    _sum: ItemEstoqueSumAggregateOutputType | null
    _min: ItemEstoqueMinAggregateOutputType | null
    _max: ItemEstoqueMaxAggregateOutputType | null
  }

  type GetItemEstoqueGroupByPayload<T extends ItemEstoqueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemEstoqueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemEstoqueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemEstoqueGroupByOutputType[P]>
            : GetScalarType<T[P], ItemEstoqueGroupByOutputType[P]>
        }
      >
    >


  export type ItemEstoqueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigo?: boolean
    nome?: boolean
    descricao?: boolean
    categoria?: boolean
    quantidade?: boolean
    minimo?: boolean
    valorUnit?: boolean
    fornecedor?: boolean
    localizacao?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    itensOS?: boolean | ItemEstoque$itensOSArgs<ExtArgs>
    _count?: boolean | ItemEstoqueCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemEstoque"]>

  export type ItemEstoqueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigo?: boolean
    nome?: boolean
    descricao?: boolean
    categoria?: boolean
    quantidade?: boolean
    minimo?: boolean
    valorUnit?: boolean
    fornecedor?: boolean
    localizacao?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["itemEstoque"]>

  export type ItemEstoqueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigo?: boolean
    nome?: boolean
    descricao?: boolean
    categoria?: boolean
    quantidade?: boolean
    minimo?: boolean
    valorUnit?: boolean
    fornecedor?: boolean
    localizacao?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["itemEstoque"]>

  export type ItemEstoqueSelectScalar = {
    id?: boolean
    codigo?: boolean
    nome?: boolean
    descricao?: boolean
    categoria?: boolean
    quantidade?: boolean
    minimo?: boolean
    valorUnit?: boolean
    fornecedor?: boolean
    localizacao?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ItemEstoqueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "codigo" | "nome" | "descricao" | "categoria" | "quantidade" | "minimo" | "valorUnit" | "fornecedor" | "localizacao" | "createdAt" | "updatedAt", ExtArgs["result"]["itemEstoque"]>
  export type ItemEstoqueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itensOS?: boolean | ItemEstoque$itensOSArgs<ExtArgs>
    _count?: boolean | ItemEstoqueCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ItemEstoqueIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ItemEstoqueIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ItemEstoquePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItemEstoque"
    objects: {
      itensOS: Prisma.$ItemOSPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      codigo: string | null
      nome: string
      descricao: string | null
      categoria: string | null
      quantidade: number
      minimo: number
      valorUnit: number | null
      fornecedor: string | null
      localizacao: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["itemEstoque"]>
    composites: {}
  }

  type ItemEstoqueGetPayload<S extends boolean | null | undefined | ItemEstoqueDefaultArgs> = $Result.GetResult<Prisma.$ItemEstoquePayload, S>

  type ItemEstoqueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemEstoqueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemEstoqueCountAggregateInputType | true
    }

  export interface ItemEstoqueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItemEstoque'], meta: { name: 'ItemEstoque' } }
    /**
     * Find zero or one ItemEstoque that matches the filter.
     * @param {ItemEstoqueFindUniqueArgs} args - Arguments to find a ItemEstoque
     * @example
     * // Get one ItemEstoque
     * const itemEstoque = await prisma.itemEstoque.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemEstoqueFindUniqueArgs>(args: SelectSubset<T, ItemEstoqueFindUniqueArgs<ExtArgs>>): Prisma__ItemEstoqueClient<$Result.GetResult<Prisma.$ItemEstoquePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItemEstoque that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemEstoqueFindUniqueOrThrowArgs} args - Arguments to find a ItemEstoque
     * @example
     * // Get one ItemEstoque
     * const itemEstoque = await prisma.itemEstoque.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemEstoqueFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemEstoqueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemEstoqueClient<$Result.GetResult<Prisma.$ItemEstoquePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemEstoque that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemEstoqueFindFirstArgs} args - Arguments to find a ItemEstoque
     * @example
     * // Get one ItemEstoque
     * const itemEstoque = await prisma.itemEstoque.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemEstoqueFindFirstArgs>(args?: SelectSubset<T, ItemEstoqueFindFirstArgs<ExtArgs>>): Prisma__ItemEstoqueClient<$Result.GetResult<Prisma.$ItemEstoquePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemEstoque that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemEstoqueFindFirstOrThrowArgs} args - Arguments to find a ItemEstoque
     * @example
     * // Get one ItemEstoque
     * const itemEstoque = await prisma.itemEstoque.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemEstoqueFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemEstoqueFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemEstoqueClient<$Result.GetResult<Prisma.$ItemEstoquePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItemEstoques that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemEstoqueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemEstoques
     * const itemEstoques = await prisma.itemEstoque.findMany()
     * 
     * // Get first 10 ItemEstoques
     * const itemEstoques = await prisma.itemEstoque.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemEstoqueWithIdOnly = await prisma.itemEstoque.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemEstoqueFindManyArgs>(args?: SelectSubset<T, ItemEstoqueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemEstoquePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItemEstoque.
     * @param {ItemEstoqueCreateArgs} args - Arguments to create a ItemEstoque.
     * @example
     * // Create one ItemEstoque
     * const ItemEstoque = await prisma.itemEstoque.create({
     *   data: {
     *     // ... data to create a ItemEstoque
     *   }
     * })
     * 
     */
    create<T extends ItemEstoqueCreateArgs>(args: SelectSubset<T, ItemEstoqueCreateArgs<ExtArgs>>): Prisma__ItemEstoqueClient<$Result.GetResult<Prisma.$ItemEstoquePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItemEstoques.
     * @param {ItemEstoqueCreateManyArgs} args - Arguments to create many ItemEstoques.
     * @example
     * // Create many ItemEstoques
     * const itemEstoque = await prisma.itemEstoque.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemEstoqueCreateManyArgs>(args?: SelectSubset<T, ItemEstoqueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItemEstoques and returns the data saved in the database.
     * @param {ItemEstoqueCreateManyAndReturnArgs} args - Arguments to create many ItemEstoques.
     * @example
     * // Create many ItemEstoques
     * const itemEstoque = await prisma.itemEstoque.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItemEstoques and only return the `id`
     * const itemEstoqueWithIdOnly = await prisma.itemEstoque.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemEstoqueCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemEstoqueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemEstoquePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ItemEstoque.
     * @param {ItemEstoqueDeleteArgs} args - Arguments to delete one ItemEstoque.
     * @example
     * // Delete one ItemEstoque
     * const ItemEstoque = await prisma.itemEstoque.delete({
     *   where: {
     *     // ... filter to delete one ItemEstoque
     *   }
     * })
     * 
     */
    delete<T extends ItemEstoqueDeleteArgs>(args: SelectSubset<T, ItemEstoqueDeleteArgs<ExtArgs>>): Prisma__ItemEstoqueClient<$Result.GetResult<Prisma.$ItemEstoquePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItemEstoque.
     * @param {ItemEstoqueUpdateArgs} args - Arguments to update one ItemEstoque.
     * @example
     * // Update one ItemEstoque
     * const itemEstoque = await prisma.itemEstoque.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemEstoqueUpdateArgs>(args: SelectSubset<T, ItemEstoqueUpdateArgs<ExtArgs>>): Prisma__ItemEstoqueClient<$Result.GetResult<Prisma.$ItemEstoquePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItemEstoques.
     * @param {ItemEstoqueDeleteManyArgs} args - Arguments to filter ItemEstoques to delete.
     * @example
     * // Delete a few ItemEstoques
     * const { count } = await prisma.itemEstoque.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemEstoqueDeleteManyArgs>(args?: SelectSubset<T, ItemEstoqueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemEstoques.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemEstoqueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemEstoques
     * const itemEstoque = await prisma.itemEstoque.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemEstoqueUpdateManyArgs>(args: SelectSubset<T, ItemEstoqueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemEstoques and returns the data updated in the database.
     * @param {ItemEstoqueUpdateManyAndReturnArgs} args - Arguments to update many ItemEstoques.
     * @example
     * // Update many ItemEstoques
     * const itemEstoque = await prisma.itemEstoque.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ItemEstoques and only return the `id`
     * const itemEstoqueWithIdOnly = await prisma.itemEstoque.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ItemEstoqueUpdateManyAndReturnArgs>(args: SelectSubset<T, ItemEstoqueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemEstoquePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ItemEstoque.
     * @param {ItemEstoqueUpsertArgs} args - Arguments to update or create a ItemEstoque.
     * @example
     * // Update or create a ItemEstoque
     * const itemEstoque = await prisma.itemEstoque.upsert({
     *   create: {
     *     // ... data to create a ItemEstoque
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemEstoque we want to update
     *   }
     * })
     */
    upsert<T extends ItemEstoqueUpsertArgs>(args: SelectSubset<T, ItemEstoqueUpsertArgs<ExtArgs>>): Prisma__ItemEstoqueClient<$Result.GetResult<Prisma.$ItemEstoquePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItemEstoques.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemEstoqueCountArgs} args - Arguments to filter ItemEstoques to count.
     * @example
     * // Count the number of ItemEstoques
     * const count = await prisma.itemEstoque.count({
     *   where: {
     *     // ... the filter for the ItemEstoques we want to count
     *   }
     * })
    **/
    count<T extends ItemEstoqueCountArgs>(
      args?: Subset<T, ItemEstoqueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemEstoqueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItemEstoque.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemEstoqueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemEstoqueAggregateArgs>(args: Subset<T, ItemEstoqueAggregateArgs>): Prisma.PrismaPromise<GetItemEstoqueAggregateType<T>>

    /**
     * Group by ItemEstoque.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemEstoqueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemEstoqueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemEstoqueGroupByArgs['orderBy'] }
        : { orderBy?: ItemEstoqueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemEstoqueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemEstoqueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItemEstoque model
   */
  readonly fields: ItemEstoqueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemEstoque.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemEstoqueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    itensOS<T extends ItemEstoque$itensOSArgs<ExtArgs> = {}>(args?: Subset<T, ItemEstoque$itensOSArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemOSPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItemEstoque model
   */
  interface ItemEstoqueFieldRefs {
    readonly id: FieldRef<"ItemEstoque", 'Int'>
    readonly codigo: FieldRef<"ItemEstoque", 'String'>
    readonly nome: FieldRef<"ItemEstoque", 'String'>
    readonly descricao: FieldRef<"ItemEstoque", 'String'>
    readonly categoria: FieldRef<"ItemEstoque", 'String'>
    readonly quantidade: FieldRef<"ItemEstoque", 'Int'>
    readonly minimo: FieldRef<"ItemEstoque", 'Int'>
    readonly valorUnit: FieldRef<"ItemEstoque", 'Float'>
    readonly fornecedor: FieldRef<"ItemEstoque", 'String'>
    readonly localizacao: FieldRef<"ItemEstoque", 'String'>
    readonly createdAt: FieldRef<"ItemEstoque", 'DateTime'>
    readonly updatedAt: FieldRef<"ItemEstoque", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ItemEstoque findUnique
   */
  export type ItemEstoqueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEstoque
     */
    select?: ItemEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEstoque
     */
    omit?: ItemEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEstoqueInclude<ExtArgs> | null
    /**
     * Filter, which ItemEstoque to fetch.
     */
    where: ItemEstoqueWhereUniqueInput
  }

  /**
   * ItemEstoque findUniqueOrThrow
   */
  export type ItemEstoqueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEstoque
     */
    select?: ItemEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEstoque
     */
    omit?: ItemEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEstoqueInclude<ExtArgs> | null
    /**
     * Filter, which ItemEstoque to fetch.
     */
    where: ItemEstoqueWhereUniqueInput
  }

  /**
   * ItemEstoque findFirst
   */
  export type ItemEstoqueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEstoque
     */
    select?: ItemEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEstoque
     */
    omit?: ItemEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEstoqueInclude<ExtArgs> | null
    /**
     * Filter, which ItemEstoque to fetch.
     */
    where?: ItemEstoqueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemEstoques to fetch.
     */
    orderBy?: ItemEstoqueOrderByWithRelationInput | ItemEstoqueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemEstoques.
     */
    cursor?: ItemEstoqueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemEstoques from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemEstoques.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemEstoques.
     */
    distinct?: ItemEstoqueScalarFieldEnum | ItemEstoqueScalarFieldEnum[]
  }

  /**
   * ItemEstoque findFirstOrThrow
   */
  export type ItemEstoqueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEstoque
     */
    select?: ItemEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEstoque
     */
    omit?: ItemEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEstoqueInclude<ExtArgs> | null
    /**
     * Filter, which ItemEstoque to fetch.
     */
    where?: ItemEstoqueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemEstoques to fetch.
     */
    orderBy?: ItemEstoqueOrderByWithRelationInput | ItemEstoqueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemEstoques.
     */
    cursor?: ItemEstoqueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemEstoques from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemEstoques.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemEstoques.
     */
    distinct?: ItemEstoqueScalarFieldEnum | ItemEstoqueScalarFieldEnum[]
  }

  /**
   * ItemEstoque findMany
   */
  export type ItemEstoqueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEstoque
     */
    select?: ItemEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEstoque
     */
    omit?: ItemEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEstoqueInclude<ExtArgs> | null
    /**
     * Filter, which ItemEstoques to fetch.
     */
    where?: ItemEstoqueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemEstoques to fetch.
     */
    orderBy?: ItemEstoqueOrderByWithRelationInput | ItemEstoqueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItemEstoques.
     */
    cursor?: ItemEstoqueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemEstoques from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemEstoques.
     */
    skip?: number
    distinct?: ItemEstoqueScalarFieldEnum | ItemEstoqueScalarFieldEnum[]
  }

  /**
   * ItemEstoque create
   */
  export type ItemEstoqueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEstoque
     */
    select?: ItemEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEstoque
     */
    omit?: ItemEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEstoqueInclude<ExtArgs> | null
    /**
     * The data needed to create a ItemEstoque.
     */
    data: XOR<ItemEstoqueCreateInput, ItemEstoqueUncheckedCreateInput>
  }

  /**
   * ItemEstoque createMany
   */
  export type ItemEstoqueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItemEstoques.
     */
    data: ItemEstoqueCreateManyInput | ItemEstoqueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItemEstoque createManyAndReturn
   */
  export type ItemEstoqueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEstoque
     */
    select?: ItemEstoqueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEstoque
     */
    omit?: ItemEstoqueOmit<ExtArgs> | null
    /**
     * The data used to create many ItemEstoques.
     */
    data: ItemEstoqueCreateManyInput | ItemEstoqueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItemEstoque update
   */
  export type ItemEstoqueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEstoque
     */
    select?: ItemEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEstoque
     */
    omit?: ItemEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEstoqueInclude<ExtArgs> | null
    /**
     * The data needed to update a ItemEstoque.
     */
    data: XOR<ItemEstoqueUpdateInput, ItemEstoqueUncheckedUpdateInput>
    /**
     * Choose, which ItemEstoque to update.
     */
    where: ItemEstoqueWhereUniqueInput
  }

  /**
   * ItemEstoque updateMany
   */
  export type ItemEstoqueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItemEstoques.
     */
    data: XOR<ItemEstoqueUpdateManyMutationInput, ItemEstoqueUncheckedUpdateManyInput>
    /**
     * Filter which ItemEstoques to update
     */
    where?: ItemEstoqueWhereInput
    /**
     * Limit how many ItemEstoques to update.
     */
    limit?: number
  }

  /**
   * ItemEstoque updateManyAndReturn
   */
  export type ItemEstoqueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEstoque
     */
    select?: ItemEstoqueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEstoque
     */
    omit?: ItemEstoqueOmit<ExtArgs> | null
    /**
     * The data used to update ItemEstoques.
     */
    data: XOR<ItemEstoqueUpdateManyMutationInput, ItemEstoqueUncheckedUpdateManyInput>
    /**
     * Filter which ItemEstoques to update
     */
    where?: ItemEstoqueWhereInput
    /**
     * Limit how many ItemEstoques to update.
     */
    limit?: number
  }

  /**
   * ItemEstoque upsert
   */
  export type ItemEstoqueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEstoque
     */
    select?: ItemEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEstoque
     */
    omit?: ItemEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEstoqueInclude<ExtArgs> | null
    /**
     * The filter to search for the ItemEstoque to update in case it exists.
     */
    where: ItemEstoqueWhereUniqueInput
    /**
     * In case the ItemEstoque found by the `where` argument doesn't exist, create a new ItemEstoque with this data.
     */
    create: XOR<ItemEstoqueCreateInput, ItemEstoqueUncheckedCreateInput>
    /**
     * In case the ItemEstoque was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemEstoqueUpdateInput, ItemEstoqueUncheckedUpdateInput>
  }

  /**
   * ItemEstoque delete
   */
  export type ItemEstoqueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEstoque
     */
    select?: ItemEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEstoque
     */
    omit?: ItemEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEstoqueInclude<ExtArgs> | null
    /**
     * Filter which ItemEstoque to delete.
     */
    where: ItemEstoqueWhereUniqueInput
  }

  /**
   * ItemEstoque deleteMany
   */
  export type ItemEstoqueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemEstoques to delete
     */
    where?: ItemEstoqueWhereInput
    /**
     * Limit how many ItemEstoques to delete.
     */
    limit?: number
  }

  /**
   * ItemEstoque.itensOS
   */
  export type ItemEstoque$itensOSArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemOS
     */
    select?: ItemOSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemOS
     */
    omit?: ItemOSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemOSInclude<ExtArgs> | null
    where?: ItemOSWhereInput
    orderBy?: ItemOSOrderByWithRelationInput | ItemOSOrderByWithRelationInput[]
    cursor?: ItemOSWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemOSScalarFieldEnum | ItemOSScalarFieldEnum[]
  }

  /**
   * ItemEstoque without action
   */
  export type ItemEstoqueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEstoque
     */
    select?: ItemEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEstoque
     */
    omit?: ItemEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEstoqueInclude<ExtArgs> | null
  }


  /**
   * Model Locacao
   */

  export type AggregateLocacao = {
    _count: LocacaoCountAggregateOutputType | null
    _avg: LocacaoAvgAggregateOutputType | null
    _sum: LocacaoSumAggregateOutputType | null
    _min: LocacaoMinAggregateOutputType | null
    _max: LocacaoMaxAggregateOutputType | null
  }

  export type LocacaoAvgAggregateOutputType = {
    id: number | null
    valorMensal: number | null
    valorTotal: number | null
  }

  export type LocacaoSumAggregateOutputType = {
    id: number | null
    valorMensal: number | null
    valorTotal: number | null
  }

  export type LocacaoMinAggregateOutputType = {
    id: number | null
    equipamento: string | null
    descricao: string | null
    cliente: string | null
    dataInicio: Date | null
    dataFim: Date | null
    valorMensal: number | null
    valorTotal: number | null
    status: string | null
    observacoes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LocacaoMaxAggregateOutputType = {
    id: number | null
    equipamento: string | null
    descricao: string | null
    cliente: string | null
    dataInicio: Date | null
    dataFim: Date | null
    valorMensal: number | null
    valorTotal: number | null
    status: string | null
    observacoes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LocacaoCountAggregateOutputType = {
    id: number
    equipamento: number
    descricao: number
    cliente: number
    dataInicio: number
    dataFim: number
    valorMensal: number
    valorTotal: number
    status: number
    observacoes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LocacaoAvgAggregateInputType = {
    id?: true
    valorMensal?: true
    valorTotal?: true
  }

  export type LocacaoSumAggregateInputType = {
    id?: true
    valorMensal?: true
    valorTotal?: true
  }

  export type LocacaoMinAggregateInputType = {
    id?: true
    equipamento?: true
    descricao?: true
    cliente?: true
    dataInicio?: true
    dataFim?: true
    valorMensal?: true
    valorTotal?: true
    status?: true
    observacoes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LocacaoMaxAggregateInputType = {
    id?: true
    equipamento?: true
    descricao?: true
    cliente?: true
    dataInicio?: true
    dataFim?: true
    valorMensal?: true
    valorTotal?: true
    status?: true
    observacoes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LocacaoCountAggregateInputType = {
    id?: true
    equipamento?: true
    descricao?: true
    cliente?: true
    dataInicio?: true
    dataFim?: true
    valorMensal?: true
    valorTotal?: true
    status?: true
    observacoes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LocacaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locacao to aggregate.
     */
    where?: LocacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locacaos to fetch.
     */
    orderBy?: LocacaoOrderByWithRelationInput | LocacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locacaos
    **/
    _count?: true | LocacaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocacaoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocacaoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocacaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocacaoMaxAggregateInputType
  }

  export type GetLocacaoAggregateType<T extends LocacaoAggregateArgs> = {
        [P in keyof T & keyof AggregateLocacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocacao[P]>
      : GetScalarType<T[P], AggregateLocacao[P]>
  }




  export type LocacaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocacaoWhereInput
    orderBy?: LocacaoOrderByWithAggregationInput | LocacaoOrderByWithAggregationInput[]
    by: LocacaoScalarFieldEnum[] | LocacaoScalarFieldEnum
    having?: LocacaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocacaoCountAggregateInputType | true
    _avg?: LocacaoAvgAggregateInputType
    _sum?: LocacaoSumAggregateInputType
    _min?: LocacaoMinAggregateInputType
    _max?: LocacaoMaxAggregateInputType
  }

  export type LocacaoGroupByOutputType = {
    id: number
    equipamento: string
    descricao: string | null
    cliente: string | null
    dataInicio: Date
    dataFim: Date
    valorMensal: number
    valorTotal: number | null
    status: string
    observacoes: string | null
    createdAt: Date
    updatedAt: Date
    _count: LocacaoCountAggregateOutputType | null
    _avg: LocacaoAvgAggregateOutputType | null
    _sum: LocacaoSumAggregateOutputType | null
    _min: LocacaoMinAggregateOutputType | null
    _max: LocacaoMaxAggregateOutputType | null
  }

  type GetLocacaoGroupByPayload<T extends LocacaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocacaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocacaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocacaoGroupByOutputType[P]>
            : GetScalarType<T[P], LocacaoGroupByOutputType[P]>
        }
      >
    >


  export type LocacaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    equipamento?: boolean
    descricao?: boolean
    cliente?: boolean
    dataInicio?: boolean
    dataFim?: boolean
    valorMensal?: boolean
    valorTotal?: boolean
    status?: boolean
    observacoes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["locacao"]>

  export type LocacaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    equipamento?: boolean
    descricao?: boolean
    cliente?: boolean
    dataInicio?: boolean
    dataFim?: boolean
    valorMensal?: boolean
    valorTotal?: boolean
    status?: boolean
    observacoes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["locacao"]>

  export type LocacaoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    equipamento?: boolean
    descricao?: boolean
    cliente?: boolean
    dataInicio?: boolean
    dataFim?: boolean
    valorMensal?: boolean
    valorTotal?: boolean
    status?: boolean
    observacoes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["locacao"]>

  export type LocacaoSelectScalar = {
    id?: boolean
    equipamento?: boolean
    descricao?: boolean
    cliente?: boolean
    dataInicio?: boolean
    dataFim?: boolean
    valorMensal?: boolean
    valorTotal?: boolean
    status?: boolean
    observacoes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LocacaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "equipamento" | "descricao" | "cliente" | "dataInicio" | "dataFim" | "valorMensal" | "valorTotal" | "status" | "observacoes" | "createdAt" | "updatedAt", ExtArgs["result"]["locacao"]>

  export type $LocacaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Locacao"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      equipamento: string
      descricao: string | null
      cliente: string | null
      dataInicio: Date
      dataFim: Date
      valorMensal: number
      valorTotal: number | null
      status: string
      observacoes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["locacao"]>
    composites: {}
  }

  type LocacaoGetPayload<S extends boolean | null | undefined | LocacaoDefaultArgs> = $Result.GetResult<Prisma.$LocacaoPayload, S>

  type LocacaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocacaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocacaoCountAggregateInputType | true
    }

  export interface LocacaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Locacao'], meta: { name: 'Locacao' } }
    /**
     * Find zero or one Locacao that matches the filter.
     * @param {LocacaoFindUniqueArgs} args - Arguments to find a Locacao
     * @example
     * // Get one Locacao
     * const locacao = await prisma.locacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocacaoFindUniqueArgs>(args: SelectSubset<T, LocacaoFindUniqueArgs<ExtArgs>>): Prisma__LocacaoClient<$Result.GetResult<Prisma.$LocacaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Locacao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocacaoFindUniqueOrThrowArgs} args - Arguments to find a Locacao
     * @example
     * // Get one Locacao
     * const locacao = await prisma.locacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocacaoFindUniqueOrThrowArgs>(args: SelectSubset<T, LocacaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocacaoClient<$Result.GetResult<Prisma.$LocacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Locacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocacaoFindFirstArgs} args - Arguments to find a Locacao
     * @example
     * // Get one Locacao
     * const locacao = await prisma.locacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocacaoFindFirstArgs>(args?: SelectSubset<T, LocacaoFindFirstArgs<ExtArgs>>): Prisma__LocacaoClient<$Result.GetResult<Prisma.$LocacaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Locacao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocacaoFindFirstOrThrowArgs} args - Arguments to find a Locacao
     * @example
     * // Get one Locacao
     * const locacao = await prisma.locacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocacaoFindFirstOrThrowArgs>(args?: SelectSubset<T, LocacaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocacaoClient<$Result.GetResult<Prisma.$LocacaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocacaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locacaos
     * const locacaos = await prisma.locacao.findMany()
     * 
     * // Get first 10 Locacaos
     * const locacaos = await prisma.locacao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locacaoWithIdOnly = await prisma.locacao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocacaoFindManyArgs>(args?: SelectSubset<T, LocacaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Locacao.
     * @param {LocacaoCreateArgs} args - Arguments to create a Locacao.
     * @example
     * // Create one Locacao
     * const Locacao = await prisma.locacao.create({
     *   data: {
     *     // ... data to create a Locacao
     *   }
     * })
     * 
     */
    create<T extends LocacaoCreateArgs>(args: SelectSubset<T, LocacaoCreateArgs<ExtArgs>>): Prisma__LocacaoClient<$Result.GetResult<Prisma.$LocacaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Locacaos.
     * @param {LocacaoCreateManyArgs} args - Arguments to create many Locacaos.
     * @example
     * // Create many Locacaos
     * const locacao = await prisma.locacao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocacaoCreateManyArgs>(args?: SelectSubset<T, LocacaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Locacaos and returns the data saved in the database.
     * @param {LocacaoCreateManyAndReturnArgs} args - Arguments to create many Locacaos.
     * @example
     * // Create many Locacaos
     * const locacao = await prisma.locacao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Locacaos and only return the `id`
     * const locacaoWithIdOnly = await prisma.locacao.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocacaoCreateManyAndReturnArgs>(args?: SelectSubset<T, LocacaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocacaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Locacao.
     * @param {LocacaoDeleteArgs} args - Arguments to delete one Locacao.
     * @example
     * // Delete one Locacao
     * const Locacao = await prisma.locacao.delete({
     *   where: {
     *     // ... filter to delete one Locacao
     *   }
     * })
     * 
     */
    delete<T extends LocacaoDeleteArgs>(args: SelectSubset<T, LocacaoDeleteArgs<ExtArgs>>): Prisma__LocacaoClient<$Result.GetResult<Prisma.$LocacaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Locacao.
     * @param {LocacaoUpdateArgs} args - Arguments to update one Locacao.
     * @example
     * // Update one Locacao
     * const locacao = await prisma.locacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocacaoUpdateArgs>(args: SelectSubset<T, LocacaoUpdateArgs<ExtArgs>>): Prisma__LocacaoClient<$Result.GetResult<Prisma.$LocacaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locacaos.
     * @param {LocacaoDeleteManyArgs} args - Arguments to filter Locacaos to delete.
     * @example
     * // Delete a few Locacaos
     * const { count } = await prisma.locacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocacaoDeleteManyArgs>(args?: SelectSubset<T, LocacaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locacaos
     * const locacao = await prisma.locacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocacaoUpdateManyArgs>(args: SelectSubset<T, LocacaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locacaos and returns the data updated in the database.
     * @param {LocacaoUpdateManyAndReturnArgs} args - Arguments to update many Locacaos.
     * @example
     * // Update many Locacaos
     * const locacao = await prisma.locacao.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Locacaos and only return the `id`
     * const locacaoWithIdOnly = await prisma.locacao.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LocacaoUpdateManyAndReturnArgs>(args: SelectSubset<T, LocacaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocacaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Locacao.
     * @param {LocacaoUpsertArgs} args - Arguments to update or create a Locacao.
     * @example
     * // Update or create a Locacao
     * const locacao = await prisma.locacao.upsert({
     *   create: {
     *     // ... data to create a Locacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Locacao we want to update
     *   }
     * })
     */
    upsert<T extends LocacaoUpsertArgs>(args: SelectSubset<T, LocacaoUpsertArgs<ExtArgs>>): Prisma__LocacaoClient<$Result.GetResult<Prisma.$LocacaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Locacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocacaoCountArgs} args - Arguments to filter Locacaos to count.
     * @example
     * // Count the number of Locacaos
     * const count = await prisma.locacao.count({
     *   where: {
     *     // ... the filter for the Locacaos we want to count
     *   }
     * })
    **/
    count<T extends LocacaoCountArgs>(
      args?: Subset<T, LocacaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocacaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Locacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocacaoAggregateArgs>(args: Subset<T, LocacaoAggregateArgs>): Prisma.PrismaPromise<GetLocacaoAggregateType<T>>

    /**
     * Group by Locacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocacaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocacaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocacaoGroupByArgs['orderBy'] }
        : { orderBy?: LocacaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocacaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocacaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Locacao model
   */
  readonly fields: LocacaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Locacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocacaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Locacao model
   */
  interface LocacaoFieldRefs {
    readonly id: FieldRef<"Locacao", 'Int'>
    readonly equipamento: FieldRef<"Locacao", 'String'>
    readonly descricao: FieldRef<"Locacao", 'String'>
    readonly cliente: FieldRef<"Locacao", 'String'>
    readonly dataInicio: FieldRef<"Locacao", 'DateTime'>
    readonly dataFim: FieldRef<"Locacao", 'DateTime'>
    readonly valorMensal: FieldRef<"Locacao", 'Float'>
    readonly valorTotal: FieldRef<"Locacao", 'Float'>
    readonly status: FieldRef<"Locacao", 'String'>
    readonly observacoes: FieldRef<"Locacao", 'String'>
    readonly createdAt: FieldRef<"Locacao", 'DateTime'>
    readonly updatedAt: FieldRef<"Locacao", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Locacao findUnique
   */
  export type LocacaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locacao
     */
    select?: LocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locacao
     */
    omit?: LocacaoOmit<ExtArgs> | null
    /**
     * Filter, which Locacao to fetch.
     */
    where: LocacaoWhereUniqueInput
  }

  /**
   * Locacao findUniqueOrThrow
   */
  export type LocacaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locacao
     */
    select?: LocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locacao
     */
    omit?: LocacaoOmit<ExtArgs> | null
    /**
     * Filter, which Locacao to fetch.
     */
    where: LocacaoWhereUniqueInput
  }

  /**
   * Locacao findFirst
   */
  export type LocacaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locacao
     */
    select?: LocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locacao
     */
    omit?: LocacaoOmit<ExtArgs> | null
    /**
     * Filter, which Locacao to fetch.
     */
    where?: LocacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locacaos to fetch.
     */
    orderBy?: LocacaoOrderByWithRelationInput | LocacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locacaos.
     */
    cursor?: LocacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locacaos.
     */
    distinct?: LocacaoScalarFieldEnum | LocacaoScalarFieldEnum[]
  }

  /**
   * Locacao findFirstOrThrow
   */
  export type LocacaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locacao
     */
    select?: LocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locacao
     */
    omit?: LocacaoOmit<ExtArgs> | null
    /**
     * Filter, which Locacao to fetch.
     */
    where?: LocacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locacaos to fetch.
     */
    orderBy?: LocacaoOrderByWithRelationInput | LocacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locacaos.
     */
    cursor?: LocacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locacaos.
     */
    distinct?: LocacaoScalarFieldEnum | LocacaoScalarFieldEnum[]
  }

  /**
   * Locacao findMany
   */
  export type LocacaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locacao
     */
    select?: LocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locacao
     */
    omit?: LocacaoOmit<ExtArgs> | null
    /**
     * Filter, which Locacaos to fetch.
     */
    where?: LocacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locacaos to fetch.
     */
    orderBy?: LocacaoOrderByWithRelationInput | LocacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locacaos.
     */
    cursor?: LocacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locacaos.
     */
    skip?: number
    distinct?: LocacaoScalarFieldEnum | LocacaoScalarFieldEnum[]
  }

  /**
   * Locacao create
   */
  export type LocacaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locacao
     */
    select?: LocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locacao
     */
    omit?: LocacaoOmit<ExtArgs> | null
    /**
     * The data needed to create a Locacao.
     */
    data: XOR<LocacaoCreateInput, LocacaoUncheckedCreateInput>
  }

  /**
   * Locacao createMany
   */
  export type LocacaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locacaos.
     */
    data: LocacaoCreateManyInput | LocacaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Locacao createManyAndReturn
   */
  export type LocacaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locacao
     */
    select?: LocacaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Locacao
     */
    omit?: LocacaoOmit<ExtArgs> | null
    /**
     * The data used to create many Locacaos.
     */
    data: LocacaoCreateManyInput | LocacaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Locacao update
   */
  export type LocacaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locacao
     */
    select?: LocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locacao
     */
    omit?: LocacaoOmit<ExtArgs> | null
    /**
     * The data needed to update a Locacao.
     */
    data: XOR<LocacaoUpdateInput, LocacaoUncheckedUpdateInput>
    /**
     * Choose, which Locacao to update.
     */
    where: LocacaoWhereUniqueInput
  }

  /**
   * Locacao updateMany
   */
  export type LocacaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locacaos.
     */
    data: XOR<LocacaoUpdateManyMutationInput, LocacaoUncheckedUpdateManyInput>
    /**
     * Filter which Locacaos to update
     */
    where?: LocacaoWhereInput
    /**
     * Limit how many Locacaos to update.
     */
    limit?: number
  }

  /**
   * Locacao updateManyAndReturn
   */
  export type LocacaoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locacao
     */
    select?: LocacaoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Locacao
     */
    omit?: LocacaoOmit<ExtArgs> | null
    /**
     * The data used to update Locacaos.
     */
    data: XOR<LocacaoUpdateManyMutationInput, LocacaoUncheckedUpdateManyInput>
    /**
     * Filter which Locacaos to update
     */
    where?: LocacaoWhereInput
    /**
     * Limit how many Locacaos to update.
     */
    limit?: number
  }

  /**
   * Locacao upsert
   */
  export type LocacaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locacao
     */
    select?: LocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locacao
     */
    omit?: LocacaoOmit<ExtArgs> | null
    /**
     * The filter to search for the Locacao to update in case it exists.
     */
    where: LocacaoWhereUniqueInput
    /**
     * In case the Locacao found by the `where` argument doesn't exist, create a new Locacao with this data.
     */
    create: XOR<LocacaoCreateInput, LocacaoUncheckedCreateInput>
    /**
     * In case the Locacao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocacaoUpdateInput, LocacaoUncheckedUpdateInput>
  }

  /**
   * Locacao delete
   */
  export type LocacaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locacao
     */
    select?: LocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locacao
     */
    omit?: LocacaoOmit<ExtArgs> | null
    /**
     * Filter which Locacao to delete.
     */
    where: LocacaoWhereUniqueInput
  }

  /**
   * Locacao deleteMany
   */
  export type LocacaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locacaos to delete
     */
    where?: LocacaoWhereInput
    /**
     * Limit how many Locacaos to delete.
     */
    limit?: number
  }

  /**
   * Locacao without action
   */
  export type LocacaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locacao
     */
    select?: LocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locacao
     */
    omit?: LocacaoOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PedidoScalarFieldEnum: {
    id: 'id',
    cliente: 'cliente',
    descricao: 'descricao',
    status: 'status',
    prioridade: 'prioridade',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PedidoScalarFieldEnum = (typeof PedidoScalarFieldEnum)[keyof typeof PedidoScalarFieldEnum]


  export const PedidoLogScalarFieldEnum: {
    id: 'id',
    pedidoId: 'pedidoId',
    acao: 'acao',
    detalhes: 'detalhes',
    usuario: 'usuario',
    createdAt: 'createdAt'
  };

  export type PedidoLogScalarFieldEnum = (typeof PedidoLogScalarFieldEnum)[keyof typeof PedidoLogScalarFieldEnum]


  export const ChamadoScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo',
    descricao: 'descricao',
    prioridade: 'prioridade',
    status: 'status',
    cliente: 'cliente',
    tecnico: 'tecnico',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChamadoScalarFieldEnum = (typeof ChamadoScalarFieldEnum)[keyof typeof ChamadoScalarFieldEnum]


  export const OrdemServicoScalarFieldEnum: {
    id: 'id',
    numero: 'numero',
    chamadoId: 'chamadoId',
    cliente: 'cliente',
    descricao: 'descricao',
    status: 'status',
    valorMaoObra: 'valorMaoObra',
    observacoes: 'observacoes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrdemServicoScalarFieldEnum = (typeof OrdemServicoScalarFieldEnum)[keyof typeof OrdemServicoScalarFieldEnum]


  export const ItemOSScalarFieldEnum: {
    id: 'id',
    osId: 'osId',
    itemEstoqueId: 'itemEstoqueId',
    quantidade: 'quantidade',
    valorUnitario: 'valorUnitario'
  };

  export type ItemOSScalarFieldEnum = (typeof ItemOSScalarFieldEnum)[keyof typeof ItemOSScalarFieldEnum]


  export const ItemEstoqueScalarFieldEnum: {
    id: 'id',
    codigo: 'codigo',
    nome: 'nome',
    descricao: 'descricao',
    categoria: 'categoria',
    quantidade: 'quantidade',
    minimo: 'minimo',
    valorUnit: 'valorUnit',
    fornecedor: 'fornecedor',
    localizacao: 'localizacao',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ItemEstoqueScalarFieldEnum = (typeof ItemEstoqueScalarFieldEnum)[keyof typeof ItemEstoqueScalarFieldEnum]


  export const LocacaoScalarFieldEnum: {
    id: 'id',
    equipamento: 'equipamento',
    descricao: 'descricao',
    cliente: 'cliente',
    dataInicio: 'dataInicio',
    dataFim: 'dataFim',
    valorMensal: 'valorMensal',
    valorTotal: 'valorTotal',
    status: 'status',
    observacoes: 'observacoes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LocacaoScalarFieldEnum = (typeof LocacaoScalarFieldEnum)[keyof typeof LocacaoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PedidoWhereInput = {
    AND?: PedidoWhereInput | PedidoWhereInput[]
    OR?: PedidoWhereInput[]
    NOT?: PedidoWhereInput | PedidoWhereInput[]
    id?: IntFilter<"Pedido"> | number
    cliente?: StringFilter<"Pedido"> | string
    descricao?: StringFilter<"Pedido"> | string
    status?: StringFilter<"Pedido"> | string
    prioridade?: StringFilter<"Pedido"> | string
    createdAt?: DateTimeFilter<"Pedido"> | Date | string
    updatedAt?: DateTimeFilter<"Pedido"> | Date | string
    logs?: PedidoLogListRelationFilter
  }

  export type PedidoOrderByWithRelationInput = {
    id?: SortOrder
    cliente?: SortOrder
    descricao?: SortOrder
    status?: SortOrder
    prioridade?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    logs?: PedidoLogOrderByRelationAggregateInput
  }

  export type PedidoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PedidoWhereInput | PedidoWhereInput[]
    OR?: PedidoWhereInput[]
    NOT?: PedidoWhereInput | PedidoWhereInput[]
    cliente?: StringFilter<"Pedido"> | string
    descricao?: StringFilter<"Pedido"> | string
    status?: StringFilter<"Pedido"> | string
    prioridade?: StringFilter<"Pedido"> | string
    createdAt?: DateTimeFilter<"Pedido"> | Date | string
    updatedAt?: DateTimeFilter<"Pedido"> | Date | string
    logs?: PedidoLogListRelationFilter
  }, "id">

  export type PedidoOrderByWithAggregationInput = {
    id?: SortOrder
    cliente?: SortOrder
    descricao?: SortOrder
    status?: SortOrder
    prioridade?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PedidoCountOrderByAggregateInput
    _avg?: PedidoAvgOrderByAggregateInput
    _max?: PedidoMaxOrderByAggregateInput
    _min?: PedidoMinOrderByAggregateInput
    _sum?: PedidoSumOrderByAggregateInput
  }

  export type PedidoScalarWhereWithAggregatesInput = {
    AND?: PedidoScalarWhereWithAggregatesInput | PedidoScalarWhereWithAggregatesInput[]
    OR?: PedidoScalarWhereWithAggregatesInput[]
    NOT?: PedidoScalarWhereWithAggregatesInput | PedidoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Pedido"> | number
    cliente?: StringWithAggregatesFilter<"Pedido"> | string
    descricao?: StringWithAggregatesFilter<"Pedido"> | string
    status?: StringWithAggregatesFilter<"Pedido"> | string
    prioridade?: StringWithAggregatesFilter<"Pedido"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Pedido"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pedido"> | Date | string
  }

  export type PedidoLogWhereInput = {
    AND?: PedidoLogWhereInput | PedidoLogWhereInput[]
    OR?: PedidoLogWhereInput[]
    NOT?: PedidoLogWhereInput | PedidoLogWhereInput[]
    id?: IntFilter<"PedidoLog"> | number
    pedidoId?: IntFilter<"PedidoLog"> | number
    acao?: StringFilter<"PedidoLog"> | string
    detalhes?: StringNullableFilter<"PedidoLog"> | string | null
    usuario?: StringFilter<"PedidoLog"> | string
    createdAt?: DateTimeFilter<"PedidoLog"> | Date | string
    pedido?: XOR<PedidoScalarRelationFilter, PedidoWhereInput>
  }

  export type PedidoLogOrderByWithRelationInput = {
    id?: SortOrder
    pedidoId?: SortOrder
    acao?: SortOrder
    detalhes?: SortOrderInput | SortOrder
    usuario?: SortOrder
    createdAt?: SortOrder
    pedido?: PedidoOrderByWithRelationInput
  }

  export type PedidoLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PedidoLogWhereInput | PedidoLogWhereInput[]
    OR?: PedidoLogWhereInput[]
    NOT?: PedidoLogWhereInput | PedidoLogWhereInput[]
    pedidoId?: IntFilter<"PedidoLog"> | number
    acao?: StringFilter<"PedidoLog"> | string
    detalhes?: StringNullableFilter<"PedidoLog"> | string | null
    usuario?: StringFilter<"PedidoLog"> | string
    createdAt?: DateTimeFilter<"PedidoLog"> | Date | string
    pedido?: XOR<PedidoScalarRelationFilter, PedidoWhereInput>
  }, "id">

  export type PedidoLogOrderByWithAggregationInput = {
    id?: SortOrder
    pedidoId?: SortOrder
    acao?: SortOrder
    detalhes?: SortOrderInput | SortOrder
    usuario?: SortOrder
    createdAt?: SortOrder
    _count?: PedidoLogCountOrderByAggregateInput
    _avg?: PedidoLogAvgOrderByAggregateInput
    _max?: PedidoLogMaxOrderByAggregateInput
    _min?: PedidoLogMinOrderByAggregateInput
    _sum?: PedidoLogSumOrderByAggregateInput
  }

  export type PedidoLogScalarWhereWithAggregatesInput = {
    AND?: PedidoLogScalarWhereWithAggregatesInput | PedidoLogScalarWhereWithAggregatesInput[]
    OR?: PedidoLogScalarWhereWithAggregatesInput[]
    NOT?: PedidoLogScalarWhereWithAggregatesInput | PedidoLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PedidoLog"> | number
    pedidoId?: IntWithAggregatesFilter<"PedidoLog"> | number
    acao?: StringWithAggregatesFilter<"PedidoLog"> | string
    detalhes?: StringNullableWithAggregatesFilter<"PedidoLog"> | string | null
    usuario?: StringWithAggregatesFilter<"PedidoLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PedidoLog"> | Date | string
  }

  export type ChamadoWhereInput = {
    AND?: ChamadoWhereInput | ChamadoWhereInput[]
    OR?: ChamadoWhereInput[]
    NOT?: ChamadoWhereInput | ChamadoWhereInput[]
    id?: IntFilter<"Chamado"> | number
    titulo?: StringFilter<"Chamado"> | string
    descricao?: StringFilter<"Chamado"> | string
    prioridade?: StringFilter<"Chamado"> | string
    status?: StringFilter<"Chamado"> | string
    cliente?: StringNullableFilter<"Chamado"> | string | null
    tecnico?: StringNullableFilter<"Chamado"> | string | null
    createdAt?: DateTimeFilter<"Chamado"> | Date | string
    updatedAt?: DateTimeFilter<"Chamado"> | Date | string
    ordensServico?: OrdemServicoListRelationFilter
  }

  export type ChamadoOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    prioridade?: SortOrder
    status?: SortOrder
    cliente?: SortOrderInput | SortOrder
    tecnico?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ordensServico?: OrdemServicoOrderByRelationAggregateInput
  }

  export type ChamadoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ChamadoWhereInput | ChamadoWhereInput[]
    OR?: ChamadoWhereInput[]
    NOT?: ChamadoWhereInput | ChamadoWhereInput[]
    titulo?: StringFilter<"Chamado"> | string
    descricao?: StringFilter<"Chamado"> | string
    prioridade?: StringFilter<"Chamado"> | string
    status?: StringFilter<"Chamado"> | string
    cliente?: StringNullableFilter<"Chamado"> | string | null
    tecnico?: StringNullableFilter<"Chamado"> | string | null
    createdAt?: DateTimeFilter<"Chamado"> | Date | string
    updatedAt?: DateTimeFilter<"Chamado"> | Date | string
    ordensServico?: OrdemServicoListRelationFilter
  }, "id">

  export type ChamadoOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    prioridade?: SortOrder
    status?: SortOrder
    cliente?: SortOrderInput | SortOrder
    tecnico?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChamadoCountOrderByAggregateInput
    _avg?: ChamadoAvgOrderByAggregateInput
    _max?: ChamadoMaxOrderByAggregateInput
    _min?: ChamadoMinOrderByAggregateInput
    _sum?: ChamadoSumOrderByAggregateInput
  }

  export type ChamadoScalarWhereWithAggregatesInput = {
    AND?: ChamadoScalarWhereWithAggregatesInput | ChamadoScalarWhereWithAggregatesInput[]
    OR?: ChamadoScalarWhereWithAggregatesInput[]
    NOT?: ChamadoScalarWhereWithAggregatesInput | ChamadoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Chamado"> | number
    titulo?: StringWithAggregatesFilter<"Chamado"> | string
    descricao?: StringWithAggregatesFilter<"Chamado"> | string
    prioridade?: StringWithAggregatesFilter<"Chamado"> | string
    status?: StringWithAggregatesFilter<"Chamado"> | string
    cliente?: StringNullableWithAggregatesFilter<"Chamado"> | string | null
    tecnico?: StringNullableWithAggregatesFilter<"Chamado"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Chamado"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Chamado"> | Date | string
  }

  export type OrdemServicoWhereInput = {
    AND?: OrdemServicoWhereInput | OrdemServicoWhereInput[]
    OR?: OrdemServicoWhereInput[]
    NOT?: OrdemServicoWhereInput | OrdemServicoWhereInput[]
    id?: IntFilter<"OrdemServico"> | number
    numero?: StringFilter<"OrdemServico"> | string
    chamadoId?: IntNullableFilter<"OrdemServico"> | number | null
    cliente?: StringNullableFilter<"OrdemServico"> | string | null
    descricao?: StringFilter<"OrdemServico"> | string
    status?: StringFilter<"OrdemServico"> | string
    valorMaoObra?: FloatNullableFilter<"OrdemServico"> | number | null
    observacoes?: StringNullableFilter<"OrdemServico"> | string | null
    createdAt?: DateTimeFilter<"OrdemServico"> | Date | string
    updatedAt?: DateTimeFilter<"OrdemServico"> | Date | string
    chamado?: XOR<ChamadoNullableScalarRelationFilter, ChamadoWhereInput> | null
    itensUsados?: ItemOSListRelationFilter
  }

  export type OrdemServicoOrderByWithRelationInput = {
    id?: SortOrder
    numero?: SortOrder
    chamadoId?: SortOrderInput | SortOrder
    cliente?: SortOrderInput | SortOrder
    descricao?: SortOrder
    status?: SortOrder
    valorMaoObra?: SortOrderInput | SortOrder
    observacoes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    chamado?: ChamadoOrderByWithRelationInput
    itensUsados?: ItemOSOrderByRelationAggregateInput
  }

  export type OrdemServicoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    numero?: string
    AND?: OrdemServicoWhereInput | OrdemServicoWhereInput[]
    OR?: OrdemServicoWhereInput[]
    NOT?: OrdemServicoWhereInput | OrdemServicoWhereInput[]
    chamadoId?: IntNullableFilter<"OrdemServico"> | number | null
    cliente?: StringNullableFilter<"OrdemServico"> | string | null
    descricao?: StringFilter<"OrdemServico"> | string
    status?: StringFilter<"OrdemServico"> | string
    valorMaoObra?: FloatNullableFilter<"OrdemServico"> | number | null
    observacoes?: StringNullableFilter<"OrdemServico"> | string | null
    createdAt?: DateTimeFilter<"OrdemServico"> | Date | string
    updatedAt?: DateTimeFilter<"OrdemServico"> | Date | string
    chamado?: XOR<ChamadoNullableScalarRelationFilter, ChamadoWhereInput> | null
    itensUsados?: ItemOSListRelationFilter
  }, "id" | "numero">

  export type OrdemServicoOrderByWithAggregationInput = {
    id?: SortOrder
    numero?: SortOrder
    chamadoId?: SortOrderInput | SortOrder
    cliente?: SortOrderInput | SortOrder
    descricao?: SortOrder
    status?: SortOrder
    valorMaoObra?: SortOrderInput | SortOrder
    observacoes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrdemServicoCountOrderByAggregateInput
    _avg?: OrdemServicoAvgOrderByAggregateInput
    _max?: OrdemServicoMaxOrderByAggregateInput
    _min?: OrdemServicoMinOrderByAggregateInput
    _sum?: OrdemServicoSumOrderByAggregateInput
  }

  export type OrdemServicoScalarWhereWithAggregatesInput = {
    AND?: OrdemServicoScalarWhereWithAggregatesInput | OrdemServicoScalarWhereWithAggregatesInput[]
    OR?: OrdemServicoScalarWhereWithAggregatesInput[]
    NOT?: OrdemServicoScalarWhereWithAggregatesInput | OrdemServicoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OrdemServico"> | number
    numero?: StringWithAggregatesFilter<"OrdemServico"> | string
    chamadoId?: IntNullableWithAggregatesFilter<"OrdemServico"> | number | null
    cliente?: StringNullableWithAggregatesFilter<"OrdemServico"> | string | null
    descricao?: StringWithAggregatesFilter<"OrdemServico"> | string
    status?: StringWithAggregatesFilter<"OrdemServico"> | string
    valorMaoObra?: FloatNullableWithAggregatesFilter<"OrdemServico"> | number | null
    observacoes?: StringNullableWithAggregatesFilter<"OrdemServico"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OrdemServico"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OrdemServico"> | Date | string
  }

  export type ItemOSWhereInput = {
    AND?: ItemOSWhereInput | ItemOSWhereInput[]
    OR?: ItemOSWhereInput[]
    NOT?: ItemOSWhereInput | ItemOSWhereInput[]
    id?: IntFilter<"ItemOS"> | number
    osId?: IntFilter<"ItemOS"> | number
    itemEstoqueId?: IntFilter<"ItemOS"> | number
    quantidade?: IntFilter<"ItemOS"> | number
    valorUnitario?: FloatNullableFilter<"ItemOS"> | number | null
    os?: XOR<OrdemServicoScalarRelationFilter, OrdemServicoWhereInput>
    item?: XOR<ItemEstoqueScalarRelationFilter, ItemEstoqueWhereInput>
  }

  export type ItemOSOrderByWithRelationInput = {
    id?: SortOrder
    osId?: SortOrder
    itemEstoqueId?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrderInput | SortOrder
    os?: OrdemServicoOrderByWithRelationInput
    item?: ItemEstoqueOrderByWithRelationInput
  }

  export type ItemOSWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ItemOSWhereInput | ItemOSWhereInput[]
    OR?: ItemOSWhereInput[]
    NOT?: ItemOSWhereInput | ItemOSWhereInput[]
    osId?: IntFilter<"ItemOS"> | number
    itemEstoqueId?: IntFilter<"ItemOS"> | number
    quantidade?: IntFilter<"ItemOS"> | number
    valorUnitario?: FloatNullableFilter<"ItemOS"> | number | null
    os?: XOR<OrdemServicoScalarRelationFilter, OrdemServicoWhereInput>
    item?: XOR<ItemEstoqueScalarRelationFilter, ItemEstoqueWhereInput>
  }, "id">

  export type ItemOSOrderByWithAggregationInput = {
    id?: SortOrder
    osId?: SortOrder
    itemEstoqueId?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrderInput | SortOrder
    _count?: ItemOSCountOrderByAggregateInput
    _avg?: ItemOSAvgOrderByAggregateInput
    _max?: ItemOSMaxOrderByAggregateInput
    _min?: ItemOSMinOrderByAggregateInput
    _sum?: ItemOSSumOrderByAggregateInput
  }

  export type ItemOSScalarWhereWithAggregatesInput = {
    AND?: ItemOSScalarWhereWithAggregatesInput | ItemOSScalarWhereWithAggregatesInput[]
    OR?: ItemOSScalarWhereWithAggregatesInput[]
    NOT?: ItemOSScalarWhereWithAggregatesInput | ItemOSScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ItemOS"> | number
    osId?: IntWithAggregatesFilter<"ItemOS"> | number
    itemEstoqueId?: IntWithAggregatesFilter<"ItemOS"> | number
    quantidade?: IntWithAggregatesFilter<"ItemOS"> | number
    valorUnitario?: FloatNullableWithAggregatesFilter<"ItemOS"> | number | null
  }

  export type ItemEstoqueWhereInput = {
    AND?: ItemEstoqueWhereInput | ItemEstoqueWhereInput[]
    OR?: ItemEstoqueWhereInput[]
    NOT?: ItemEstoqueWhereInput | ItemEstoqueWhereInput[]
    id?: IntFilter<"ItemEstoque"> | number
    codigo?: StringNullableFilter<"ItemEstoque"> | string | null
    nome?: StringFilter<"ItemEstoque"> | string
    descricao?: StringNullableFilter<"ItemEstoque"> | string | null
    categoria?: StringNullableFilter<"ItemEstoque"> | string | null
    quantidade?: IntFilter<"ItemEstoque"> | number
    minimo?: IntFilter<"ItemEstoque"> | number
    valorUnit?: FloatNullableFilter<"ItemEstoque"> | number | null
    fornecedor?: StringNullableFilter<"ItemEstoque"> | string | null
    localizacao?: StringNullableFilter<"ItemEstoque"> | string | null
    createdAt?: DateTimeFilter<"ItemEstoque"> | Date | string
    updatedAt?: DateTimeFilter<"ItemEstoque"> | Date | string
    itensOS?: ItemOSListRelationFilter
  }

  export type ItemEstoqueOrderByWithRelationInput = {
    id?: SortOrder
    codigo?: SortOrderInput | SortOrder
    nome?: SortOrder
    descricao?: SortOrderInput | SortOrder
    categoria?: SortOrderInput | SortOrder
    quantidade?: SortOrder
    minimo?: SortOrder
    valorUnit?: SortOrderInput | SortOrder
    fornecedor?: SortOrderInput | SortOrder
    localizacao?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    itensOS?: ItemOSOrderByRelationAggregateInput
  }

  export type ItemEstoqueWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    codigo?: string
    AND?: ItemEstoqueWhereInput | ItemEstoqueWhereInput[]
    OR?: ItemEstoqueWhereInput[]
    NOT?: ItemEstoqueWhereInput | ItemEstoqueWhereInput[]
    nome?: StringFilter<"ItemEstoque"> | string
    descricao?: StringNullableFilter<"ItemEstoque"> | string | null
    categoria?: StringNullableFilter<"ItemEstoque"> | string | null
    quantidade?: IntFilter<"ItemEstoque"> | number
    minimo?: IntFilter<"ItemEstoque"> | number
    valorUnit?: FloatNullableFilter<"ItemEstoque"> | number | null
    fornecedor?: StringNullableFilter<"ItemEstoque"> | string | null
    localizacao?: StringNullableFilter<"ItemEstoque"> | string | null
    createdAt?: DateTimeFilter<"ItemEstoque"> | Date | string
    updatedAt?: DateTimeFilter<"ItemEstoque"> | Date | string
    itensOS?: ItemOSListRelationFilter
  }, "id" | "codigo">

  export type ItemEstoqueOrderByWithAggregationInput = {
    id?: SortOrder
    codigo?: SortOrderInput | SortOrder
    nome?: SortOrder
    descricao?: SortOrderInput | SortOrder
    categoria?: SortOrderInput | SortOrder
    quantidade?: SortOrder
    minimo?: SortOrder
    valorUnit?: SortOrderInput | SortOrder
    fornecedor?: SortOrderInput | SortOrder
    localizacao?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ItemEstoqueCountOrderByAggregateInput
    _avg?: ItemEstoqueAvgOrderByAggregateInput
    _max?: ItemEstoqueMaxOrderByAggregateInput
    _min?: ItemEstoqueMinOrderByAggregateInput
    _sum?: ItemEstoqueSumOrderByAggregateInput
  }

  export type ItemEstoqueScalarWhereWithAggregatesInput = {
    AND?: ItemEstoqueScalarWhereWithAggregatesInput | ItemEstoqueScalarWhereWithAggregatesInput[]
    OR?: ItemEstoqueScalarWhereWithAggregatesInput[]
    NOT?: ItemEstoqueScalarWhereWithAggregatesInput | ItemEstoqueScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ItemEstoque"> | number
    codigo?: StringNullableWithAggregatesFilter<"ItemEstoque"> | string | null
    nome?: StringWithAggregatesFilter<"ItemEstoque"> | string
    descricao?: StringNullableWithAggregatesFilter<"ItemEstoque"> | string | null
    categoria?: StringNullableWithAggregatesFilter<"ItemEstoque"> | string | null
    quantidade?: IntWithAggregatesFilter<"ItemEstoque"> | number
    minimo?: IntWithAggregatesFilter<"ItemEstoque"> | number
    valorUnit?: FloatNullableWithAggregatesFilter<"ItemEstoque"> | number | null
    fornecedor?: StringNullableWithAggregatesFilter<"ItemEstoque"> | string | null
    localizacao?: StringNullableWithAggregatesFilter<"ItemEstoque"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ItemEstoque"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ItemEstoque"> | Date | string
  }

  export type LocacaoWhereInput = {
    AND?: LocacaoWhereInput | LocacaoWhereInput[]
    OR?: LocacaoWhereInput[]
    NOT?: LocacaoWhereInput | LocacaoWhereInput[]
    id?: IntFilter<"Locacao"> | number
    equipamento?: StringFilter<"Locacao"> | string
    descricao?: StringNullableFilter<"Locacao"> | string | null
    cliente?: StringNullableFilter<"Locacao"> | string | null
    dataInicio?: DateTimeFilter<"Locacao"> | Date | string
    dataFim?: DateTimeFilter<"Locacao"> | Date | string
    valorMensal?: FloatFilter<"Locacao"> | number
    valorTotal?: FloatNullableFilter<"Locacao"> | number | null
    status?: StringFilter<"Locacao"> | string
    observacoes?: StringNullableFilter<"Locacao"> | string | null
    createdAt?: DateTimeFilter<"Locacao"> | Date | string
    updatedAt?: DateTimeFilter<"Locacao"> | Date | string
  }

  export type LocacaoOrderByWithRelationInput = {
    id?: SortOrder
    equipamento?: SortOrder
    descricao?: SortOrderInput | SortOrder
    cliente?: SortOrderInput | SortOrder
    dataInicio?: SortOrder
    dataFim?: SortOrder
    valorMensal?: SortOrder
    valorTotal?: SortOrderInput | SortOrder
    status?: SortOrder
    observacoes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocacaoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LocacaoWhereInput | LocacaoWhereInput[]
    OR?: LocacaoWhereInput[]
    NOT?: LocacaoWhereInput | LocacaoWhereInput[]
    equipamento?: StringFilter<"Locacao"> | string
    descricao?: StringNullableFilter<"Locacao"> | string | null
    cliente?: StringNullableFilter<"Locacao"> | string | null
    dataInicio?: DateTimeFilter<"Locacao"> | Date | string
    dataFim?: DateTimeFilter<"Locacao"> | Date | string
    valorMensal?: FloatFilter<"Locacao"> | number
    valorTotal?: FloatNullableFilter<"Locacao"> | number | null
    status?: StringFilter<"Locacao"> | string
    observacoes?: StringNullableFilter<"Locacao"> | string | null
    createdAt?: DateTimeFilter<"Locacao"> | Date | string
    updatedAt?: DateTimeFilter<"Locacao"> | Date | string
  }, "id">

  export type LocacaoOrderByWithAggregationInput = {
    id?: SortOrder
    equipamento?: SortOrder
    descricao?: SortOrderInput | SortOrder
    cliente?: SortOrderInput | SortOrder
    dataInicio?: SortOrder
    dataFim?: SortOrder
    valorMensal?: SortOrder
    valorTotal?: SortOrderInput | SortOrder
    status?: SortOrder
    observacoes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LocacaoCountOrderByAggregateInput
    _avg?: LocacaoAvgOrderByAggregateInput
    _max?: LocacaoMaxOrderByAggregateInput
    _min?: LocacaoMinOrderByAggregateInput
    _sum?: LocacaoSumOrderByAggregateInput
  }

  export type LocacaoScalarWhereWithAggregatesInput = {
    AND?: LocacaoScalarWhereWithAggregatesInput | LocacaoScalarWhereWithAggregatesInput[]
    OR?: LocacaoScalarWhereWithAggregatesInput[]
    NOT?: LocacaoScalarWhereWithAggregatesInput | LocacaoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Locacao"> | number
    equipamento?: StringWithAggregatesFilter<"Locacao"> | string
    descricao?: StringNullableWithAggregatesFilter<"Locacao"> | string | null
    cliente?: StringNullableWithAggregatesFilter<"Locacao"> | string | null
    dataInicio?: DateTimeWithAggregatesFilter<"Locacao"> | Date | string
    dataFim?: DateTimeWithAggregatesFilter<"Locacao"> | Date | string
    valorMensal?: FloatWithAggregatesFilter<"Locacao"> | number
    valorTotal?: FloatNullableWithAggregatesFilter<"Locacao"> | number | null
    status?: StringWithAggregatesFilter<"Locacao"> | string
    observacoes?: StringNullableWithAggregatesFilter<"Locacao"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Locacao"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Locacao"> | Date | string
  }

  export type PedidoCreateInput = {
    cliente: string
    descricao: string
    status?: string
    prioridade?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: PedidoLogCreateNestedManyWithoutPedidoInput
  }

  export type PedidoUncheckedCreateInput = {
    id?: number
    cliente: string
    descricao: string
    status?: string
    prioridade?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: PedidoLogUncheckedCreateNestedManyWithoutPedidoInput
  }

  export type PedidoUpdateInput = {
    cliente?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    prioridade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: PedidoLogUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    prioridade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: PedidoLogUncheckedUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoCreateManyInput = {
    id?: number
    cliente: string
    descricao: string
    status?: string
    prioridade?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PedidoUpdateManyMutationInput = {
    cliente?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    prioridade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    prioridade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoLogCreateInput = {
    acao: string
    detalhes?: string | null
    usuario?: string
    createdAt?: Date | string
    pedido: PedidoCreateNestedOneWithoutLogsInput
  }

  export type PedidoLogUncheckedCreateInput = {
    id?: number
    pedidoId: number
    acao: string
    detalhes?: string | null
    usuario?: string
    createdAt?: Date | string
  }

  export type PedidoLogUpdateInput = {
    acao?: StringFieldUpdateOperationsInput | string
    detalhes?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pedido?: PedidoUpdateOneRequiredWithoutLogsNestedInput
  }

  export type PedidoLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    pedidoId?: IntFieldUpdateOperationsInput | number
    acao?: StringFieldUpdateOperationsInput | string
    detalhes?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoLogCreateManyInput = {
    id?: number
    pedidoId: number
    acao: string
    detalhes?: string | null
    usuario?: string
    createdAt?: Date | string
  }

  export type PedidoLogUpdateManyMutationInput = {
    acao?: StringFieldUpdateOperationsInput | string
    detalhes?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    pedidoId?: IntFieldUpdateOperationsInput | number
    acao?: StringFieldUpdateOperationsInput | string
    detalhes?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChamadoCreateInput = {
    titulo: string
    descricao: string
    prioridade?: string
    status?: string
    cliente?: string | null
    tecnico?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ordensServico?: OrdemServicoCreateNestedManyWithoutChamadoInput
  }

  export type ChamadoUncheckedCreateInput = {
    id?: number
    titulo: string
    descricao: string
    prioridade?: string
    status?: string
    cliente?: string | null
    tecnico?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ordensServico?: OrdemServicoUncheckedCreateNestedManyWithoutChamadoInput
  }

  export type ChamadoUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    prioridade?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    tecnico?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ordensServico?: OrdemServicoUpdateManyWithoutChamadoNestedInput
  }

  export type ChamadoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    prioridade?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    tecnico?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ordensServico?: OrdemServicoUncheckedUpdateManyWithoutChamadoNestedInput
  }

  export type ChamadoCreateManyInput = {
    id?: number
    titulo: string
    descricao: string
    prioridade?: string
    status?: string
    cliente?: string | null
    tecnico?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChamadoUpdateManyMutationInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    prioridade?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    tecnico?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChamadoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    prioridade?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    tecnico?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrdemServicoCreateInput = {
    numero: string
    cliente?: string | null
    descricao: string
    status?: string
    valorMaoObra?: number | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chamado?: ChamadoCreateNestedOneWithoutOrdensServicoInput
    itensUsados?: ItemOSCreateNestedManyWithoutOsInput
  }

  export type OrdemServicoUncheckedCreateInput = {
    id?: number
    numero: string
    chamadoId?: number | null
    cliente?: string | null
    descricao: string
    status?: string
    valorMaoObra?: number | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    itensUsados?: ItemOSUncheckedCreateNestedManyWithoutOsInput
  }

  export type OrdemServicoUpdateInput = {
    numero?: StringFieldUpdateOperationsInput | string
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    valorMaoObra?: NullableFloatFieldUpdateOperationsInput | number | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chamado?: ChamadoUpdateOneWithoutOrdensServicoNestedInput
    itensUsados?: ItemOSUpdateManyWithoutOsNestedInput
  }

  export type OrdemServicoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    chamadoId?: NullableIntFieldUpdateOperationsInput | number | null
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    valorMaoObra?: NullableFloatFieldUpdateOperationsInput | number | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itensUsados?: ItemOSUncheckedUpdateManyWithoutOsNestedInput
  }

  export type OrdemServicoCreateManyInput = {
    id?: number
    numero: string
    chamadoId?: number | null
    cliente?: string | null
    descricao: string
    status?: string
    valorMaoObra?: number | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrdemServicoUpdateManyMutationInput = {
    numero?: StringFieldUpdateOperationsInput | string
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    valorMaoObra?: NullableFloatFieldUpdateOperationsInput | number | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrdemServicoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    chamadoId?: NullableIntFieldUpdateOperationsInput | number | null
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    valorMaoObra?: NullableFloatFieldUpdateOperationsInput | number | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemOSCreateInput = {
    quantidade: number
    valorUnitario?: number | null
    os: OrdemServicoCreateNestedOneWithoutItensUsadosInput
    item: ItemEstoqueCreateNestedOneWithoutItensOSInput
  }

  export type ItemOSUncheckedCreateInput = {
    id?: number
    osId: number
    itemEstoqueId: number
    quantidade: number
    valorUnitario?: number | null
  }

  export type ItemOSUpdateInput = {
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
    os?: OrdemServicoUpdateOneRequiredWithoutItensUsadosNestedInput
    item?: ItemEstoqueUpdateOneRequiredWithoutItensOSNestedInput
  }

  export type ItemOSUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    osId?: IntFieldUpdateOperationsInput | number
    itemEstoqueId?: IntFieldUpdateOperationsInput | number
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ItemOSCreateManyInput = {
    id?: number
    osId: number
    itemEstoqueId: number
    quantidade: number
    valorUnitario?: number | null
  }

  export type ItemOSUpdateManyMutationInput = {
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ItemOSUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    osId?: IntFieldUpdateOperationsInput | number
    itemEstoqueId?: IntFieldUpdateOperationsInput | number
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ItemEstoqueCreateInput = {
    codigo?: string | null
    nome: string
    descricao?: string | null
    categoria?: string | null
    quantidade?: number
    minimo?: number
    valorUnit?: number | null
    fornecedor?: string | null
    localizacao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    itensOS?: ItemOSCreateNestedManyWithoutItemInput
  }

  export type ItemEstoqueUncheckedCreateInput = {
    id?: number
    codigo?: string | null
    nome: string
    descricao?: string | null
    categoria?: string | null
    quantidade?: number
    minimo?: number
    valorUnit?: number | null
    fornecedor?: string | null
    localizacao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    itensOS?: ItemOSUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemEstoqueUpdateInput = {
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: IntFieldUpdateOperationsInput | number
    minimo?: IntFieldUpdateOperationsInput | number
    valorUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    localizacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itensOS?: ItemOSUpdateManyWithoutItemNestedInput
  }

  export type ItemEstoqueUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: IntFieldUpdateOperationsInput | number
    minimo?: IntFieldUpdateOperationsInput | number
    valorUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    localizacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itensOS?: ItemOSUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemEstoqueCreateManyInput = {
    id?: number
    codigo?: string | null
    nome: string
    descricao?: string | null
    categoria?: string | null
    quantidade?: number
    minimo?: number
    valorUnit?: number | null
    fornecedor?: string | null
    localizacao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemEstoqueUpdateManyMutationInput = {
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: IntFieldUpdateOperationsInput | number
    minimo?: IntFieldUpdateOperationsInput | number
    valorUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    localizacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemEstoqueUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: IntFieldUpdateOperationsInput | number
    minimo?: IntFieldUpdateOperationsInput | number
    valorUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    localizacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocacaoCreateInput = {
    equipamento: string
    descricao?: string | null
    cliente?: string | null
    dataInicio: Date | string
    dataFim: Date | string
    valorMensal: number
    valorTotal?: number | null
    status?: string
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocacaoUncheckedCreateInput = {
    id?: number
    equipamento: string
    descricao?: string | null
    cliente?: string | null
    dataInicio: Date | string
    dataFim: Date | string
    valorMensal: number
    valorTotal?: number | null
    status?: string
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocacaoUpdateInput = {
    equipamento?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: DateTimeFieldUpdateOperationsInput | Date | string
    valorMensal?: FloatFieldUpdateOperationsInput | number
    valorTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocacaoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    equipamento?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: DateTimeFieldUpdateOperationsInput | Date | string
    valorMensal?: FloatFieldUpdateOperationsInput | number
    valorTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocacaoCreateManyInput = {
    id?: number
    equipamento: string
    descricao?: string | null
    cliente?: string | null
    dataInicio: Date | string
    dataFim: Date | string
    valorMensal: number
    valorTotal?: number | null
    status?: string
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocacaoUpdateManyMutationInput = {
    equipamento?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: DateTimeFieldUpdateOperationsInput | Date | string
    valorMensal?: FloatFieldUpdateOperationsInput | number
    valorTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocacaoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    equipamento?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    dataInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    dataFim?: DateTimeFieldUpdateOperationsInput | Date | string
    valorMensal?: FloatFieldUpdateOperationsInput | number
    valorTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PedidoLogListRelationFilter = {
    every?: PedidoLogWhereInput
    some?: PedidoLogWhereInput
    none?: PedidoLogWhereInput
  }

  export type PedidoLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PedidoCountOrderByAggregateInput = {
    id?: SortOrder
    cliente?: SortOrder
    descricao?: SortOrder
    status?: SortOrder
    prioridade?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PedidoAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PedidoMaxOrderByAggregateInput = {
    id?: SortOrder
    cliente?: SortOrder
    descricao?: SortOrder
    status?: SortOrder
    prioridade?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PedidoMinOrderByAggregateInput = {
    id?: SortOrder
    cliente?: SortOrder
    descricao?: SortOrder
    status?: SortOrder
    prioridade?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PedidoSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type PedidoScalarRelationFilter = {
    is?: PedidoWhereInput
    isNot?: PedidoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PedidoLogCountOrderByAggregateInput = {
    id?: SortOrder
    pedidoId?: SortOrder
    acao?: SortOrder
    detalhes?: SortOrder
    usuario?: SortOrder
    createdAt?: SortOrder
  }

  export type PedidoLogAvgOrderByAggregateInput = {
    id?: SortOrder
    pedidoId?: SortOrder
  }

  export type PedidoLogMaxOrderByAggregateInput = {
    id?: SortOrder
    pedidoId?: SortOrder
    acao?: SortOrder
    detalhes?: SortOrder
    usuario?: SortOrder
    createdAt?: SortOrder
  }

  export type PedidoLogMinOrderByAggregateInput = {
    id?: SortOrder
    pedidoId?: SortOrder
    acao?: SortOrder
    detalhes?: SortOrder
    usuario?: SortOrder
    createdAt?: SortOrder
  }

  export type PedidoLogSumOrderByAggregateInput = {
    id?: SortOrder
    pedidoId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type OrdemServicoListRelationFilter = {
    every?: OrdemServicoWhereInput
    some?: OrdemServicoWhereInput
    none?: OrdemServicoWhereInput
  }

  export type OrdemServicoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChamadoCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    prioridade?: SortOrder
    status?: SortOrder
    cliente?: SortOrder
    tecnico?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChamadoAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ChamadoMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    prioridade?: SortOrder
    status?: SortOrder
    cliente?: SortOrder
    tecnico?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChamadoMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    prioridade?: SortOrder
    status?: SortOrder
    cliente?: SortOrder
    tecnico?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChamadoSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ChamadoNullableScalarRelationFilter = {
    is?: ChamadoWhereInput | null
    isNot?: ChamadoWhereInput | null
  }

  export type ItemOSListRelationFilter = {
    every?: ItemOSWhereInput
    some?: ItemOSWhereInput
    none?: ItemOSWhereInput
  }

  export type ItemOSOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrdemServicoCountOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    chamadoId?: SortOrder
    cliente?: SortOrder
    descricao?: SortOrder
    status?: SortOrder
    valorMaoObra?: SortOrder
    observacoes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrdemServicoAvgOrderByAggregateInput = {
    id?: SortOrder
    chamadoId?: SortOrder
    valorMaoObra?: SortOrder
  }

  export type OrdemServicoMaxOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    chamadoId?: SortOrder
    cliente?: SortOrder
    descricao?: SortOrder
    status?: SortOrder
    valorMaoObra?: SortOrder
    observacoes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrdemServicoMinOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    chamadoId?: SortOrder
    cliente?: SortOrder
    descricao?: SortOrder
    status?: SortOrder
    valorMaoObra?: SortOrder
    observacoes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrdemServicoSumOrderByAggregateInput = {
    id?: SortOrder
    chamadoId?: SortOrder
    valorMaoObra?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type OrdemServicoScalarRelationFilter = {
    is?: OrdemServicoWhereInput
    isNot?: OrdemServicoWhereInput
  }

  export type ItemEstoqueScalarRelationFilter = {
    is?: ItemEstoqueWhereInput
    isNot?: ItemEstoqueWhereInput
  }

  export type ItemOSCountOrderByAggregateInput = {
    id?: SortOrder
    osId?: SortOrder
    itemEstoqueId?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrder
  }

  export type ItemOSAvgOrderByAggregateInput = {
    id?: SortOrder
    osId?: SortOrder
    itemEstoqueId?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrder
  }

  export type ItemOSMaxOrderByAggregateInput = {
    id?: SortOrder
    osId?: SortOrder
    itemEstoqueId?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrder
  }

  export type ItemOSMinOrderByAggregateInput = {
    id?: SortOrder
    osId?: SortOrder
    itemEstoqueId?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrder
  }

  export type ItemOSSumOrderByAggregateInput = {
    id?: SortOrder
    osId?: SortOrder
    itemEstoqueId?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrder
  }

  export type ItemEstoqueCountOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    categoria?: SortOrder
    quantidade?: SortOrder
    minimo?: SortOrder
    valorUnit?: SortOrder
    fornecedor?: SortOrder
    localizacao?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemEstoqueAvgOrderByAggregateInput = {
    id?: SortOrder
    quantidade?: SortOrder
    minimo?: SortOrder
    valorUnit?: SortOrder
  }

  export type ItemEstoqueMaxOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    categoria?: SortOrder
    quantidade?: SortOrder
    minimo?: SortOrder
    valorUnit?: SortOrder
    fornecedor?: SortOrder
    localizacao?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemEstoqueMinOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    categoria?: SortOrder
    quantidade?: SortOrder
    minimo?: SortOrder
    valorUnit?: SortOrder
    fornecedor?: SortOrder
    localizacao?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemEstoqueSumOrderByAggregateInput = {
    id?: SortOrder
    quantidade?: SortOrder
    minimo?: SortOrder
    valorUnit?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type LocacaoCountOrderByAggregateInput = {
    id?: SortOrder
    equipamento?: SortOrder
    descricao?: SortOrder
    cliente?: SortOrder
    dataInicio?: SortOrder
    dataFim?: SortOrder
    valorMensal?: SortOrder
    valorTotal?: SortOrder
    status?: SortOrder
    observacoes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocacaoAvgOrderByAggregateInput = {
    id?: SortOrder
    valorMensal?: SortOrder
    valorTotal?: SortOrder
  }

  export type LocacaoMaxOrderByAggregateInput = {
    id?: SortOrder
    equipamento?: SortOrder
    descricao?: SortOrder
    cliente?: SortOrder
    dataInicio?: SortOrder
    dataFim?: SortOrder
    valorMensal?: SortOrder
    valorTotal?: SortOrder
    status?: SortOrder
    observacoes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocacaoMinOrderByAggregateInput = {
    id?: SortOrder
    equipamento?: SortOrder
    descricao?: SortOrder
    cliente?: SortOrder
    dataInicio?: SortOrder
    dataFim?: SortOrder
    valorMensal?: SortOrder
    valorTotal?: SortOrder
    status?: SortOrder
    observacoes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocacaoSumOrderByAggregateInput = {
    id?: SortOrder
    valorMensal?: SortOrder
    valorTotal?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PedidoLogCreateNestedManyWithoutPedidoInput = {
    create?: XOR<PedidoLogCreateWithoutPedidoInput, PedidoLogUncheckedCreateWithoutPedidoInput> | PedidoLogCreateWithoutPedidoInput[] | PedidoLogUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoLogCreateOrConnectWithoutPedidoInput | PedidoLogCreateOrConnectWithoutPedidoInput[]
    createMany?: PedidoLogCreateManyPedidoInputEnvelope
    connect?: PedidoLogWhereUniqueInput | PedidoLogWhereUniqueInput[]
  }

  export type PedidoLogUncheckedCreateNestedManyWithoutPedidoInput = {
    create?: XOR<PedidoLogCreateWithoutPedidoInput, PedidoLogUncheckedCreateWithoutPedidoInput> | PedidoLogCreateWithoutPedidoInput[] | PedidoLogUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoLogCreateOrConnectWithoutPedidoInput | PedidoLogCreateOrConnectWithoutPedidoInput[]
    createMany?: PedidoLogCreateManyPedidoInputEnvelope
    connect?: PedidoLogWhereUniqueInput | PedidoLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PedidoLogUpdateManyWithoutPedidoNestedInput = {
    create?: XOR<PedidoLogCreateWithoutPedidoInput, PedidoLogUncheckedCreateWithoutPedidoInput> | PedidoLogCreateWithoutPedidoInput[] | PedidoLogUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoLogCreateOrConnectWithoutPedidoInput | PedidoLogCreateOrConnectWithoutPedidoInput[]
    upsert?: PedidoLogUpsertWithWhereUniqueWithoutPedidoInput | PedidoLogUpsertWithWhereUniqueWithoutPedidoInput[]
    createMany?: PedidoLogCreateManyPedidoInputEnvelope
    set?: PedidoLogWhereUniqueInput | PedidoLogWhereUniqueInput[]
    disconnect?: PedidoLogWhereUniqueInput | PedidoLogWhereUniqueInput[]
    delete?: PedidoLogWhereUniqueInput | PedidoLogWhereUniqueInput[]
    connect?: PedidoLogWhereUniqueInput | PedidoLogWhereUniqueInput[]
    update?: PedidoLogUpdateWithWhereUniqueWithoutPedidoInput | PedidoLogUpdateWithWhereUniqueWithoutPedidoInput[]
    updateMany?: PedidoLogUpdateManyWithWhereWithoutPedidoInput | PedidoLogUpdateManyWithWhereWithoutPedidoInput[]
    deleteMany?: PedidoLogScalarWhereInput | PedidoLogScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PedidoLogUncheckedUpdateManyWithoutPedidoNestedInput = {
    create?: XOR<PedidoLogCreateWithoutPedidoInput, PedidoLogUncheckedCreateWithoutPedidoInput> | PedidoLogCreateWithoutPedidoInput[] | PedidoLogUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoLogCreateOrConnectWithoutPedidoInput | PedidoLogCreateOrConnectWithoutPedidoInput[]
    upsert?: PedidoLogUpsertWithWhereUniqueWithoutPedidoInput | PedidoLogUpsertWithWhereUniqueWithoutPedidoInput[]
    createMany?: PedidoLogCreateManyPedidoInputEnvelope
    set?: PedidoLogWhereUniqueInput | PedidoLogWhereUniqueInput[]
    disconnect?: PedidoLogWhereUniqueInput | PedidoLogWhereUniqueInput[]
    delete?: PedidoLogWhereUniqueInput | PedidoLogWhereUniqueInput[]
    connect?: PedidoLogWhereUniqueInput | PedidoLogWhereUniqueInput[]
    update?: PedidoLogUpdateWithWhereUniqueWithoutPedidoInput | PedidoLogUpdateWithWhereUniqueWithoutPedidoInput[]
    updateMany?: PedidoLogUpdateManyWithWhereWithoutPedidoInput | PedidoLogUpdateManyWithWhereWithoutPedidoInput[]
    deleteMany?: PedidoLogScalarWhereInput | PedidoLogScalarWhereInput[]
  }

  export type PedidoCreateNestedOneWithoutLogsInput = {
    create?: XOR<PedidoCreateWithoutLogsInput, PedidoUncheckedCreateWithoutLogsInput>
    connectOrCreate?: PedidoCreateOrConnectWithoutLogsInput
    connect?: PedidoWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type PedidoUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<PedidoCreateWithoutLogsInput, PedidoUncheckedCreateWithoutLogsInput>
    connectOrCreate?: PedidoCreateOrConnectWithoutLogsInput
    upsert?: PedidoUpsertWithoutLogsInput
    connect?: PedidoWhereUniqueInput
    update?: XOR<XOR<PedidoUpdateToOneWithWhereWithoutLogsInput, PedidoUpdateWithoutLogsInput>, PedidoUncheckedUpdateWithoutLogsInput>
  }

  export type OrdemServicoCreateNestedManyWithoutChamadoInput = {
    create?: XOR<OrdemServicoCreateWithoutChamadoInput, OrdemServicoUncheckedCreateWithoutChamadoInput> | OrdemServicoCreateWithoutChamadoInput[] | OrdemServicoUncheckedCreateWithoutChamadoInput[]
    connectOrCreate?: OrdemServicoCreateOrConnectWithoutChamadoInput | OrdemServicoCreateOrConnectWithoutChamadoInput[]
    createMany?: OrdemServicoCreateManyChamadoInputEnvelope
    connect?: OrdemServicoWhereUniqueInput | OrdemServicoWhereUniqueInput[]
  }

  export type OrdemServicoUncheckedCreateNestedManyWithoutChamadoInput = {
    create?: XOR<OrdemServicoCreateWithoutChamadoInput, OrdemServicoUncheckedCreateWithoutChamadoInput> | OrdemServicoCreateWithoutChamadoInput[] | OrdemServicoUncheckedCreateWithoutChamadoInput[]
    connectOrCreate?: OrdemServicoCreateOrConnectWithoutChamadoInput | OrdemServicoCreateOrConnectWithoutChamadoInput[]
    createMany?: OrdemServicoCreateManyChamadoInputEnvelope
    connect?: OrdemServicoWhereUniqueInput | OrdemServicoWhereUniqueInput[]
  }

  export type OrdemServicoUpdateManyWithoutChamadoNestedInput = {
    create?: XOR<OrdemServicoCreateWithoutChamadoInput, OrdemServicoUncheckedCreateWithoutChamadoInput> | OrdemServicoCreateWithoutChamadoInput[] | OrdemServicoUncheckedCreateWithoutChamadoInput[]
    connectOrCreate?: OrdemServicoCreateOrConnectWithoutChamadoInput | OrdemServicoCreateOrConnectWithoutChamadoInput[]
    upsert?: OrdemServicoUpsertWithWhereUniqueWithoutChamadoInput | OrdemServicoUpsertWithWhereUniqueWithoutChamadoInput[]
    createMany?: OrdemServicoCreateManyChamadoInputEnvelope
    set?: OrdemServicoWhereUniqueInput | OrdemServicoWhereUniqueInput[]
    disconnect?: OrdemServicoWhereUniqueInput | OrdemServicoWhereUniqueInput[]
    delete?: OrdemServicoWhereUniqueInput | OrdemServicoWhereUniqueInput[]
    connect?: OrdemServicoWhereUniqueInput | OrdemServicoWhereUniqueInput[]
    update?: OrdemServicoUpdateWithWhereUniqueWithoutChamadoInput | OrdemServicoUpdateWithWhereUniqueWithoutChamadoInput[]
    updateMany?: OrdemServicoUpdateManyWithWhereWithoutChamadoInput | OrdemServicoUpdateManyWithWhereWithoutChamadoInput[]
    deleteMany?: OrdemServicoScalarWhereInput | OrdemServicoScalarWhereInput[]
  }

  export type OrdemServicoUncheckedUpdateManyWithoutChamadoNestedInput = {
    create?: XOR<OrdemServicoCreateWithoutChamadoInput, OrdemServicoUncheckedCreateWithoutChamadoInput> | OrdemServicoCreateWithoutChamadoInput[] | OrdemServicoUncheckedCreateWithoutChamadoInput[]
    connectOrCreate?: OrdemServicoCreateOrConnectWithoutChamadoInput | OrdemServicoCreateOrConnectWithoutChamadoInput[]
    upsert?: OrdemServicoUpsertWithWhereUniqueWithoutChamadoInput | OrdemServicoUpsertWithWhereUniqueWithoutChamadoInput[]
    createMany?: OrdemServicoCreateManyChamadoInputEnvelope
    set?: OrdemServicoWhereUniqueInput | OrdemServicoWhereUniqueInput[]
    disconnect?: OrdemServicoWhereUniqueInput | OrdemServicoWhereUniqueInput[]
    delete?: OrdemServicoWhereUniqueInput | OrdemServicoWhereUniqueInput[]
    connect?: OrdemServicoWhereUniqueInput | OrdemServicoWhereUniqueInput[]
    update?: OrdemServicoUpdateWithWhereUniqueWithoutChamadoInput | OrdemServicoUpdateWithWhereUniqueWithoutChamadoInput[]
    updateMany?: OrdemServicoUpdateManyWithWhereWithoutChamadoInput | OrdemServicoUpdateManyWithWhereWithoutChamadoInput[]
    deleteMany?: OrdemServicoScalarWhereInput | OrdemServicoScalarWhereInput[]
  }

  export type ChamadoCreateNestedOneWithoutOrdensServicoInput = {
    create?: XOR<ChamadoCreateWithoutOrdensServicoInput, ChamadoUncheckedCreateWithoutOrdensServicoInput>
    connectOrCreate?: ChamadoCreateOrConnectWithoutOrdensServicoInput
    connect?: ChamadoWhereUniqueInput
  }

  export type ItemOSCreateNestedManyWithoutOsInput = {
    create?: XOR<ItemOSCreateWithoutOsInput, ItemOSUncheckedCreateWithoutOsInput> | ItemOSCreateWithoutOsInput[] | ItemOSUncheckedCreateWithoutOsInput[]
    connectOrCreate?: ItemOSCreateOrConnectWithoutOsInput | ItemOSCreateOrConnectWithoutOsInput[]
    createMany?: ItemOSCreateManyOsInputEnvelope
    connect?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
  }

  export type ItemOSUncheckedCreateNestedManyWithoutOsInput = {
    create?: XOR<ItemOSCreateWithoutOsInput, ItemOSUncheckedCreateWithoutOsInput> | ItemOSCreateWithoutOsInput[] | ItemOSUncheckedCreateWithoutOsInput[]
    connectOrCreate?: ItemOSCreateOrConnectWithoutOsInput | ItemOSCreateOrConnectWithoutOsInput[]
    createMany?: ItemOSCreateManyOsInputEnvelope
    connect?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ChamadoUpdateOneWithoutOrdensServicoNestedInput = {
    create?: XOR<ChamadoCreateWithoutOrdensServicoInput, ChamadoUncheckedCreateWithoutOrdensServicoInput>
    connectOrCreate?: ChamadoCreateOrConnectWithoutOrdensServicoInput
    upsert?: ChamadoUpsertWithoutOrdensServicoInput
    disconnect?: ChamadoWhereInput | boolean
    delete?: ChamadoWhereInput | boolean
    connect?: ChamadoWhereUniqueInput
    update?: XOR<XOR<ChamadoUpdateToOneWithWhereWithoutOrdensServicoInput, ChamadoUpdateWithoutOrdensServicoInput>, ChamadoUncheckedUpdateWithoutOrdensServicoInput>
  }

  export type ItemOSUpdateManyWithoutOsNestedInput = {
    create?: XOR<ItemOSCreateWithoutOsInput, ItemOSUncheckedCreateWithoutOsInput> | ItemOSCreateWithoutOsInput[] | ItemOSUncheckedCreateWithoutOsInput[]
    connectOrCreate?: ItemOSCreateOrConnectWithoutOsInput | ItemOSCreateOrConnectWithoutOsInput[]
    upsert?: ItemOSUpsertWithWhereUniqueWithoutOsInput | ItemOSUpsertWithWhereUniqueWithoutOsInput[]
    createMany?: ItemOSCreateManyOsInputEnvelope
    set?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
    disconnect?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
    delete?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
    connect?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
    update?: ItemOSUpdateWithWhereUniqueWithoutOsInput | ItemOSUpdateWithWhereUniqueWithoutOsInput[]
    updateMany?: ItemOSUpdateManyWithWhereWithoutOsInput | ItemOSUpdateManyWithWhereWithoutOsInput[]
    deleteMany?: ItemOSScalarWhereInput | ItemOSScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ItemOSUncheckedUpdateManyWithoutOsNestedInput = {
    create?: XOR<ItemOSCreateWithoutOsInput, ItemOSUncheckedCreateWithoutOsInput> | ItemOSCreateWithoutOsInput[] | ItemOSUncheckedCreateWithoutOsInput[]
    connectOrCreate?: ItemOSCreateOrConnectWithoutOsInput | ItemOSCreateOrConnectWithoutOsInput[]
    upsert?: ItemOSUpsertWithWhereUniqueWithoutOsInput | ItemOSUpsertWithWhereUniqueWithoutOsInput[]
    createMany?: ItemOSCreateManyOsInputEnvelope
    set?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
    disconnect?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
    delete?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
    connect?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
    update?: ItemOSUpdateWithWhereUniqueWithoutOsInput | ItemOSUpdateWithWhereUniqueWithoutOsInput[]
    updateMany?: ItemOSUpdateManyWithWhereWithoutOsInput | ItemOSUpdateManyWithWhereWithoutOsInput[]
    deleteMany?: ItemOSScalarWhereInput | ItemOSScalarWhereInput[]
  }

  export type OrdemServicoCreateNestedOneWithoutItensUsadosInput = {
    create?: XOR<OrdemServicoCreateWithoutItensUsadosInput, OrdemServicoUncheckedCreateWithoutItensUsadosInput>
    connectOrCreate?: OrdemServicoCreateOrConnectWithoutItensUsadosInput
    connect?: OrdemServicoWhereUniqueInput
  }

  export type ItemEstoqueCreateNestedOneWithoutItensOSInput = {
    create?: XOR<ItemEstoqueCreateWithoutItensOSInput, ItemEstoqueUncheckedCreateWithoutItensOSInput>
    connectOrCreate?: ItemEstoqueCreateOrConnectWithoutItensOSInput
    connect?: ItemEstoqueWhereUniqueInput
  }

  export type OrdemServicoUpdateOneRequiredWithoutItensUsadosNestedInput = {
    create?: XOR<OrdemServicoCreateWithoutItensUsadosInput, OrdemServicoUncheckedCreateWithoutItensUsadosInput>
    connectOrCreate?: OrdemServicoCreateOrConnectWithoutItensUsadosInput
    upsert?: OrdemServicoUpsertWithoutItensUsadosInput
    connect?: OrdemServicoWhereUniqueInput
    update?: XOR<XOR<OrdemServicoUpdateToOneWithWhereWithoutItensUsadosInput, OrdemServicoUpdateWithoutItensUsadosInput>, OrdemServicoUncheckedUpdateWithoutItensUsadosInput>
  }

  export type ItemEstoqueUpdateOneRequiredWithoutItensOSNestedInput = {
    create?: XOR<ItemEstoqueCreateWithoutItensOSInput, ItemEstoqueUncheckedCreateWithoutItensOSInput>
    connectOrCreate?: ItemEstoqueCreateOrConnectWithoutItensOSInput
    upsert?: ItemEstoqueUpsertWithoutItensOSInput
    connect?: ItemEstoqueWhereUniqueInput
    update?: XOR<XOR<ItemEstoqueUpdateToOneWithWhereWithoutItensOSInput, ItemEstoqueUpdateWithoutItensOSInput>, ItemEstoqueUncheckedUpdateWithoutItensOSInput>
  }

  export type ItemOSCreateNestedManyWithoutItemInput = {
    create?: XOR<ItemOSCreateWithoutItemInput, ItemOSUncheckedCreateWithoutItemInput> | ItemOSCreateWithoutItemInput[] | ItemOSUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemOSCreateOrConnectWithoutItemInput | ItemOSCreateOrConnectWithoutItemInput[]
    createMany?: ItemOSCreateManyItemInputEnvelope
    connect?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
  }

  export type ItemOSUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<ItemOSCreateWithoutItemInput, ItemOSUncheckedCreateWithoutItemInput> | ItemOSCreateWithoutItemInput[] | ItemOSUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemOSCreateOrConnectWithoutItemInput | ItemOSCreateOrConnectWithoutItemInput[]
    createMany?: ItemOSCreateManyItemInputEnvelope
    connect?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
  }

  export type ItemOSUpdateManyWithoutItemNestedInput = {
    create?: XOR<ItemOSCreateWithoutItemInput, ItemOSUncheckedCreateWithoutItemInput> | ItemOSCreateWithoutItemInput[] | ItemOSUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemOSCreateOrConnectWithoutItemInput | ItemOSCreateOrConnectWithoutItemInput[]
    upsert?: ItemOSUpsertWithWhereUniqueWithoutItemInput | ItemOSUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ItemOSCreateManyItemInputEnvelope
    set?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
    disconnect?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
    delete?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
    connect?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
    update?: ItemOSUpdateWithWhereUniqueWithoutItemInput | ItemOSUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ItemOSUpdateManyWithWhereWithoutItemInput | ItemOSUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ItemOSScalarWhereInput | ItemOSScalarWhereInput[]
  }

  export type ItemOSUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<ItemOSCreateWithoutItemInput, ItemOSUncheckedCreateWithoutItemInput> | ItemOSCreateWithoutItemInput[] | ItemOSUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemOSCreateOrConnectWithoutItemInput | ItemOSCreateOrConnectWithoutItemInput[]
    upsert?: ItemOSUpsertWithWhereUniqueWithoutItemInput | ItemOSUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ItemOSCreateManyItemInputEnvelope
    set?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
    disconnect?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
    delete?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
    connect?: ItemOSWhereUniqueInput | ItemOSWhereUniqueInput[]
    update?: ItemOSUpdateWithWhereUniqueWithoutItemInput | ItemOSUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ItemOSUpdateManyWithWhereWithoutItemInput | ItemOSUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ItemOSScalarWhereInput | ItemOSScalarWhereInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PedidoLogCreateWithoutPedidoInput = {
    acao: string
    detalhes?: string | null
    usuario?: string
    createdAt?: Date | string
  }

  export type PedidoLogUncheckedCreateWithoutPedidoInput = {
    id?: number
    acao: string
    detalhes?: string | null
    usuario?: string
    createdAt?: Date | string
  }

  export type PedidoLogCreateOrConnectWithoutPedidoInput = {
    where: PedidoLogWhereUniqueInput
    create: XOR<PedidoLogCreateWithoutPedidoInput, PedidoLogUncheckedCreateWithoutPedidoInput>
  }

  export type PedidoLogCreateManyPedidoInputEnvelope = {
    data: PedidoLogCreateManyPedidoInput | PedidoLogCreateManyPedidoInput[]
    skipDuplicates?: boolean
  }

  export type PedidoLogUpsertWithWhereUniqueWithoutPedidoInput = {
    where: PedidoLogWhereUniqueInput
    update: XOR<PedidoLogUpdateWithoutPedidoInput, PedidoLogUncheckedUpdateWithoutPedidoInput>
    create: XOR<PedidoLogCreateWithoutPedidoInput, PedidoLogUncheckedCreateWithoutPedidoInput>
  }

  export type PedidoLogUpdateWithWhereUniqueWithoutPedidoInput = {
    where: PedidoLogWhereUniqueInput
    data: XOR<PedidoLogUpdateWithoutPedidoInput, PedidoLogUncheckedUpdateWithoutPedidoInput>
  }

  export type PedidoLogUpdateManyWithWhereWithoutPedidoInput = {
    where: PedidoLogScalarWhereInput
    data: XOR<PedidoLogUpdateManyMutationInput, PedidoLogUncheckedUpdateManyWithoutPedidoInput>
  }

  export type PedidoLogScalarWhereInput = {
    AND?: PedidoLogScalarWhereInput | PedidoLogScalarWhereInput[]
    OR?: PedidoLogScalarWhereInput[]
    NOT?: PedidoLogScalarWhereInput | PedidoLogScalarWhereInput[]
    id?: IntFilter<"PedidoLog"> | number
    pedidoId?: IntFilter<"PedidoLog"> | number
    acao?: StringFilter<"PedidoLog"> | string
    detalhes?: StringNullableFilter<"PedidoLog"> | string | null
    usuario?: StringFilter<"PedidoLog"> | string
    createdAt?: DateTimeFilter<"PedidoLog"> | Date | string
  }

  export type PedidoCreateWithoutLogsInput = {
    cliente: string
    descricao: string
    status?: string
    prioridade?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PedidoUncheckedCreateWithoutLogsInput = {
    id?: number
    cliente: string
    descricao: string
    status?: string
    prioridade?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PedidoCreateOrConnectWithoutLogsInput = {
    where: PedidoWhereUniqueInput
    create: XOR<PedidoCreateWithoutLogsInput, PedidoUncheckedCreateWithoutLogsInput>
  }

  export type PedidoUpsertWithoutLogsInput = {
    update: XOR<PedidoUpdateWithoutLogsInput, PedidoUncheckedUpdateWithoutLogsInput>
    create: XOR<PedidoCreateWithoutLogsInput, PedidoUncheckedCreateWithoutLogsInput>
    where?: PedidoWhereInput
  }

  export type PedidoUpdateToOneWithWhereWithoutLogsInput = {
    where?: PedidoWhereInput
    data: XOR<PedidoUpdateWithoutLogsInput, PedidoUncheckedUpdateWithoutLogsInput>
  }

  export type PedidoUpdateWithoutLogsInput = {
    cliente?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    prioridade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoUncheckedUpdateWithoutLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    prioridade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrdemServicoCreateWithoutChamadoInput = {
    numero: string
    cliente?: string | null
    descricao: string
    status?: string
    valorMaoObra?: number | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    itensUsados?: ItemOSCreateNestedManyWithoutOsInput
  }

  export type OrdemServicoUncheckedCreateWithoutChamadoInput = {
    id?: number
    numero: string
    cliente?: string | null
    descricao: string
    status?: string
    valorMaoObra?: number | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    itensUsados?: ItemOSUncheckedCreateNestedManyWithoutOsInput
  }

  export type OrdemServicoCreateOrConnectWithoutChamadoInput = {
    where: OrdemServicoWhereUniqueInput
    create: XOR<OrdemServicoCreateWithoutChamadoInput, OrdemServicoUncheckedCreateWithoutChamadoInput>
  }

  export type OrdemServicoCreateManyChamadoInputEnvelope = {
    data: OrdemServicoCreateManyChamadoInput | OrdemServicoCreateManyChamadoInput[]
    skipDuplicates?: boolean
  }

  export type OrdemServicoUpsertWithWhereUniqueWithoutChamadoInput = {
    where: OrdemServicoWhereUniqueInput
    update: XOR<OrdemServicoUpdateWithoutChamadoInput, OrdemServicoUncheckedUpdateWithoutChamadoInput>
    create: XOR<OrdemServicoCreateWithoutChamadoInput, OrdemServicoUncheckedCreateWithoutChamadoInput>
  }

  export type OrdemServicoUpdateWithWhereUniqueWithoutChamadoInput = {
    where: OrdemServicoWhereUniqueInput
    data: XOR<OrdemServicoUpdateWithoutChamadoInput, OrdemServicoUncheckedUpdateWithoutChamadoInput>
  }

  export type OrdemServicoUpdateManyWithWhereWithoutChamadoInput = {
    where: OrdemServicoScalarWhereInput
    data: XOR<OrdemServicoUpdateManyMutationInput, OrdemServicoUncheckedUpdateManyWithoutChamadoInput>
  }

  export type OrdemServicoScalarWhereInput = {
    AND?: OrdemServicoScalarWhereInput | OrdemServicoScalarWhereInput[]
    OR?: OrdemServicoScalarWhereInput[]
    NOT?: OrdemServicoScalarWhereInput | OrdemServicoScalarWhereInput[]
    id?: IntFilter<"OrdemServico"> | number
    numero?: StringFilter<"OrdemServico"> | string
    chamadoId?: IntNullableFilter<"OrdemServico"> | number | null
    cliente?: StringNullableFilter<"OrdemServico"> | string | null
    descricao?: StringFilter<"OrdemServico"> | string
    status?: StringFilter<"OrdemServico"> | string
    valorMaoObra?: FloatNullableFilter<"OrdemServico"> | number | null
    observacoes?: StringNullableFilter<"OrdemServico"> | string | null
    createdAt?: DateTimeFilter<"OrdemServico"> | Date | string
    updatedAt?: DateTimeFilter<"OrdemServico"> | Date | string
  }

  export type ChamadoCreateWithoutOrdensServicoInput = {
    titulo: string
    descricao: string
    prioridade?: string
    status?: string
    cliente?: string | null
    tecnico?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChamadoUncheckedCreateWithoutOrdensServicoInput = {
    id?: number
    titulo: string
    descricao: string
    prioridade?: string
    status?: string
    cliente?: string | null
    tecnico?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChamadoCreateOrConnectWithoutOrdensServicoInput = {
    where: ChamadoWhereUniqueInput
    create: XOR<ChamadoCreateWithoutOrdensServicoInput, ChamadoUncheckedCreateWithoutOrdensServicoInput>
  }

  export type ItemOSCreateWithoutOsInput = {
    quantidade: number
    valorUnitario?: number | null
    item: ItemEstoqueCreateNestedOneWithoutItensOSInput
  }

  export type ItemOSUncheckedCreateWithoutOsInput = {
    id?: number
    itemEstoqueId: number
    quantidade: number
    valorUnitario?: number | null
  }

  export type ItemOSCreateOrConnectWithoutOsInput = {
    where: ItemOSWhereUniqueInput
    create: XOR<ItemOSCreateWithoutOsInput, ItemOSUncheckedCreateWithoutOsInput>
  }

  export type ItemOSCreateManyOsInputEnvelope = {
    data: ItemOSCreateManyOsInput | ItemOSCreateManyOsInput[]
    skipDuplicates?: boolean
  }

  export type ChamadoUpsertWithoutOrdensServicoInput = {
    update: XOR<ChamadoUpdateWithoutOrdensServicoInput, ChamadoUncheckedUpdateWithoutOrdensServicoInput>
    create: XOR<ChamadoCreateWithoutOrdensServicoInput, ChamadoUncheckedCreateWithoutOrdensServicoInput>
    where?: ChamadoWhereInput
  }

  export type ChamadoUpdateToOneWithWhereWithoutOrdensServicoInput = {
    where?: ChamadoWhereInput
    data: XOR<ChamadoUpdateWithoutOrdensServicoInput, ChamadoUncheckedUpdateWithoutOrdensServicoInput>
  }

  export type ChamadoUpdateWithoutOrdensServicoInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    prioridade?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    tecnico?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChamadoUncheckedUpdateWithoutOrdensServicoInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    prioridade?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    tecnico?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemOSUpsertWithWhereUniqueWithoutOsInput = {
    where: ItemOSWhereUniqueInput
    update: XOR<ItemOSUpdateWithoutOsInput, ItemOSUncheckedUpdateWithoutOsInput>
    create: XOR<ItemOSCreateWithoutOsInput, ItemOSUncheckedCreateWithoutOsInput>
  }

  export type ItemOSUpdateWithWhereUniqueWithoutOsInput = {
    where: ItemOSWhereUniqueInput
    data: XOR<ItemOSUpdateWithoutOsInput, ItemOSUncheckedUpdateWithoutOsInput>
  }

  export type ItemOSUpdateManyWithWhereWithoutOsInput = {
    where: ItemOSScalarWhereInput
    data: XOR<ItemOSUpdateManyMutationInput, ItemOSUncheckedUpdateManyWithoutOsInput>
  }

  export type ItemOSScalarWhereInput = {
    AND?: ItemOSScalarWhereInput | ItemOSScalarWhereInput[]
    OR?: ItemOSScalarWhereInput[]
    NOT?: ItemOSScalarWhereInput | ItemOSScalarWhereInput[]
    id?: IntFilter<"ItemOS"> | number
    osId?: IntFilter<"ItemOS"> | number
    itemEstoqueId?: IntFilter<"ItemOS"> | number
    quantidade?: IntFilter<"ItemOS"> | number
    valorUnitario?: FloatNullableFilter<"ItemOS"> | number | null
  }

  export type OrdemServicoCreateWithoutItensUsadosInput = {
    numero: string
    cliente?: string | null
    descricao: string
    status?: string
    valorMaoObra?: number | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chamado?: ChamadoCreateNestedOneWithoutOrdensServicoInput
  }

  export type OrdemServicoUncheckedCreateWithoutItensUsadosInput = {
    id?: number
    numero: string
    chamadoId?: number | null
    cliente?: string | null
    descricao: string
    status?: string
    valorMaoObra?: number | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrdemServicoCreateOrConnectWithoutItensUsadosInput = {
    where: OrdemServicoWhereUniqueInput
    create: XOR<OrdemServicoCreateWithoutItensUsadosInput, OrdemServicoUncheckedCreateWithoutItensUsadosInput>
  }

  export type ItemEstoqueCreateWithoutItensOSInput = {
    codigo?: string | null
    nome: string
    descricao?: string | null
    categoria?: string | null
    quantidade?: number
    minimo?: number
    valorUnit?: number | null
    fornecedor?: string | null
    localizacao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemEstoqueUncheckedCreateWithoutItensOSInput = {
    id?: number
    codigo?: string | null
    nome: string
    descricao?: string | null
    categoria?: string | null
    quantidade?: number
    minimo?: number
    valorUnit?: number | null
    fornecedor?: string | null
    localizacao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemEstoqueCreateOrConnectWithoutItensOSInput = {
    where: ItemEstoqueWhereUniqueInput
    create: XOR<ItemEstoqueCreateWithoutItensOSInput, ItemEstoqueUncheckedCreateWithoutItensOSInput>
  }

  export type OrdemServicoUpsertWithoutItensUsadosInput = {
    update: XOR<OrdemServicoUpdateWithoutItensUsadosInput, OrdemServicoUncheckedUpdateWithoutItensUsadosInput>
    create: XOR<OrdemServicoCreateWithoutItensUsadosInput, OrdemServicoUncheckedCreateWithoutItensUsadosInput>
    where?: OrdemServicoWhereInput
  }

  export type OrdemServicoUpdateToOneWithWhereWithoutItensUsadosInput = {
    where?: OrdemServicoWhereInput
    data: XOR<OrdemServicoUpdateWithoutItensUsadosInput, OrdemServicoUncheckedUpdateWithoutItensUsadosInput>
  }

  export type OrdemServicoUpdateWithoutItensUsadosInput = {
    numero?: StringFieldUpdateOperationsInput | string
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    valorMaoObra?: NullableFloatFieldUpdateOperationsInput | number | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chamado?: ChamadoUpdateOneWithoutOrdensServicoNestedInput
  }

  export type OrdemServicoUncheckedUpdateWithoutItensUsadosInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    chamadoId?: NullableIntFieldUpdateOperationsInput | number | null
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    valorMaoObra?: NullableFloatFieldUpdateOperationsInput | number | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemEstoqueUpsertWithoutItensOSInput = {
    update: XOR<ItemEstoqueUpdateWithoutItensOSInput, ItemEstoqueUncheckedUpdateWithoutItensOSInput>
    create: XOR<ItemEstoqueCreateWithoutItensOSInput, ItemEstoqueUncheckedCreateWithoutItensOSInput>
    where?: ItemEstoqueWhereInput
  }

  export type ItemEstoqueUpdateToOneWithWhereWithoutItensOSInput = {
    where?: ItemEstoqueWhereInput
    data: XOR<ItemEstoqueUpdateWithoutItensOSInput, ItemEstoqueUncheckedUpdateWithoutItensOSInput>
  }

  export type ItemEstoqueUpdateWithoutItensOSInput = {
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: IntFieldUpdateOperationsInput | number
    minimo?: IntFieldUpdateOperationsInput | number
    valorUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    localizacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemEstoqueUncheckedUpdateWithoutItensOSInput = {
    id?: IntFieldUpdateOperationsInput | number
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: IntFieldUpdateOperationsInput | number
    minimo?: IntFieldUpdateOperationsInput | number
    valorUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    localizacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemOSCreateWithoutItemInput = {
    quantidade: number
    valorUnitario?: number | null
    os: OrdemServicoCreateNestedOneWithoutItensUsadosInput
  }

  export type ItemOSUncheckedCreateWithoutItemInput = {
    id?: number
    osId: number
    quantidade: number
    valorUnitario?: number | null
  }

  export type ItemOSCreateOrConnectWithoutItemInput = {
    where: ItemOSWhereUniqueInput
    create: XOR<ItemOSCreateWithoutItemInput, ItemOSUncheckedCreateWithoutItemInput>
  }

  export type ItemOSCreateManyItemInputEnvelope = {
    data: ItemOSCreateManyItemInput | ItemOSCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type ItemOSUpsertWithWhereUniqueWithoutItemInput = {
    where: ItemOSWhereUniqueInput
    update: XOR<ItemOSUpdateWithoutItemInput, ItemOSUncheckedUpdateWithoutItemInput>
    create: XOR<ItemOSCreateWithoutItemInput, ItemOSUncheckedCreateWithoutItemInput>
  }

  export type ItemOSUpdateWithWhereUniqueWithoutItemInput = {
    where: ItemOSWhereUniqueInput
    data: XOR<ItemOSUpdateWithoutItemInput, ItemOSUncheckedUpdateWithoutItemInput>
  }

  export type ItemOSUpdateManyWithWhereWithoutItemInput = {
    where: ItemOSScalarWhereInput
    data: XOR<ItemOSUpdateManyMutationInput, ItemOSUncheckedUpdateManyWithoutItemInput>
  }

  export type PedidoLogCreateManyPedidoInput = {
    id?: number
    acao: string
    detalhes?: string | null
    usuario?: string
    createdAt?: Date | string
  }

  export type PedidoLogUpdateWithoutPedidoInput = {
    acao?: StringFieldUpdateOperationsInput | string
    detalhes?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoLogUncheckedUpdateWithoutPedidoInput = {
    id?: IntFieldUpdateOperationsInput | number
    acao?: StringFieldUpdateOperationsInput | string
    detalhes?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidoLogUncheckedUpdateManyWithoutPedidoInput = {
    id?: IntFieldUpdateOperationsInput | number
    acao?: StringFieldUpdateOperationsInput | string
    detalhes?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrdemServicoCreateManyChamadoInput = {
    id?: number
    numero: string
    cliente?: string | null
    descricao: string
    status?: string
    valorMaoObra?: number | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrdemServicoUpdateWithoutChamadoInput = {
    numero?: StringFieldUpdateOperationsInput | string
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    valorMaoObra?: NullableFloatFieldUpdateOperationsInput | number | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itensUsados?: ItemOSUpdateManyWithoutOsNestedInput
  }

  export type OrdemServicoUncheckedUpdateWithoutChamadoInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    valorMaoObra?: NullableFloatFieldUpdateOperationsInput | number | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itensUsados?: ItemOSUncheckedUpdateManyWithoutOsNestedInput
  }

  export type OrdemServicoUncheckedUpdateManyWithoutChamadoInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    cliente?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    valorMaoObra?: NullableFloatFieldUpdateOperationsInput | number | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemOSCreateManyOsInput = {
    id?: number
    itemEstoqueId: number
    quantidade: number
    valorUnitario?: number | null
  }

  export type ItemOSUpdateWithoutOsInput = {
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
    item?: ItemEstoqueUpdateOneRequiredWithoutItensOSNestedInput
  }

  export type ItemOSUncheckedUpdateWithoutOsInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemEstoqueId?: IntFieldUpdateOperationsInput | number
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ItemOSUncheckedUpdateManyWithoutOsInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemEstoqueId?: IntFieldUpdateOperationsInput | number
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ItemOSCreateManyItemInput = {
    id?: number
    osId: number
    quantidade: number
    valorUnitario?: number | null
  }

  export type ItemOSUpdateWithoutItemInput = {
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
    os?: OrdemServicoUpdateOneRequiredWithoutItensUsadosNestedInput
  }

  export type ItemOSUncheckedUpdateWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    osId?: IntFieldUpdateOperationsInput | number
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ItemOSUncheckedUpdateManyWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    osId?: IntFieldUpdateOperationsInput | number
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: NullableFloatFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}