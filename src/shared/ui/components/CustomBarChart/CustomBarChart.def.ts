import { ScaleType } from "recharts/types/util/types";

export interface CustomBarChartProps {
  data: any[];
  dataKeys: { color: string; field: string }[];
  legendLabels: Record<string, string>;
  Yscale?: ScaleType
}
