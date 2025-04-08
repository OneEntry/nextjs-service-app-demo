import type { FC } from 'react';

const NextIcon: FC<{ cn: string }> = ({ cn }) => {
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
        d="M24.8999 24.9H18.8999V12.9L0.899902 24.9V0.900024L18.8999 12.9V0.900024H24.8999V24.9Z"
        fill="#363636"
      />
    </svg>
  );
};

export default NextIcon;
