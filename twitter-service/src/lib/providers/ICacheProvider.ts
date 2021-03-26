export interface ICacheProvider {
  get(name: string): Promise<any>;
  set(name: string, data: any, time: number): Promise<void>;
  disconnect(): void;
  connect(): void;
}
