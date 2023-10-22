import { PUBLIC_API_URL } from '$env/static/public';
import type { PageLoad } from './$types';

export const ssr = false;

export const load = (async ({ url, fetch, depends, params }) => {
    console.log(url.searchParams)
    const hours = Number(url.searchParams.get("hours")) || 24*7;
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 20;
    depends("load_")
    const info = await fetch(PUBLIC_API_URL + `/group_info?hours=${hours}&id=${params.id}`)
    const table = await fetch(PUBLIC_API_URL + `/group_errors?hours=${hours}&id=${params.id}&page=${page}&limit=${limit}`)
    const chart = await fetch(PUBLIC_API_URL + `/group_chart?hours=${hours}&id=${params.id}`)
    console.log(PUBLIC_API_URL + `/group_chart?hours=${hours}&id=${params.id}`)
    return {
        info: info.json(),
        table: table.json(),
        chart: chart.json(),
    };
}) satisfies PageLoad;