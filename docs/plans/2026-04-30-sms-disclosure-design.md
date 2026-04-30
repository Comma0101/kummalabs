# SMS Disclosure Page Design

## Goal

Create a carrier-review-friendly SMS opt-in disclosure page for KOTA by Kummalabs, using `7473468149` as the opt-in number and presenting clear proof of customer consent.

## Recommended Approach

Add a real localized Next.js route at `/en/sms-disclosure` and `/zh/sms-disclosure` through the existing `[lang]` route structure. The page should use static server-rendered markup, Tailwind styling, and a restrained trust-and-safety tone that matches the current site without feeling like a marketing page.

## Page Content

- Hero title: `SMS Messaging Terms & Opt-In Disclosure`
- CSS phone mockup showing a customer texting `START`
- SMS reply: `Welcome to KOTA by Kummalabs! You've opted in for order updates. Msg & data rates may apply. Reply STOP to end.`
- In-restaurant signage mockup: `Text START to 7473468149 to receive automated SMS updates for your order. Consent is not a condition of purchase.`
- Disclosure block with the required express opt-in text
- Footer-style links to Privacy Policy and Terms of Service

## Policy Updates

Carrier reviewers commonly inspect linked privacy and terms pages. Update both pages to explicitly state that mobile opt-in information is not shared with third parties for marketing or promotional purposes.

## Verification

Add a small Node test that checks the disclosure page and linked policy pages contain the required content. Run that test, then run the project build before pushing.
