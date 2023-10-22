<script lang="ts">
    import { page } from "$app/stores"
    import Table from "$lib/components/Table.svelte"
    import { Chart } from "svelte-echarts"
    import supportIcon from "$lib/assets/icons/quality.svg?raw"
    import qualityIcon from "$lib/assets/icons/support.svg?raw"
    import copyIcon from "$lib/assets/icons/copy.svg?raw"
    import {
        getModalStore,
        getToastStore,
        Paginator,
        type ModalSettings,
        type PaginationSettings,
    } from "@skeletonlabs/skeleton"
    import { invalidate, invalidateAll } from "$app/navigation"
    import Enumerable from "linq"

    const modalStore = getModalStore()
    const toastStore = getToastStore()

    function toast() {
        toastStore.trigger({
            message: "Оповещение отправлено!",
            timeout: 1700,
            hideDismiss: true,
        })
    }

    function modal() {
        modalStore.trigger({
            type: "component",
            component: "stepper",
            title: "Конструктор ответа",
            body: $page.data.info.human_error,
            response: (r) => {
                if (!r) return
                fetch("https://db-back.gesti.tech/set_error", {
                    body: `id=${$page.params.id}&error=${r}`,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    method: "post",
                }).then((w) => {
                    w.json()
                    invalidate("load_")
                })
            },
        })
    }

    function numberWithSpaces(x: number): string {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0")
    }

    // const modal: ModalSettings = {
    //     type: "component",
    //     component: "form",
    //     title: "Создание комментария для пользователя",
    //     buttonTextSubmit: "Отправить",
    //     buttonTextCancel: "Отмена",
    //     // TRUE if confirm pressed, FALSE if cancel pressed
    //     response: (r: boolean) =>
    //         toastStore.trigger({
    //             timeout: 1500,
    //             classes: "bg-[#264B82]",
    //             message: "Изменения сохранены",
    //             hideDismiss: true,
    //         }),
    // }
    let paginationSettings = {
        page: Number($page.url.searchParams.get("page")) || 0,
        limit: Number($page.url.searchParams.get("limit")) || 20,
        size: $page.data.info.count,
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

    function copyText() {
        function selectText(element: ant) {
            if (document.selection) {
                // IE
                var range = document.body.createTextRange()
                range.moveToElementText(element)
                range.select()
            } else if (window.getSelection) {
                var range = document.createRange()
                range.selectNode(element)
                window.getSelection().removeAllRanges()
                window.getSelection().addRange(range)
            }
        }
        let code: HTMLElement = document.querySelector(".ccd")!
        selectText(code)
        document.execCommand("copy")
    }

    let options = {
        title: {
            text: "Частотность ошибок",
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                label: {
                    backgroundColor: "#6a7985",
                },
            },
        },
        legend: {
            data: [
                "Email",
                "Union Ads",
                "Video Ads",
                "Direct",
                "Search Engine",
            ],
        },
        toolbox: {
            feature: {
                saveAsImage: {},
            },
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                data: Enumerable.from($page.data.chart["x"])
                    .select((x) => new Date(x).toLocaleString())
                    .toArray(),
            },
        ],
        yAxis: [
            {
                type: "value",
                data: $page.data.chart["y"],
            },
        ],
        series: [
            {
                type: "line",
                data: $page.data.chart["y"],
                smooth: true,
            },
        ],
    }
    $: data = $page.data.table.map((el) => {
        return [
            el.create_date,
            el.id,
            el.log.length > 70 ? el.log.substring(0, 70) + "..." : el.log,
        ]
    })
</script>

<div class="p-5">
    <h4 class="text-secondary">
        Статистика <span class="text-[12px]">{">"}</span> Недавние ошибки
    </h4>
    <h2 class="font-bold py-1">
        Категория ошибки <span class="errt hidden"
            >{$page.data.info.category}</span
        >
        {[$page.data.info.category, $page.data.info.subcategory].join("_")}
    </h2>

    <div class="py-3" />

    <div class="flex justify-between gap-x-5">
        <div class="w-[70%]">
            <div class="w-full h-96 bg-white p-4 rounded-xl">
                <Chart {options} />
            </div>
            <div
                class="flex py-4 palce-items-center place-content-between w-full"
            >
                <div class="info-card">
                    <span>
                        {numberWithSpaces($page.data.info.count)}
                    </span>
                    <div>количество ошибок</div>
                </div>
                <div class="info-card">
                    <span>
                        {$page.data.info.first}
                    </span>
                    <div>с первой ошибки</div>
                </div>
                <div class="info-card">
                    <span>
                        {$page.data.info.last}
                    </span>
                    <div>не было ошибок</div>
                </div>
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
            <Table
                {data}
                headers={["Дата и время", "Пользователь", "Сообщение"]}
            />
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
        <div class="w-[30%] h-fit bg-white p-4 rounded-xl flex flex-col gap-y-4">
            <button
                on:click={modal}
                class="btn bg-[#264B82] text-white"
            >
                Сообщение для пользователей
                <div>{@html supportIcon}</div>
            </button>
            <button
                on:click={toast}
                class="btn bg-gray text-black"
            >
                Сообщить пользователям об исправлении
                <div>{@html qualityIcon}</div>
            </button>
            {#if $page.data.info.human_error}
                <span class="font-bold text-[20px] xl:text-[32px] py-2 leading-[100%]" >Пользовательская ошибка:</span>
                <div
                    class="my-2 py-8 px-3 h-fi p-3 rounded-[15px] bg-[#F8F8F8] h-full font-mono"
                >
                    <span
                        on:click={copyText}
                        class="copy"
                    >
                        {@html copyIcon}
                    </span>
                    <div class="ccd -my-2">
                        {$page.data.info.human_error}
                    </div>
                </div>
            {/if}
            <span class="font-bold text-[20px] xl:text-[32px] py-4">
                Полный текст ошибки:
            </span>
            <div class="my-2 py-8 px-3 h-fit rounded-[15px] bg-[#F8F8F8] font-mono">
                <span
                    on:click={copyText}
                    class="copy"
                >
                    {@html copyIcon}
                </span>
                <div class="ccd -my-5">
                    {$page.data.info.log}
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .copy {
        @apply cursor-pointer relative left-full top-full block w-fit;
        transform: translate(-100%, -100%);
    }
    .btn {
        @apply text-[15px] rounded-[10px] flex justify-between whitespace-normal;
    }
    .info-card {
        @apply flex p-2 place-content-center place-items-center 
            bg-white w-[calc(33%-20px)] h-[80px] gap-x-4 rounded-[10px];
        span {
            @apply text-[24px] font-bold;
        }
        div {
            @apply text-[14px] lg:text-[18px] font-normal;
        }
    }
    :root {
        --w: 100% !important;
    }
</style>
