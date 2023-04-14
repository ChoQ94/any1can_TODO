export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export interface DateProps {
  year: number | string;
  month: number | string;
  day: number | string;
}
