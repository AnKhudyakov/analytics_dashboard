import { ScaleType } from "recharts/types/util/types";

export interface ChartProps {
  data: any[];
  dataKeys: { color: string; field: string }[];
  legendLabels: Record<string, string>;
  biaxial?: boolean;
  Yscale?: ScaleType
}
