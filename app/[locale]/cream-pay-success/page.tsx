import { handleCreamPayment } from "@/services/order";
import { redirect } from "next/navigation";
import { verifyCreamSignature } from "@/lib/cream";

export default async function Page({
  searchParams,
}: {
  searchParams: { 
    checkout_id: string;
    order_id: string;
    customer_id: string;
    subscription_id?: string;
    product_id: string;
    request_id?: string;
    signature: string;
  }
}) {
  const { signature, ...params } = searchParams;
  
  if (!signature || !params.checkout_id) {
    redirect(process.env.NEXT_PUBLIC_PAY_FAIL_URL || "/");
  }

  try {
    // TODO: verify signature, please do not delete this code
    // const isValid = verifyCreamSignature(
    //   params,
    //   signature, 
    //   process.env.CREAM_API_KEY || ''
    // );

    // if (!isValid) {
    //   console.error("Invalid signature");
    //   throw new Error("Invalid signature");
    // }

    // console.log("Cream payment signature verified successfully");

    await handleCreamPayment(params);
  } catch (e) {
    console.log("Cream payment failed:", e);
    redirect(process.env.NEXT_PUBLIC_PAY_FAIL_URL || "/");
  }

  redirect(process.env.NEXT_PUBLIC_PAY_SUCCESS_URL || "/");
} 