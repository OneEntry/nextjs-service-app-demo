// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ArrowRightIcon = (props: { active?: boolean; ref?: any }) => {
  return (
    <svg
      ref={props.ref}
      width="27"
      height="45"
      viewBox="0 0 27 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={
        'size-full group-hover:stroke-fuchsia-500 transition-colors duration-300 ' +
        (props?.active ? 'stroke-fuchsia-500' : 'stroke-[#B0BCCE]')
      }
    >
      <path
        d="M2 43L24 23.5L2 1.5"
        // stroke="#ED21F1"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ArrowRightIcon;
