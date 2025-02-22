import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  // 配置支持的语言
  locales: ['en', 'zh'],
  // 默认语言
  defaultLocale: 'en',
  // 是否从请求头中检测语言
  localeDetection: false,
  // 添加这个配置来处理 auth 回调
  localePrefix: 'as-needed',  // 这将允许某些路径不带语言前缀
});

export const config = {
  matcher: [
    // 需要国际化的路由
    '/((?!api|_next|imgs|.*\\.|auth).*)',
    // Auth 相关路由单独处理
    '/auth/:path*'
  ]
};
