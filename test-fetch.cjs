async function main() {
  console.log("Fetching getPortalDataFn...");
  try {
    const start = Date.now();
    const res = await fetch("https://bbditranning.vercel.app/_server/?_serverFnId=getPortalDataFn&_serverFnName=getPortalDataFn", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ payload: {} })
    });
    console.log("Status:", res.status, "in", Date.now() - start, "ms");
    const text = await res.text();
    console.log("Response length:", text.length, text);
  } catch (e) {
    console.error(e);
  }
}
main();
