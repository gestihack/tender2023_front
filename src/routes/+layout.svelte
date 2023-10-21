<script lang="ts">
    import "../app.scss"
    import { page } from "$app/stores"
</script>

<div
    class="w-full h-full"
    id="app"
>
    <div class="flex flex-col">
        <div class="topbar">
            <div class="nav-box">
                <a
                    class="nav-link"
                    href="dashboard"
                    data-active={($page.route.id ?? "").indexOf("dashboard") >=
                        0}
                    >Основная информация
                </a>
                <span class="bar" />
            </div>

            <div class="nav-box">
                <a
                    class="nav-link"
                    href="stats"
                    data-active={($page.route.id ?? "").indexOf("stats") >= 0}
                    >Статистика</a
                >
                <span class="bar" />
            </div>
        </div>
        {$page.route.id}
        <slot />
    </div>
</div>

<style lang="scss">
    .nav-box {
        @apply flex flex-col place-content-center;
        &:hover > .bar {
            @apply h-px w-[84px] bg-black place-self-center place-content-end;
        }
        .nav-link {
            @apply text-gray px-5 py-4 h-fit hover:text-black;

            &[data-active="true"] + .bar {
                @apply h-px w-[84px] bg-black place-self-center place-content-end;   
            }
            &[data-active="true"] {
                @apply text-black;
            }
        }
    }

    .topbar {
        @apply h-fit border-b border-gray flex gap-x-10;
    }
</style>
