const CAL_API_BASE = "https://api.cal.com/v2";
const CAL_USERNAME = "david-hettinger-g8qbdk";
const CAL_EVENT_SLUG = "30min";

export async function getAvailableSlots(): Promise<{ time: string; display: string }[]> {
  const apiKey = process.env.CAL_API_KEY!;
  const now = new Date();
  const start = now.toISOString().split(".")[0] + "Z";
  const end = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split(".")[0] + "Z";

  const res = await fetch(
    `${CAL_API_BASE}/slots?username=${CAL_USERNAME}&eventTypeSlug=${CAL_EVENT_SLUG}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": "2024-09-04",
      },
    }
  );

  const data = await res.json();
  console.log("Cal v2 slots response:", JSON.stringify(data).slice(0, 400));

  const slots: { time: string; display: string }[] = [];
  const days = data?.data ?? {};
  for (const daySlots of Object.values(days)) {
    for (const slot of daySlots as { start: string }[]) {
      slots.push({
        time: slot.start,
        display: new Date(slot.start).toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          timeZone: "America/New_York",
        }),
      });
    }
  }
  return slots.slice(0, 8);
}

export async function bookAppointment(params: {
  startTime: string;
  name: string;
  email: string;
  notes?: string;
}): Promise<{ uid: string; status: string }> {
  const apiKey = process.env.CAL_API_KEY!;

  const res = await fetch(`${CAL_API_BASE}/bookings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "cal-api-version": "2024-08-13",
    },
    body: JSON.stringify({
      username: CAL_USERNAME,
      eventTypeSlug: CAL_EVENT_SLUG,
      start: params.startTime,
      attendee: {
        name: params.name,
        email: params.email,
        timeZone: "America/New_York",
        language: "en",
      },
      bookingFieldsResponses: {
        notes: params.notes ?? "",
      },
    }),
  });

  const data = await res.json();
  console.log("Cal v2 booking response:", JSON.stringify(data).slice(0, 400));
  if (!res.ok) throw new Error(data.error?.message ?? data.message ?? "Booking failed");
  return { uid: data.data?.uid ?? data.uid, status: data.data?.status ?? data.status };
}