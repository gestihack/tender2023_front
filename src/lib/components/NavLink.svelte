<script lang="ts">
    import { page } from "$app/stores"

    export let title: string;
    export let to: string;
</script>


<div class="nav-box">
    <a
        class="nav-link"
        href={to}
        data-active={($page.route.id ?? "").indexOf(to) >= 0}
        >
        {title}
        </a
    >
    <span class="bar" />
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
</style>