
'use client';

import type { FC } from 'react';
import { useTranslated } from '@/app/translator';

interface TranslatedTextProps {
  text: string;
}

const TranslatedText: FC<TranslatedTextProps> = ({ text }) => {
  const translatedText = useTranslated(text);
  return <>{translatedText}</>;
};

export default TranslatedText;
