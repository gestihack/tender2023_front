<script lang="ts">
    import "../app.scss"
    import { page } from "$app/stores"
    import tenderIcon from "$lib/assets/icons/tenderIcon.svg?raw"
</script>

<div
    class="min-w-full min-h-full bg-[#E7EEF7]"
    id="app"
>
    <div class="flex flex-col">
        <div class="topbar">
            <div class="nav-box">
                <a
                    class="nav-link"
                    href="recent"
                    data-active={($page.route.id ?? "").indexOf("recent") >=
                        0}
                >
                    Последние ошибки
                </a>
                <span class="bar" />
            </div>

            <div class="nav-box">
                <a
                    class="nav-link"
                    href="stats"
                    data-active={($page.route.id ?? "").indexOf("stats") >= 0}
                >
                    Статистика
                </a>
                <span class="bar" />
            </div>
            <div class="nav-box">
                <a
                    class="nav-link"
                    href="report"
                    data-active={($page.route.id ?? "").indexOf("report") >= 0}
                    >Отчет</a
                >
                <span class="bar" />
            </div>

            <div class="flex place-items-center py-2 p-auto ml-auto mr-5">
                {@html tenderIcon}
            </div>
        </div>

        <div class="p-4">
            <slot />
        </div>
    </div>
</div>

<style lang="scss">
    .bar {
        @apply h-px bg-transparent place-self-center place-content-end transition-transform;
        transform: scale(0, 0);
    }
    .nav-box {
        @apply flex flex-col place-content-center;
        &:hover > .bar {
            @apply h-px w-[84px] bg-black;
            transform: scale(1, 1);
        }
        .nav-link {
            @apply text-pale-black font-bold px-5 py-4 h-fit hover:text-black;

            &[data-active="true"] + .bar {
                @apply h-px w-[84px] bg-black;
                transform: scale(1, 1);
            }
            &[data-active="true"] {
                @apply text-black;
            }
        }
    }

    .topbar {
        @apply h-fit border-b border-[#D4DBE6] flex gap-x-10 bg-[#E7EEF7];
    }
</style>
