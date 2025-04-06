export interface CustomBarChartProps {
  data: any[];
  dataKeys: { color: string; field: string }[];
  legendLabels: Record<string, string>;
}
