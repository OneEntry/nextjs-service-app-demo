import clsx from 'clsx';

const DropdownIcon = ({ isActive }: { isActive: boolean }) => {
  return (
    <svg
      width="27"
      height="15"
      viewBox="0 0 27 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        'size-[14px]',
        isActive ? 'fill-fuchsia-500 text-fuchsia-500' : 'fill-current',
        'transition-colors',
      )}
    >
      <path d="M12.8531 12.75L11.8278 13.8449L12.8531 14.805L13.8784 13.8449L12.8531 12.75ZM25.625 2.84488C26.2296 2.27863 26.2608 1.32939 25.6945 0.724704C25.1283 0.120017 24.1791 0.0888621 23.5744 0.655118L25.625 2.84488ZM0.0812407 2.84488L11.8278 13.8449L13.8784 11.6551L2.13183 0.655118L0.0812407 2.84488ZM13.8784 13.8449L25.625 2.84488L23.5744 0.655118L11.8278 11.6551L13.8784 13.8449Z" />
    </svg>
  );
};

export default DropdownIcon;
