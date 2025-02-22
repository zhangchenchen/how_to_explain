import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from '@/i18n/locale';

export default createMiddleware({
  // 配置支持的语言
  locales,
  // 默认语言
  defaultLocale,
  // 是否从请求头中检测语言
  localeDetection: false,
  // 添加这个配置来处理 auth 回调
  localePrefix
});

export const config = {
  matcher: [
    // 需要国际化的路由
    '/((?!api|_next|.*\\.|auth).*)',
    // Auth 相关路由单独处理
    '/auth/:path*'
  ]
};
