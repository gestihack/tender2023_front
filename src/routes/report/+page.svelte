<script lang="ts">
    import icon from "$lib/assets/icons/edit.svg?raw"
    import logo from "$lib/assets/icons/tendericon.svg?raw"
    import { getModalStore } from "@skeletonlabs/skeleton"

    let inp: HTMLInputElement
    const modalStore = getModalStore()

    async function send() {
        let res = await fetch("https://db-back.gesti.tech/classify", {
            body: `error=${inp.value}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "post",
        })
        if (res.ok) {
            let d = await res.json()
            modalStore.trigger({
                type: "alert",
                title: "Типизация ошибки",
                body: `Класс ошибки: <b>${d.label}</b><br/>Вероятность: <b>${
                    Math.round(d.score * 10000) / 100
                }%</b><br/>`,
            })
        }
    }
</script>

<section class="flex pt-[13vw] flex-col">
    <div class="w-[18vw] m-auto mb-[8vw]">
        {@html logo}
    </div>
    <div class="flex row m-auto p-1 w-[60vw] bg-white rounded-[100px]">
        <input
            class="m-auto w-[50vw]"
            placeholder="Введите ошибку"
            bind:this={inp}
        />
        <div
            on:click={send}
            class="h-[4vw] w-[4vw] rounded-[100px] bg-reddy flex hover:bg-reddy/80 hover:cursor-pointer"
        >
            <div class="fill-[#FFF] w-4 h-4 m-auto">
                {@html icon}
            </div>
        </div>
    </div>
</section>

<style>
    input :active,
    :hover,
    :focus {
        outline: 0;
        outline-offset: 0;
    }
</style>
