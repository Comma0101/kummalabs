import { notFound } from "next/navigation";

// Any unknown path on kummalabs.com renders the studio 404 inside the studio layout.
export default function StudioCatchAll() {
  notFound();
}
