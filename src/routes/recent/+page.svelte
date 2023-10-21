<script lang="ts">
    import Table from "$lib/components/Table.svelte"
    import { Chart } from "svelte-echarts"
    // import type { PageData } from "./$types"
    // import Enumerable from "linq"
    // export let data: PageData

    let options = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                // Use axis to trigger tooltip
                type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
            },
        },
        legend: {},
        grid: {
            left: "3%",
            right: "4%",
            bottom: "14%",
            containLabel: true,
        },
        yAxis: {
            type: "value",
        },
        xAxis: {
            type: "category",
            // data: w.select((x) => x.create_date),
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        dataZoom: [
            {
                type: "inside",
                start: 100 - 40,
                end: 100,
            },
            {
                start: 0,
                end: 1000,
            },
        ],
        series: [
            {
                name: "DATA_IMPORT",
                type: "bar",
                stack: "total",
                label: {
                    show: true,
                },
                emphasis: {
                    focus: "series",
                },
                data: [820, 832, 901, 934, 1290, 1330, 1320],
            },
            {
                name: "DATA_QUERY",
                type: "bar",
                stack: "total",
                label: {
                    show: true,
                },
                emphasis: {
                    focus: "series",
                },
                data: [320, 302, 301, 334, 390, 330, 320],
            },
            {
                name: "EXECUTION_EXCEPTION",
                type: "bar",
                stack: "total",
                label: {
                    show: true,
                },
                emphasis: {
                    focus: "series",
                },
                data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
                name: "EXECUTION_TIMEOUT",
                type: "bar",
                stack: "total",
                label: {
                    show: true,
                },
                emphasis: {
                    focus: "series",
                },
                data: [220, 182, 191, 234, 290, 330, 310],
            },
            {
                name: "TRANSPORT",
                type: "bar",
                stack: "total",
                label: {
                    show: true,
                },
                emphasis: {
                    focus: "series",
                },
                data: [150, 212, 201, 154, 190, 330, 410],
            },
        ],
    }

    let data: any = [[124, "Data", "Query", "Всякое", "213"],[124, "Data", "Query", "Всякое", "213"],[124, "Data", "Query", "Всякое", "213"],[124, "Data", "Query", "Всякое", "213"],[124, "Data", "Query", "Всякое", "213"],[124, "Data", "Query", "Всякое", "213"],[124, "Data", "Query", "Всякое", "213"],[124, "Data", "Query", "Всякое", "213"],[124, "Data", "Query", "Всякое", "213"],[124, "Data", "Query", "Всякое", "213"],[124, "Data", "Query", "Всякое", "213"],[124, "Data", "Query", "Всякое", "213"],[124, "Data", "Query", "Всякое", "213"],[124, "Data", "Query", "Всякое", "213"],[124, "Data", "Query", "Всякое", "213"],[124, "Data", "Query", "Всякое", "213"],]
</script>

<div class="p-5">
    <h4 class="secondary">Статистика</h4>
    <h2 class="font-bold">Недавние ошибки</h2>

    <div class="w-full h-72 bg-white p-4 rounded-xl">
        <Chart {options} />
    </div>
    <div class="pt-4">
        <Table {data} headers={["Количество ошибок", "Категория", "Подкатегория", "Last seen", "Cообщение"]}/>
    </div>
</div>

