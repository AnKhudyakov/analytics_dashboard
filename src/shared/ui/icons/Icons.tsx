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

export const ArrowLeftIcon: FC<React.SVGProps<SVGSVGElement>> = ({
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
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.75005 7.36231L12.25 7.3623"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowRightIcon: FC<React.SVGProps<SVGSVGElement>> = ({
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
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.2499 7.36231L1.75 7.3623"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const YesIcon: FC<React.SVGProps<SVGSVGElement>> = ({
  width,
  height,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 40 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="18" rx="2" fill="#05C168" fillOpacity="0.2" />
    <rect
      x="0.3"
      y="0.3"
      width="39.4"
      height="17.4"
      rx="1.7"
      stroke="#05C168"
      strokeOpacity="0.2"
      strokeWidth="0.6"
    />
    <circle cx="7.5" cy="9" r="1.5" fill="#05C168" />
    <path
      d="M13.3068 5.27273H14.517L16.9375 9.34659H17.0398L19.4602 5.27273H20.6705L17.517 10.4034V14H16.4602V10.4034L13.3068 5.27273ZM23.7195 14.1364C23.0888 14.1364 22.5447 13.9972 22.0874 13.7188C21.6328 13.4375 21.282 13.0455 21.0348 12.5426C20.7905 12.0369 20.6683 11.4489 20.6683 10.7784C20.6683 10.108 20.7905 9.51705 21.0348 9.00568C21.282 8.49148 21.6257 8.09091 22.0661 7.80398C22.5092 7.5142 23.0263 7.36932 23.6172 7.36932C23.9581 7.36932 24.2947 7.42614 24.6271 7.53977C24.9595 7.65341 25.2621 7.83807 25.5348 8.09375C25.8075 8.34659 26.0249 8.68182 26.1868 9.09943C26.3487 9.51705 26.4297 10.0312 26.4297 10.642V11.0682H21.3842V10.1989H25.407C25.407 9.82955 25.3331 9.5 25.1854 9.21023C25.0405 8.92045 24.8331 8.69176 24.5632 8.52415C24.2962 8.35653 23.9808 8.27273 23.6172 8.27273C23.2166 8.27273 22.87 8.37216 22.5774 8.57102C22.2876 8.76705 22.0646 9.02273 21.9084 9.33807C21.7521 9.65341 21.674 9.99148 21.674 10.3523V10.9318C21.674 11.4261 21.7592 11.8452 21.9297 12.1889C22.103 12.5298 22.343 12.7898 22.6499 12.9688C22.9567 13.1449 23.3132 13.233 23.7195 13.233C23.9837 13.233 24.2223 13.196 24.4354 13.1222C24.6513 13.0455 24.8374 12.9318 24.9936 12.7812C25.1499 12.6278 25.2706 12.4375 25.3558 12.2102L26.3274 12.483C26.2251 12.8125 26.0533 13.1023 25.8118 13.3523C25.5703 13.5994 25.272 13.7926 24.9169 13.9318C24.5618 14.0682 24.1626 14.1364 23.7195 14.1364ZM32.5959 8.92045L31.6925 9.17614C31.6357 9.02557 31.5518 8.87926 31.4411 8.73722C31.3331 8.59233 31.1854 8.47301 30.9979 8.37926C30.8104 8.28551 30.5703 8.23864 30.2777 8.23864C29.8771 8.23864 29.5433 8.33097 29.2763 8.51562C29.0121 8.69744 28.88 8.92898 28.88 9.21023C28.88 9.46023 28.9709 9.65767 29.1527 9.80256C29.3345 9.94744 29.6186 10.0682 30.005 10.1648L30.9766 10.4034C31.5618 10.5455 31.9979 10.7628 32.2848 11.0554C32.5717 11.3452 32.7152 11.7187 32.7152 12.1761C32.7152 12.5511 32.6072 12.8864 32.3913 13.1818C32.1783 13.4773 31.88 13.7102 31.4964 13.8807C31.1129 14.0511 30.6669 14.1364 30.1584 14.1364C29.4908 14.1364 28.9382 13.9915 28.5007 13.7017C28.0632 13.4119 27.7862 12.9886 27.6697 12.4318L28.6243 12.1932C28.7152 12.5455 28.8871 12.8097 29.1399 12.9858C29.3956 13.1619 29.7294 13.25 30.1413 13.25C30.6101 13.25 30.9822 13.1506 31.2578 12.9517C31.5362 12.75 31.6754 12.5085 31.6754 12.2273C31.6754 12 31.5959 11.8097 31.4368 11.6562C31.2777 11.5 31.0334 11.3835 30.7038 11.3068L29.6129 11.0511C29.0135 10.9091 28.5732 10.6889 28.2919 10.3906C28.0135 10.0895 27.8743 9.71307 27.8743 9.26136C27.8743 8.89205 27.978 8.56534 28.1854 8.28125C28.3956 7.99716 28.6811 7.77415 29.0419 7.61222C29.4055 7.45028 29.8175 7.36932 30.2777 7.36932C30.9254 7.36932 31.4339 7.51136 31.8033 7.79545C32.1754 8.07955 32.4396 8.45455 32.5959 8.92045Z"
      fill="#14CA74"
    />
  </svg>
);

export const NoIcon: FC<React.SVGProps<SVGSVGElement>> = ({
  width,
  height,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 36 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="36" height="19" rx="2" fill="#FF5A65" fillOpacity="0.2" />
    <rect
      x="0.3"
      y="0.3"
      width="35.4"
      height="18.4"
      rx="1.7"
      stroke="#FF5A65"
      strokeOpacity="0.2"
      strokeWidth="0.6"
    />
    <circle cx="7.5" cy="9.5" r="1.5" fill="#FF5A65" />
    <path
      d="M20.9773 5.27273V14H19.9545L15.1989 7.14773H15.1136V14H14.0568V5.27273H15.0795L19.8523 12.142H19.9375V5.27273H20.9773ZM25.6147 14.1364C25.0238 14.1364 24.5053 13.9957 24.0593 13.7145C23.6161 13.4332 23.2695 13.0398 23.0195 12.5341C22.7724 12.0284 22.6488 11.4375 22.6488 10.7614C22.6488 10.0795 22.7724 9.48437 23.0195 8.97585C23.2695 8.46733 23.6161 8.07244 24.0593 7.79119C24.5053 7.50994 25.0238 7.36932 25.6147 7.36932C26.2056 7.36932 26.7227 7.50994 27.1658 7.79119C27.6119 8.07244 27.9585 8.46733 28.2056 8.97585C28.4556 9.48437 28.5806 10.0795 28.5806 10.7614C28.5806 11.4375 28.4556 12.0284 28.2056 12.5341C27.9585 13.0398 27.6119 13.4332 27.1658 13.7145C26.7227 13.9957 26.2056 14.1364 25.6147 14.1364ZM25.6147 13.233C26.0636 13.233 26.4329 13.1179 26.7227 12.8878C27.0124 12.6577 27.2269 12.3551 27.3661 11.9801C27.5053 11.6051 27.5749 11.1989 27.5749 10.7614C27.5749 10.3239 27.5053 9.91619 27.3661 9.53835C27.2269 9.16051 27.0124 8.85511 26.7227 8.62216C26.4329 8.3892 26.0636 8.27273 25.6147 8.27273C25.1658 8.27273 24.7965 8.3892 24.5067 8.62216C24.217 8.85511 24.0025 9.16051 23.8633 9.53835C23.7241 9.91619 23.6545 10.3239 23.6545 10.7614C23.6545 11.1989 23.7241 11.6051 23.8633 11.9801C24.0025 12.3551 24.217 12.6577 24.5067 12.8878C24.7965 13.1179 25.1658 13.233 25.6147 13.233Z"
      fill="#FF5A65"
    />
  </svg>
);

export const SpinnerIcon: FC<React.SVGProps<SVGSVGElement>> = ({
  width,
  height,
  className,
}) => (
  <svg
    aria-hidden="true"
    width={width}
    height={height}
    className={className}
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);

export const ArrowGrowIcon: FC<React.SVGProps<SVGSVGElement>> = ({
  width,
  height,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.74748 7.01025L7.08081 1.67692"
      stroke="#14CA74"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.08081 6.70508V1.67679H2.05253"
      stroke="#14CA74"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowFallIcon: FC<React.SVGProps<SVGSVGElement>> = ({
  width,
  height,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.26001 1.67692L7.59334 7.01025"
      stroke="#FF5A65"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.56506 7.01025L7.59335 7.01025L7.59335 1.98197"
      stroke="#FF5A65"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ExitIcon: FC<React.SVGProps<SVGSVGElement>> = ({
  width,
  height,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="0.5"
      width="39"
      height="39"
      rx="6"
      ry="6"
      fill="currentColor"
    />
    <rect
      x="0.5"
      y="0.5"
      width="39"
      height="39"
      rx="6"
      ry="6"
      stroke="#626C77"
    />
    <path
      d="M18 26H15.3333C14.9797 26 14.6406 25.8595 14.3905 25.6095C14.1405 25.3594 14 25.0203 14 24.6667V15.3333C14 14.9797 14.1405 14.6406 14.3905 14.3905C14.6406 14.1405 14.9797 14 15.3333 14H18"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.6665 23.3327L25.9998 19.9993L22.6665 16.666"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26 20H18"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
