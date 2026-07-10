const SHEETS_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

export const logToSheets = async (data) => {
  try {
    await fetch(SHEETS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString()
      })
    });
  } catch (err) {
    console.log("Sheets logging failed:", err);
  }
};
