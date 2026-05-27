'use client'

import PolicyLayout from '@/components/PolicyLayout'

export default function RefundPolicyPage() {
  return (
    <PolicyLayout
      title="Refund Policy"
      lastUpdated="May 27, 2026"
      activeHref="/policies/refund-policy"
    >
      <h2>Overview</h2>
      <p>
        At SDASMS Africa, we strive to provide exceptional service and value to all our customers. We understand that there may be circumstances where you need to request a refund or cancel a service. This Refund Policy outlines the terms and conditions under which refunds are issued, the process for requesting a refund, and the timeline for processing your request. By purchasing any of our services or SMS credit packages, you agree to the terms outlined in this Refund Policy.
      </p>
      <p>
        We recommend reading this policy carefully before making a purchase. If you have any questions regarding our refund process, please contact our support team before completing your transaction.
      </p>

      <h2>SMS Credits</h2>
      <h3>Purchased Credits</h3>
      <p>
        SMS credits purchased through the SDASMS platform are non-refundable once they have been credited to your account. Credits are considered delivered and accepted at the point of purchase. We encourage you to purchase only the number of credits you reasonably expect to use. Credits do not expire and remain available in your account indefinitely until used, so there is no time pressure to use them immediately.
      </p>
      <h3>Unused Credits</h3>
      <p>
        If you have a significant balance of unused credits and wish to close your account, you may request a refund for credits that have never been used, subject to the following conditions: the refund request must be made within 30 days of the original purchase; a minimum unused balance of 500 credits must remain; and an administrative fee of 10% of the refund amount will be deducted to cover processing costs. Refunds for unused credits will be issued to the original payment method.
      </p>

      <h2>Subscription Plans</h2>
      <h3>Monthly Subscriptions</h3>
      <p>
        Monthly subscription plans can be cancelled at any time. Upon cancellation, your subscription will remain active until the end of the current billing period. No partial refunds are issued for unused days within a billing period. You will continue to have full access to all features included in your plan until the subscription expires at the end of the billing cycle. After cancellation, your account will revert to the free tier or basic plan, and any data associated with premium features may be archived.
      </p>
      <h3>Annual Subscriptions</h3>
      <p>
        Annual subscription plans are eligible for a pro-rated refund if cancelled within the first 30 days of the subscription period. The refund amount will be calculated based on the remaining full months of the subscription, less a 15% administrative fee. After the initial 30-day period, annual subscriptions are non-refundable. However, you may cancel at any time, and the subscription will remain active until the end of the annual billing period.
      </p>

      <h2>Service-Level Issues</h2>
      <p>
        If you experience a service outage or degradation that prevents you from using the platform as intended, you may be eligible for a service credit or partial refund. To qualify, the issue must be reported to our support team within 48 hours of occurrence, and the service interruption must be verified by our technical team. Service credits are calculated based on the duration of the outage relative to your monthly subscription fee. Platform maintenance windows, as communicated in advance, are not considered service outages.
      </p>
      <p>
        We take service reliability seriously and maintain a 99.5% uptime commitment. In the event of a prolonged outage exceeding 4 consecutive hours, affected customers will automatically receive a service credit equivalent to 10 times the pro-rated cost of the downtime period.
      </p>

      <h2>Delivery Failures</h2>
      <p>
        If SMS messages fail to deliver due to platform errors, network issues on our end, or carrier problems within our control, we will credit your account for the failed messages. To request a credit for failed deliveries, you must submit a support ticket within 7 days of the failed delivery with the relevant message IDs and delivery reports. Our team will investigate and credit your account within 5 business days if the failure is confirmed. Messages that are undelivered due to invalid recipient numbers, recipient opt-outs, or carrier filtering are not eligible for credits.
      </p>

      <h2>How to Request a Refund</h2>
      <p>
        To request a refund, please follow these steps:
      </p>
      <ul>
        <li>Log in to your SDASMS account and navigate to the Support section</li>
        <li>Submit a support ticket with the subject line &quot;Refund Request&quot;</li>
        <li>Include your account details, the transaction reference number, and the reason for the refund request</li>
        <li>Our team will review your request within 3 business days and respond with a decision or request for additional information</li>
        <li>If approved, the refund will be processed within 7 to 14 business days, depending on your payment method</li>
      </ul>
      <p>
        Refunds will be issued to the original payment method used for the purchase. If the original payment method is no longer available, please contact our support team to arrange an alternative refund method.
      </p>

      <h2>Non-Refundable Items</h2>
      <p>
        The following items and services are explicitly non-refundable:
      </p>
      <ul>
        <li>SMS credits that have been partially used or consumed in campaigns</li>
        <li>Custom sender ID registration fees, as these involve third-party carrier costs</li>
        <li>Setup or onboarding fees for enterprise accounts</li>
        <li>API integration support and consulting services that have been rendered</li>
        <li>Premium support packages after services have been delivered</li>
        <li>Any promotional or discounted purchase made under a special offer</li>
      </ul>

      <h2>Dispute Resolution</h2>
      <p>
        If you disagree with a refund decision, you may escalate your case by contacting our management team at billing@sdasms.com. Please include your original support ticket reference number and a detailed explanation of why you believe the decision should be reconsidered. We will review escalated cases within 10 business days and provide a final determination. Our goal is to resolve all disputes amicably and fairly.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Refund Policy, please contact us at:
      </p>
      <ul>
        <li>Email: billing@sdasms.com</li>
        <li>Website: sdasms.com/contact</li>
        <li>Address: PAPU Tower 6th Floor, 10636 Moshi Rd, Arusha, Tanzania</li>
      </ul>
    </PolicyLayout>
  )
}
