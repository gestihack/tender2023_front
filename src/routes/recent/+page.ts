import { PUBLIC_API_URL } from '$env/static/public';
import type { PageLoad } from './$types';

export const ssr = false;

export const load = (async ({ url, fetch, depends }) => {
    console.log(url.searchParams)
    const hours = Number(url.searchParams.get("hours")) || 24*7;
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 20;
    depends("load_")
    const data = await fetch(PUBLIC_API_URL + `/groups?hours=${hours}&page=${page}&limit=${limit}`)
    const data_chart = await fetch(PUBLIC_API_URL + `/groups_chart?hours=${hours}`)
    return {
        data: data.json(),
        chart: data_chart.json(),
    };
}) satisfies PageLoad;