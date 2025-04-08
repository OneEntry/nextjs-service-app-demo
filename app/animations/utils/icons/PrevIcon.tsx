import type { FC } from 'react';

const PrevIcon: FC<{ cn: string }> = ({ cn }) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn}
    >
      <path
        opacity="0.9"
        d="M24.8999 24.9L6.8999 12.9V24.9H0.899902V0.900024H6.8999V12.9L24.8999 0.900024V24.9Z"
        fill="#363636"
      />
    </svg>
  );
};

export default PrevIcon;
