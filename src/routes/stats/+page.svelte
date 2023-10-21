<script lang="ts">
    import { Chart } from "svelte-echarts"
    import type { EChartsOptions } from "svelte-echarts";

    let options: EChartsOptions  = {
        title: {
            text: "Топ ошибок",
            textAlign: 'right',
            right: '-20%',
            subtext: 'за всё время',
        },
        tooltip: {
            trigger: "item",
        },
        legend: {
            left: "right",
            orient: "vertical",
            top: "center",
        },
        series: [
            {
                name: "Access From",
                type: "pie",
                radius: ["40%", "70%"],
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
                        show: true,
                        fontSize: 20,
                        fontWeight: "bold",
                    },
                },
                labelLine: {
                    show: true,
                },
                data: [
                    { value: 1048, name: "Search Engine" },
                    { value: 735, name: "Direct" },
                    { value: 580, name: "Email" },
                    { value: 484, name: "Union Ads" },
                    { value: 300, name: "Video Ads" },
                ],
            },
        ],
    }

    let options2: EChartsOptions = {

    }
</script>


<div class="w-full h-full">
    <div class=" charts">
        <div><Chart {options}/></div>
        <!-- <div><Chart {options2}/></div> -->
       
    </div>
</div>

<style lang="scss">
    .charts {
        @apply flex gap-y-4 h-72 justify-around;
        div {
            @apply p-3 bg-white rounded-xl w-[calc(50%-40px)];
        }
    }
</style>