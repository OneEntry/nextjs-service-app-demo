'use client';

import type { FC } from 'react';

interface NotFoundProps {
  message: string;
}

const NotFound: FC<NotFoundProps> = ({ message }) => {
  return <div className="text-center text-gray-700">{message}</div>;
};

export default NotFound;
