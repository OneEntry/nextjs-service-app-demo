import type { FC } from 'react';

const PauseIcon: FC<{ cn: string }> = ({ cn }) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn}
    >
      <path d="M4 24.9H10V0.900024H4V24.9Z" fill="#363636" />
      <path d="M15 24.9H21V0.900024H15V24.9Z" fill="#363636" />
    </svg>
  );
};

export default PauseIcon;
