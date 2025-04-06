export interface ChartProps {
  data: any[];
  dataKeys: { color: string; field: string }[];
  legendLabels: Record<string, string>;
  biaxial?: boolean;
  log?: boolean
}
