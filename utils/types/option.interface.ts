export interface Option {
  id: number,
  text: string,
  followUpText: string,
  isVisible: Function,
  action: Function
}