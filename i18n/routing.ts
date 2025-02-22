import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation';
import { locales, defaultLocale, pathnames, localePrefix } from './locale';

export const { Link, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation({
  locales,
  defaultLocale,
  pathnames,
  localePrefix
});
