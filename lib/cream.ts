import crypto from 'crypto';

interface RedirectParams {
  request_id?: string | null;
  checkout_id?: string | null;
  order_id?: string | null;
  customer_id?: string | null;
  subscription_id?: string | null;
  product_id?: string | null;
}

export function verifyCreamSignature(params: RedirectParams, signature: string, apiKey: string): boolean {
  try {
    const data = Object.entries(params)
      .filter(([_, value]) => value !== null && value !== undefined) // 过滤掉空值
      .sort(([a], [b]) => a.localeCompare(b)) // 按键名排序
      .map(([key, value]) => `${key}=${value}`)
      .concat(`salt=${apiKey}`)
      .join('|');

    const calculatedSignature = crypto.createHash('sha256').update(data).digest('hex');
    return calculatedSignature === signature;
  } catch (e) {
    console.error('Signature verification failed:', e);
    return false;
  }
} 