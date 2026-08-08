/**
 * Visitor Counter — Self-owned via GitHub Gist
 *
 * Data store: a private GitHub Gist (JSON file you own)
 * Auth:       GitHub personal access token (env var GITHUB_GIST_TOKEN)
 * No third-party counter service. Only dependency: GitHub, which your
 * code repo already depends on.
 *
 * Gist JSON format: { "count": 12345 }
 *
 * Required env vars (set in Vercel dashboard):
 *   GITHUB_GIST_TOKEN  — a GitHub PAT with gist scope
 *   GITHUB_GIST_ID     — the ID of the gist (the hash in the gist URL)
 */

const GIST_FILENAME = 'visitor-count.json'
const GITHUB_API    = 'https://api.github.com'

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

    if (req.method === 'OPTIONS') {
        res.status(204).end()
        return
    }

    const token  = process.env.GITHUB_GIST_TOKEN
    const gistId = process.env.GITHUB_GIST_ID

    if (!token || !gistId) {
        console.error('[visits] Missing GITHUB_GIST_TOKEN or GITHUB_GIST_ID env vars')
        res.status(500).json({ error: 'Counter not configured' })
        return
    }

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept':        'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type':  'application/json',
        'User-Agent':    'karthigaiselvam-portfolio',
    }

    try {
        // 1. Read current count from Gist
        const getRes = await fetch(`${GITHUB_API}/gists/${gistId}`, { headers })

        if (!getRes.ok) {
            const body = await getRes.text()
            throw new Error(`GitHub GET gist failed: ${getRes.status} — ${body}`)
        }

        const gist    = await getRes.json()
        const fileContent = gist.files?.[GIST_FILENAME]?.content

        let count = 0
        if (fileContent) {
            try {
                count = JSON.parse(fileContent).count ?? 0
            } catch {
                // File exists but is malformed — reset to 0
                count = 0
            }
        }

        // 2. Increment
        const newCount = count + 1

        // 3. Write back to Gist
        const patchRes = await fetch(`${GITHUB_API}/gists/${gistId}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({
                files: {
                    [GIST_FILENAME]: {
                        content: JSON.stringify({ count: newCount })
                    }
                }
            })
        })

        if (!patchRes.ok) {
            const body = await patchRes.text()
            throw new Error(`GitHub PATCH gist failed: ${patchRes.status} — ${body}`)
        }

        res.status(200).json({ count: newCount })

    } catch (error) {
        console.error('[visits] Error:', error.message)
        res.status(500).json({ error: 'Failed to update visitor count' })
    }
}
