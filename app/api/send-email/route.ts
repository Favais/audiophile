import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
    try {
        const { email, name, orderId, items, totals, address, city, country, phone, orderUrl } = await req.json();

        const itemsList = items
            .map((item: any) =>
                `<tr style="border-bottom: 1px solid #eeeeee;">
                <td style="padding: 8px 0;">${item.name} (x${item.quantity})</td>
                <td style="text-align: right;">₦${item.price * item.quantity}</td>
            </tr>`
            )
            .join("");

        const html = `
        <!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Confirmation</title>
  </head>
  <body
    style="
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f6f6f6;
    "
  >
    <table
      align="center"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="max-width: 600px; background: white; margin: 40px auto; border-radius: 8px; overflow: hidden;"
    >
      <tr>
        <td style="background: #101010; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Audiophile</h1>
        </td>
      </tr>

      <tr>
        <td style="padding: 30px;">
          <h2 style="color: #101010; margin-bottom: 10px;">Hi ${name},</h2>
          <p style="color: #555555; line-height: 1.6;">
            Thank you for your order! Your purchase has been received and is now being processed.
          </p>

          <p style="color: #555555; line-height: 1.6;">
            Your <strong>Order ID:</strong> <span style="color: #d87d4a;">${orderId}</span>
          </p>

          <h3 style="color: #101010; margin-top: 30px;">Order Summary</h3>
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="margin-top: 10px; border-collapse: collapse;"
          >
                ${itemsList}
          </table>

          <table width="100%" style="margin-top: 20px;">
            <tr>
              <td style="color: #555;">Subtotal</td>
              <td style="text-align: right;">₦${totals.subtotal}</td>
            </tr>
            <tr>
              <td style="color: #555;">Shipping</td>
              <td style="text-align: right;">₦${totals.shipping}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #101010;">Grand Total</td>
              <td style="text-align: right; font-weight: bold; color: #d87d4a;">₦${totals.grandTotal}</td>
            </tr>
          </table>

          <h3 style="color: #101010; margin-top: 30px;">Shipping Details</h3>
          <p style="color: #555555; line-height: 1.6;">
            ${address}<br />
            ${city}, ${country}<br />
            Phone: ${phone}
          </p>

          <div style="text-align: center; margin-top: 40px;">
            <a
              href="${orderUrl}"
              style="
                background: #d87d4a;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
              "
            >
              View Your Order
            </a>
          </div>

          <p style="color: #999999; font-size: 12px; text-align: center; margin-top: 40px;">
            If you have any questions, contact us at
            <a href="mailto:support@audiophile.com" style="color: #d87d4a; text-decoration: none;">support@audiophile.com</a>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>

    `;

        const response = await resend.emails.send({
            from: "Audiophile <onboarding@resend.dev>",
            to: email,
            subject: `Your Audiophile Order Confirmation — #${orderId}`,
            html,
        });
        console.log(response);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error });
    }
}