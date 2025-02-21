import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  // 配置支持的语言
  locales: ['en', 'zh'],
  // 默认语言
  defaultLocale: 'en',
  // 是否从请求头中检测语言
  localeDetection: false
});

export const config = {
  // 匹配所有路径除了 /api/*, /_next/*, /imgs/* 等
  matcher: ['/((?!api|_next|imgs|.*\\..*).*)']
};
