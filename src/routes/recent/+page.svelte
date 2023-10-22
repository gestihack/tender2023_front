<script lang="ts">
    import { Paginator, type PaginationSettings } from "@skeletonlabs/skeleton"
    import Table from "$lib/components/Table.svelte"
    import { Chart, type EChartsOptions } from "svelte-echarts"
    import { page } from "$app/stores"
    import { invalidate } from "$app/navigation"
    import Enumerable from "linq"
    import plural from 'plural-ru'
    // import type { PageData } from "./$types"
    // import Enumerable from "linq"
    // export let data: PageData

    function dayDelta(time: any) {
        let timelast: any = new Date(time)
        let now: any = Date.now()
        let delta = Math.abs(timelast - now)
        let deltaHours = Math.ceil(delta / (1000 * 60 * 60))
        
        if (deltaHours > 48)
            return `${plural(Math.floor(deltaHours/24), '%d день', '%d дня', '%d дней')} назад`
        else
            return `${plural(deltaHours, '%d чаc', '%d часа', '%d часов')} назад`
    }

    let paginationSettings = {
        page: Number($page.url.searchParams.get("page")) || 0,
        limit: Number($page.url.searchParams.get("limit")) || 20,
        size: $page.data.data.count,
        amounts: [15, 20, 30, 40],
    } satisfies PaginationSettings

    function onPage(e) {
        $page.url.searchParams.set("page", e.detail + 1)
        history.replaceState({}, "", $page.url)
        invalidate("load_")
    }
    function onAmount(e) {
        $page.url.searchParams.set("limit", e.detail)
        history.replaceState({}, "", $page.url)
        invalidate("load_")
    }

    let options: EChartsOptions = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                // Use axis to trigger tooltip
                type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
            },
        },
        legend: {
            orient: "horizontal",
            right: "10",
        },
        responsive: true,
        resizeDelay: 1000,
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
            data: Enumerable.from($page.data.chart["x"]).select(x => new Date(x).toLocaleString("ru-RU")).toArray(),
        },
        dataZoom: [
            {
                type: "inside",
                start: 0,
                end: 100,
            },
            {
                start: 0,
                end: 1000,
            },
        ],
        series: Object.keys($page.data.chart["y"]).map((el) => {
            return {
                name: el,
                data: $page.data.chart["y"][el],
                type: "bar",
                stack: "total",
                label: {
                    show: false,
                },
                emphasis: {
                    focus: "series",
                },
            }
        }),
        // {
        //     name: "DATA_IMPORT",
        //     type: "bar",
        //     stack: "total",
        //     label: {
        //         show: true,
        //     },
        //     emphasis: {
        //         focus: "series",
        //     },
        //     data: [820, 832, 901, 934, 1290, 1330, 1320],
        // },
        // {
        //     name: "DATA_QUERY",
        //     type: "bar",
        //     stack: "total",
        //     label: {
        //         show: true,
        //     },
        //     emphasis: {
        //         focus: "series",
        //     },
        //     data: [320, 302, 301, 334, 390, 330, 320],
        // },
        // {
        //     name: "EXECUTION_EXCEPTION",
        //     type: "bar",
        //     stack: "total",
        //     label: {
        //         show: true,
        //     },
        //     emphasis: {
        //         focus: "series",
        //     },
        //     data: [120, 132, 101, 134, 90, 230, 210],
        // },
        // {
        //     name: "EXECUTION_TIMEOUT",
        //     type: "bar",
        //     stack: "total",
        //     label: {
        //         show: true,
        //     },
        //     emphasis: {
        //         focus: "series",
        //     },
        //     data: [220, 182, 191, 234, 290, 330, 310],
        // },
        // {
        //     name: "TRANSPORT",
        //     type: "bar",
        //     stack: "total",
        //     label: {
        //         show: true,
        //     },
        //     emphasis: {
        //         focus: "series",
        //     },
        //     data: [150, 212, 201, 154, 190, 330, 410],
        // },
    }

    $: table = $page.data.data.rows.map((el) => {
        return [
            el.count,
            el.category,
            el.subcategory.length > 0 ? el.subcategory : "-",
            dayDelta(el.last),
            `<a href='/errors/${el.id}'> ${
                el.log.length > 70 ? el.log.substring(0, 70) + "..." : el.log
            } </a>`,
        ]
    })
</script>

<div class="flex place-content-center w-full">
    <div class="p-5 lg:max-w-[928px] w-full place-self-center">
        <h4 class="text-secondary">Статистика</h4>
        <h2 class="font-bold">Недавние ошибки</h2>

        <div class="py-3" />

        <div class="w-full h-96 bg-white p-4 mb-6 rounded-xl">
            <Chart {options} />
        </div>

        <Paginator
            bind:settings={paginationSettings}
            on:page={onPage}
            on:amount={onAmount}
            maxNumerals={1}
            showFirstLastButtons={true}
            showPreviousNextButtons={true}
            separatorText={"из"}
            amountText={"Элементов"}
            buttonClasses="text-black"
            controlVariant="text-black"
        />
        <div class="pt-4">
            <Table
                data={table}
                headers={[
                    "Количество ошибок",
                    "Категория",
                    "Подкатегория",
                    "Last seen",
                    "Cообщение",
                ]}
            />
        </div>

        <Paginator
            bind:settings={paginationSettings}
            on:page={onPage}
            on:amount={onAmount}
            maxNumerals={1}
            showFirstLastButtons={true}
            showPreviousNextButtons={true}
            separatorText={"из"}
            amountText={"Элементов"}
            buttonClasses="text-black"
            controlVariant="text-black"
        />
    </div>
</div>

<style lang="scss">
</style>
