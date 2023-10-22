<script lang="ts">
    import { page } from "$app/stores"
    import Table from "$lib/components/Table.svelte"
    import { Chart } from "svelte-echarts"
    import type { EChartsOptions } from "svelte-echarts"
    import Enumerable from "linq"
    import plural from 'plural-ru';

    function dayDelta(time: any) {
        let timelast: any = new Date(time)
        let now: any = new Date("2023-10-16 14:00");
        let delta = Math.abs(timelast - now)
        let deltaHours = Math.ceil(delta / (1000 * 60 * 60))
        
        return `${plural(deltaHours, '%d чаc', '%d часа', '%d часов')} назад`
    }

    const td = $page.data.data.map((el: any) => {
        console.log(el)
        return [
            el.count,
            el.category,
            el.subcategory.length > 0 ? el.subcategory : "-",
            dayDelta(el.last),
            el.log.length > 100 ? el.log.substring(0, 100) + "..." : el.log,
        ]
    })

    const categories = $page.data.data.map((el) => {
        return [el.category, el.subcategory].join("_")
    })

    let options: EChartsOptions = {
        responsive: true,
        color: ["#FFBFC3", "#DB2B21", "#B9221E", "#750300", "#450200", "#e95959"],
        title: {
            text: "Топ ошибок",
            textAlign: "right",
            right: "-20%",
            // subtext: "за всё время",
        },
        tooltip: {
            show: false,
            trigger: "item",
            z: 10,
            zlevel: 10
        },
        legend: {
            left: "right",
            orient: "vertical",
            z: 0,
            zlevel:0,
            textStyle: {
                fontSize: 10,
            },
            top: "center",
        },
        series: [
            {
                name: "",
                type: "pie",
                left: "-45%",
                // radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: "outside",
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: 20,
                        fontWeight: "bold",
                    },
                },
                labelLine: {
                    show: true,
                },
                data: [
                    ...$page.data.data.map((el) => {
                        return {
                            value: el.count,
                            name: [el.category, el.subcategory].join("_"),
                        }
                    }),
                ],
            },
        ],
    }

    let sig = []
    for (let cat of categories) {
        let w: any = Enumerable.from($page.data.data)
            .where((x: any) => [x.category, x.subcategory].join("_") === cat)
            .first()
        sig.push(w.significance)
        // sig.push($page.data.data[cat].significance)
    }

    let options2: EChartsOptions = {
        color: ["#FFBFC3", "#DB2B21", "#B9221E", "#750300", "#450200"],
        title: {
            text: "Cамые значимые ошибки",
            textAlign: "right",
            right: "-20%",
            // subtext: "за всё время",
        },
        grid: {
            right: "10",
            width: "45%",
        },
        tooltip: {
            trigger: "item",
        },
        xAxis: {
            type: "value",
        },
        yAxis: {
            type: "category",
            data: categories,
        },
        series: [
            {
                color: "#DB2B21",
                type: "bar",
                data: sig,
            },
        ],
    }
</script>
<div class="flex place-content-center w-full">
    <div class="p-5 lg:max-w-[1100px] w-full place-self-center">
<div class="w-full h-full">
    <div class=" charts">
        <div><Chart {options} /></div>
        <div><Chart options={options2} /></div>
    </div>
    <div class="pt-4">
        <Table
            data={td}
            headers={[
                "Количество ошибок",
                "Категория",
                "Подкатегория",
                "Последняя ошибка",
                "Cообщение",
            ]}
        />
    </div>
</div>
</div>
</div>

<style lang="scss">
    .charts {
        @apply flex gap-y-4 h-80 justify-between;
        div {
            @apply p-3 bg-white rounded-xl w-[calc(50%-30px)];
        }
    }
</style>
