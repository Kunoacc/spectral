export interface Response<T> {
  record: T,
  metadata: {
    id: string,
    private: boolean,
    createdAt: string
  }
}