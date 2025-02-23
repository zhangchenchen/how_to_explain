import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale, localePrefix } from '@/i18n/locale';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false,
  localePrefix
});

export const config = {
  matcher: [
    '/((?!api|_next|.*\\.|auth).*)',
    '/legal/:path*',
    '/auth/:path*',
    '/privacy-policy',
    '/terms-of-service'
  ]
};