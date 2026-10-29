const { request } = require("../config/supabase")

function fromRow(row) {
    if (!row) return null
    return {
        _id: row.id,
        user: row.user_id,
        resume: row.resume,
        selfDescription: row.self_description,
        jobDescription: row.job_description,
        matchScore: Number(row.match_score),
        technicalQuestions: row.technical_questions,
        behavioralQuestions: row.behavioral_questions,
        skillGaps: row.skill_gaps,
        preparationPlan: row.preparation_plan,
        title: row.title,
        createdAt: row.created_at
    }
}

async function create(report) {
    const [row] = await request("interview_reports", {
        method: "POST",
        query: "select=*",
        prefer: "return=representation",
        body: {
            user_id: report.user,
            resume: report.resume,
            self_description: report.selfDescription,
            job_description: report.jobDescription,
            match_score: report.matchScore,
            technical_questions: report.technicalQuestions,
            behavioral_questions: report.behavioralQuestions,
            skill_gaps: report.skillGaps,
            preparation_plan: report.preparationPlan,
            title: report.title
        }
    })
    return fromRow(row)
}

async function findByIdAndUser(id, userId) {
    const query = new URLSearchParams({ id: `eq.${id}`, user_id: `eq.${userId}`, select: "*", limit: "1" })
    const [row] = await request("interview_reports", { query: query.toString() })
    return fromRow(row)
}

async function findById(id) {
    const query = new URLSearchParams({ id: `eq.${id}`, select: "*", limit: "1" })
    const [row] = await request("interview_reports", { query: query.toString() })
    return fromRow(row)
}

async function findRecentByUser(userId) {
    const query = new URLSearchParams({
        user_id: `eq.${userId}`,
        select: "id,title,match_score,created_at",
        order: "created_at.desc"
    })
    const rows = await request("interview_reports", { query: query.toString() })
    return rows.map((row) => ({
        _id: row.id,
        title: row.title,
        matchScore: Number(row.match_score),
        createdAt: row.created_at
    }))
}

module.exports = { create, findByIdAndUser, findById, findRecentByUser }
