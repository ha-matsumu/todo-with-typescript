// Payloadなし
export interface Action<Type> {
  type: Type;
}

// Payloadあり
export interface PayloadAction<Type, Payload> {
  type: Type;
  payload: Payload;
}
