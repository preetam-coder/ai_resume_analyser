const { request } = require("../config/supabase")

async function findOne({ token }) {
    const query = new URLSearchParams({ select: "id", token: `eq.${token}`, limit: "1" })
    const [row] = await request("blacklisted_tokens", { query: query.toString() })
    return row || null
}

async function create({ token }) {
    return request("blacklisted_tokens", {
        method: "POST",
        prefer: "return=minimal",
        body: { token }
    })
}

module.exports = { findOne, create }
