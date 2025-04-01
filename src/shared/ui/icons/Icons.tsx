import { FC } from 'react';

export const SearchIcon: FC<React.SVGProps<SVGSVGElement>> = ({
  width,
  height,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.2593 12.9445C10.5321 12.9445 13.1852 10.2914 13.1852 7.01858C13.1852 3.74578 10.5321 1.09265 7.2593 1.09265C3.9865 1.09265 1.33337 3.74578 1.33337 7.01858C1.33337 10.2914 3.9865 12.9445 7.2593 12.9445Z"
      stroke="#AEB9E1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.6666 14.426L11.4444 11.2037"
      stroke="#AEB9E1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HomeIcon: FC<React.SVGProps<SVGSVGElement>> = ({
  width,
  height,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.0683594 6.83355C0.0683594 6.41283 0.249846 6.01216 0.567115 5.73244L6.07891 0.872996C6.643 0.375668 7.49372 0.375668 8.05781 0.872996L13.5696 5.73244C13.8869 6.01216 14.0684 6.41283 14.0684 6.83355V13.0259C14.0684 13.84 13.4021 14.5 12.5802 14.5H1.55656C0.73465 14.5 0.0683594 13.84 0.0683594 13.0259V6.83355Z"
      fill="#D1DBF9"
    />
  </svg>
);

export const arrowLeftIcon: FC<React.SVGProps<SVGSVGElement>> = ({
  width,
  height,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.68555 2.4268L1.75004 7.36231L6.68555 12.2978"
      stroke="#7E89AC"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.75005 7.36231L12.25 7.3623"
      stroke="#7E89AC"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const arrowRightIcon: FC<React.SVGProps<SVGSVGElement>> = ({
  width,
  height,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.31445 2.4268L12.25 7.36231L7.31445 12.2978"
      stroke="#7E89AC"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.2499 7.36231L1.75 7.3623"
      stroke="#7E89AC"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
