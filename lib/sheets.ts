import { google } from "googleapis";

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
  const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!credentialsJson || !sheetId) {
    console.warn("Google Sheets not configured — skipping lead write.");
    return;
  }

  const credentials = JSON.parse(credentialsJson);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Leads!A:I",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        timestamp, lead.name, lead.phone ?? "", lead.email ?? "",
        lead.service, lead.zip ?? "", lead.notes ?? "", lead.source, "New",
      ]],
    },
  });
}
