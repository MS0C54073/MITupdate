
'use client';

import type { FC } from 'react';
import { useTranslatedText } from '@/app/translator';

interface TranslatedTextProps {
  text: string;
}

const TranslatedText: FC<TranslatedTextProps> = ({ text }) => {
  const translatedText = useTranslatedText(text);
  return <>{translatedText}</>;
};

export default TranslatedText;
