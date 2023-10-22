import type { PageLoad } from "./$types"
import { PUBLIC_API_URL } from "$env/static/public"

export const load = (async ({ fetch, url }) => {
    const hours = Number(url.searchParams.get("hours")) || 24*7;
    const data = await fetch(PUBLIC_API_URL + '/subcategories?hours='+hours)
    return {
        data: data.json(),
    }
}) satisfies PageLoad
