
'use client';

import type { FC } from 'react';

interface TranslatedTextProps {
  text: string;
}

const TranslatedText: FC<TranslatedTextProps> = ({ text }) => {
  return <>{text}</>;
};

export default TranslatedText;
