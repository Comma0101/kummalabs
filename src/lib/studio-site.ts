export const STUDIO_URL = "https://kummalabs.com";
export const STUDIO_EMAIL = "info@kummalabs.com";
export const KOTA_URL = "https://kota.kummalabs.com";

const inquiryBody = [
  "What happens today:",
  "",
  "Tools and systems involved:",
  "",
  "Rough volume (calls, emails, or documents per week):",
  "",
  "What a good result looks like:",
  "",
  "Timeline and budget range (optional):",
  "",
].join("\n");

export const INQUIRY_MAILTO = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(
  "Project inquiry",
)}&body=${encodeURIComponent(inquiryBody)}`;
