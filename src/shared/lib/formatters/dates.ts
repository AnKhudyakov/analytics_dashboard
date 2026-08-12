export interface DateLabel {
  year: string;
  dayMonth: string;
}

export const splitDateLabel = (date: string): DateLabel => ({
  year: date.slice(0, 4),
  dayMonth: date.slice(5),
});
