import { CreditsTransType, increaseCredits } from "./credit";
import { findOrderByOrderNo, updateOrderStatus } from "@/models/order";
import { getIsoTimestr, getOneYearLaterTimestr } from "@/lib/time";

import Stripe from "stripe";

export async function handleOrderSession(session: Stripe.Checkout.Session) {
  try {
    if (
      !session ||
      !session.metadata ||
      !session.metadata.order_no ||
      session.payment_status !== "paid"
    ) {
      throw new Error("invalid session");
    }

    const order_no = session.metadata.order_no;
    const paid_email =
      session.customer_details?.email || session.customer_email || "";
    const paid_detail = JSON.stringify(session);

    const order = await findOrderByOrderNo(order_no);
    if (!order || order.status !== "created") {
      throw new Error("invalid order");
    }

    const paid_at = getIsoTimestr();
    await updateOrderStatus(order_no, "paid", paid_at, paid_email, paid_detail);

    if (order.user_uuid && order.credits > 0) {
      // increase credits for paied order
      await increaseCredits({
        user_uuid: order.user_uuid,
        trans_type: CreditsTransType.OrderPay,
        credits: order.credits,
        expired_at: order.expired_at,
        order_no: order_no,
      });
    }

    console.log(
      "handle order session successed: ",
      order_no,
      paid_at,
      paid_email,
      paid_detail
    );
  } catch (e) {
    console.log("handle order session failed: ", e);
    throw e;
  }
}

interface CreamPaymentParams {
  checkout_id: string;
  order_id: string;
  customer_id: string;
  subscription_id?: string;
  product_id: string;
  request_id?: string;
}

export async function handleCreamPayment(params: CreamPaymentParams) {
  try {
    // request_id 就是我们的 order_no
    const order_no = params.request_id;
    if (!order_no) {
      throw new Error("invalid request_id");
    }

    const order = await findOrderByOrderNo(order_no);
    if (!order || order.status !== "created") {
      throw new Error("invalid order");
    }

    const paid_at = getIsoTimestr();
    const paid_detail = JSON.stringify(params);

    // 更新订单状态
    await updateOrderStatus(
      order_no,
      "paid",
      paid_at,
      order.user_email, // 使用订单中的邮箱
      paid_detail
    );

    // 增加用户积分
    if (order.user_uuid && order.credits > 0) {
      await increaseCredits({
        user_uuid: order.user_uuid,
        trans_type: CreditsTransType.OrderPay,
        credits: order.credits,
        expired_at: order.expired_at,
        order_no: order_no,
      });
    }

    console.log(
      "handle cream payment successed: ",
      order_no,
      paid_at,
      order.user_email,
      paid_detail
    );
  } catch (e) {
    console.log("handle cream payment failed: ", e);
    throw e;
  }
}

export async function handleCreamPaymentEvent(params: CreamPaymentParams) {
  try {
    // request_id 就是我们的 order_no
    const order_no = params.request_id;
    if (!order_no) {
      throw new Error("invalid request_id");
    }

    const order = await findOrderByOrderNo(order_no);
    if (!order) {
      throw new Error("invalid order");
    }

    if (order.status == "paid") {
      return;
    }

    const paid_at = getIsoTimestr();
    const paid_detail = JSON.stringify(params);

    // 更新订单状态
    await updateOrderStatus(
      order_no,
      "paid",
      paid_at,
      order.user_email, // 使用订单中的邮箱
      paid_detail
    );

    // 增加用户积分
    if (order.user_uuid && order.credits > 0) {
      await increaseCredits({
        user_uuid: order.user_uuid,
        trans_type: CreditsTransType.OrderPay,
        credits: order.credits,
        expired_at: order.expired_at,
        order_no: order_no,
      });
    }

    console.log(
      "handle cream payment successed: ",
      order_no,
      paid_at,
      order.user_email,
      paid_detail
    );
  } catch (e) {
    console.log("handle cream payment failed: ", e);
    throw e;
  }
}