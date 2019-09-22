export interface Action<Type> {
  type: Type;
}

export interface PayloadAction<Type, Payload> {
  type: Type;
  payload: Payload;
}
