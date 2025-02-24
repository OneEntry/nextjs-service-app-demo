import { type FC } from 'react';

const SectionTitle: FC<{ title: string; color: string }> = ({
  title,
  color,
}) => {
  return (
    <h2
      className={'mb-6 self-center text-4xl font-light uppercase'}
      style={{ color: color }}
    >
      {title}
    </h2>
  );
};

export default SectionTitle;
