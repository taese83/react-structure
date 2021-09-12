import i18n from 'i18next';
import {
  initReactI18next,
  useTranslation as useTranslate,
} from 'react-i18next';
import lang from './lang';

const rtlCodes = [
  'ar', // Arabic
  'iw', // Hebrew
  'fa', // Persian
];

const noSpacingCodes = [
  'ja', // japanese
  'zh', // chinese
];

const isRtl = (langCode) => rtlCodes.includes(langCode?.slice(0, 2));

const isNoSpacing = (langCode) =>
  noSpacingCodes.includes(langCode?.slice(0, 2));

const languageChanged = (langCode) => {
  if (!langCode) {
    return;
  }
  const body = document.body;
  body.style.direction = isRtl(langCode) ? 'rtl' : 'ltr';
  body.style.wordBreak = isNoSpacing(langCode) ? 'break-all' : '';
};

export const init = (
  langCode = navigator.language || navigator.userLanguage,
) => {
  const resources = {};
  for (let key in lang) {
    resources[key] = { translation: lang[key].lng };
  }

  return i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: langCode,
      debug: process.env.NODE_ENV === 'development',
      keySeparator: false,
      nsSeparator: false,
      interpolation: {
        escapeValue: false,
        useRawValueToEscape: true,
      },
      fallbackLng: langCode,
    });
};

export const changeLanguage = (langCode) => {
  if (i18n.language === langCode) return;
  languageChanged(langCode);
  return i18n.changeLanguage(langCode);
};
export const useTranslation = () => useTranslate();
export const t = (index) => i18n.t(index);
