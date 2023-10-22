<script lang="ts">
    import "../app.scss"
    import tenderIcon from "$lib/assets/icons/tenderIcon.svg?raw"
    import NavLink from "$lib/components/NavLink.svelte"
    import { Modal, Toast } from "@skeletonlabs/skeleton"

    import { initializeStores } from "@skeletonlabs/skeleton"
    import Modalform from "$lib/components/modalform.svelte"
    import StepperModal from "$lib/components/StepperModal.svelte"
    import { page } from "$app/stores"
    import { invalidateAll } from "$app/navigation"

    initializeStores()

    let hoursSelect: HTMLSelectElement

    $: hours = parseInt(($page.url.searchParams.get("hours") ?? "800") || "800")

    function changeHours(e) {
        let select = e.target
        let hours = select.options[select.selectedIndex].value
        $page.url.searchParams.set("hours", hours)
        history.replaceState({}, "", $page.url)
        invalidateAll()
    }
</script>

<Modal
    components={{
        form: { ref: Modalform },
        stepper: { ref: StepperModal },
    }}
/>
<Toast />
<div
    class="min-w-full min-h-full bg-[#E7EEF7]"
    id="app"
>
    <div class="flex flex-col">
        <div class="topbar">
            <div class="flex place-items-center mx-4 py-2 p-auto mr-5 w-44">
                {@html tenderIcon}
            </div>
            <NavLink
                title="Последние ошибки"
                to="/recent"
            />
            <NavLink
                title="Статистика"
                to="/stats"
            />
            <NavLink
                title="Новая ошибка"
                to="/report"
            />
            <div
                class="ml-auto mr-8 place-items-center place-self-center h-full flex"
            >
                <select
                    on:change={changeHours}
                    bind:this={hoursSelect}
                    class="select"
                >
                    <option
                        value="1"
                        selected={hours === 1}>1 час</option
                    >
                    <option
                        value="6"
                        selected={hours === 6}>6 часов</option
                    >
                    <option
                        value="12"
                        selected={hours === 12}>12 часов</option
                    >
                    <option
                        value="24"
                        selected={hours === 24}>1 день</option
                    >
                    <option
                        value="48"
                        selected={hours === 48}>2 дня</option
                    >
                    <option
                        value="72"
                        selected={hours === 72}
                        >3 дня
                    </option>
                    <option
                        value="800"
                        selected={hours === 800}>Всё время</option
                    >
                </select>
            </div>
        </div>

        {#key hours}
            <slot />
        {/key}
    </div>
</div>

<style lang="scss">
    .topbar {
        @apply h-fit border-b border-[#D4DBE6] flex gap-x-10 bg-[#E7EEF7];
    }
</style>
