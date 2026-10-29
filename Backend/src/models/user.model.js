const { request } = require("../config/supabase")

async function findByUsernameOrEmail(username, email) {
    const query = new URLSearchParams({ select: "id,username,email,password_hash", username: `eq.${username}`, limit: "1" })
    let rows = await request("app_users", { query: query.toString() })
    let row = rows[0]
    if (!row) {
        const emailQuery = new URLSearchParams({ select: "id,username,email,password_hash", email: `eq.${email}`, limit: "1" })
        rows = await request("app_users", { query: emailQuery.toString() })
        row = rows[0]
    }
    return row ? { _id: row.id, username: row.username, email: row.email, password: row.password_hash } : null
}

async function findByEmail(email) {
    const query = new URLSearchParams({ select: "id,username,email,password_hash", email: `eq.${email}`, limit: "1" })
    const [row] = await request("app_users", { query: query.toString() })
    return row ? { _id: row.id, username: row.username, email: row.email, password: row.password_hash } : null
}

async function create({ username, email, password }) {
    const [row] = await request("app_users", {
        method: "POST",
        query: "select=id,username,email",
        prefer: "return=representation",
        body: { username, email, password_hash: password }
    })
    return { _id: row.id, username: row.username, email: row.email }
}

async function findById(id) {
    const query = new URLSearchParams({ select: "id,username,email", id: `eq.${id}`, limit: "1" })
    const [row] = await request("app_users", { query: query.toString() })
    return row ? { _id: row.id, username: row.username, email: row.email } : null
}

module.exports = { findByUsernameOrEmail, findByEmail, create, findById }
