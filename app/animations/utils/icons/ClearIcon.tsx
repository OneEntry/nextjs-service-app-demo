import type { FC } from 'react';

const ClearIcon: FC<{ cn: string }> = ({ cn }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn}
    >
      <path
        opacity="0.9"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.4541 19.3246L4.57542 21.4459L12.0001 14.0213L19.4247 21.4459L21.5461 19.3246L14.1214 11.9L21.546 4.47539L19.4247 2.35406L12.0001 9.77864L4.57551 2.35406L2.45419 4.47539L9.87877 11.9L2.4541 19.3246Z"
        fill="#363636"
      />
    </svg>
  );
};

export default ClearIcon;
