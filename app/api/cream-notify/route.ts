import { handleCreamPaymentEvent } from "@/services/order";
import { respOk } from "@/lib/resp";
import crypto from 'crypto';

// 验证 Cream 签名
function verifySignature(payload: string, signature: string, secret: string): boolean {
  const computedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return computedSignature === signature;
}

export async function POST(req: Request) {
  try {
    const webhookSecret = process.env.CREAM_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error("invalid cream webhook config");
    }

    // 获取签名和请求体
    const signature = req.headers.get("creem-signature");
    const body = await req.text();
    
    
    if (!signature || !body) {
      throw new Error("invalid notify data");
    }

    // 验证签名
    const isValid = verifySignature(body, signature, webhookSecret);
    
    if (!isValid) {
      throw new Error("invalid signature");
    }

    const event = JSON.parse(body);

    // 处理不同类型的事件
    switch (event.eventType) {
      case "checkout.completed": {
        const session = event.object;

        if (session.status !== "completed") {
          throw new Error("checkout not completed");
        }

        // 处理订单
        await handleCreamPaymentEvent({
          checkout_id: session.id,
          order_id: session.request_id,
          customer_id: session.customer,
          product_id: session.product.id,
          subscription_id: session.subscription?.id,
          request_id: session.request_id
        });
        break;
      }

      case "subscription.paid": {
        // 处理订阅支付成功
        console.log("subscription paid:", event.object);
        break;
      }

      case "subscription.canceled": {
        // 处理订阅取消
        console.log("subscription canceled:", event.object);
        break;
      }

      default:
        console.log("unhandled event type:", event.eventType);
    }

    return respOk();
  } catch (e: any) {
    console.error("Cream webhook error:", {
      message: e.message,
      stack: e.stack
    });
    return Response.json(
      { error: `handle cream notify failed: ${e.message}` },
      { status: 500 }
    );
  }
} 