export type Lead = {
  name: string;
  phone?: string;
  email?: string;
  service: string;
  zip?: string;
  notes?: string;
  source: "chat" | "form";
};

export async function appendLeadToSheet(lead: Lead) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    console.warn("GOOGLE_SCRIPT_URL not set — skipping lead write.");
    return;
  }

  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, timestamp }),
      redirect: "follow",
    });
    const text = await res.text();
    console.log("Sheets response:", res.status, text);
  } catch (err) {
    console.error("Sheets write failed:", err);
  }
}