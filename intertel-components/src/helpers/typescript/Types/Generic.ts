type OptionalType<Type> = Type | undefined;
type NullableType<Type> = Type | null;
type OptionalNullableType<Type> = OptionalType<NullableType<Type>>;

export type { OptionalType, NullableType, OptionalNullableType };
