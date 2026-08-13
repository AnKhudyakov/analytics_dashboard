import { type FC } from 'react';

import { STEP_COLORS } from 'shared/ui/Chart/chartTheme';

import {
  Bar,
  Label,
  List,
  Row,
  Share,
  Step,
  Track,
  Value,
} from './FunnelSteps.styles';

export interface FunnelStep {
  key: string;
  label: string;
  value: number;
  formattedValue: string;
}

interface FunnelStepsProps {
  steps: readonly FunnelStep[];
  caption: string;
}

export const FunnelSteps: FC<FunnelStepsProps> = ({ steps, caption }) => {
  const top = steps[0]?.value ?? 0;

  return (
    <List aria-label={caption}>
      {steps.map((step, index) => {
        const share = top ? (step.value / top) * 100 : 0;

        return (
          <Step key={step.key}>
            <Row>
              <Label>{step.label}</Label>
              <Value>{step.formattedValue}</Value>
            </Row>
            <Track>
              <Bar
                style={{
                  width: `${Math.max(share, 4)}%`,
                  backgroundColor: STEP_COLORS[index % STEP_COLORS.length],
                }}
              >
                {share >= 18 && <Share>{share.toFixed(1)}%</Share>}
              </Bar>
            </Track>
          </Step>
        );
      })}
    </List>
  );
};
