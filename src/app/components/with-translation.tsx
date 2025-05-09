
import React from 'react';
import { useTranslated } from '@/app/translator';

// HOC for translating components
export function withTranslation<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithTranslation(props: P) {
    const translatedProps: { [key: string]: any } = {};

    for (const key in props) {
      if (typeof props[key] === 'string') {
        translatedProps[key] = useTranslated(props[key]);
      } else {
        translatedProps[key] = props[key];
      }
    }

    return <WrappedComponent {...(translatedProps as P)} />;
  };
}

