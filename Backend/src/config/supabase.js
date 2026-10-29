const baseUrl = process.env.SUPABASE_URL
const secretKey = process.env.SUPABASE_SECRET_KEY

async function request(table, { method = "GET", query = "", body, prefer } = {}) {
    if (!baseUrl || !secretKey) {
        throw new Error("SUPABASE_URL and SUPABASE_SECRET_KEY must be set in Backend/.env")
    }

    const url = new URL(`/rest/v1/${table}${query ? `?${query}` : ""}`, baseUrl)
    const headers = {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json"
    }
    if (prefer) headers.Prefer = prefer

    const response = await fetch(url, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body)
    })

    const text = await response.text()
    if (!response.ok) {
        throw new Error(`Supabase request failed (${response.status}): ${text}`)
    }
    return text ? JSON.parse(text) : null
}

module.exports = { request }
