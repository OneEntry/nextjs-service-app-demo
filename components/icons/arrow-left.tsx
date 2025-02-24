const ArrowLeftIcon = (props?: { active?: boolean }) => {
  return (
    <svg
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
        d="M25 1.5L3 21L25 43"
        // stroke="#ED21F1"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ArrowLeftIcon;
