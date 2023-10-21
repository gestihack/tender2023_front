<script lang="ts">
    export let headers: string[]
    export let data: string[][];
</script>


<table>
    <tr>
        {#each headers as title}
            <th>{title}</th>
        {/each}
    </tr>
    {#each data as row}
        <tr>
            {#each Object.values(row) as val}
                <td>{val}</td>
            {/each}
        </tr>
    {/each}
</table>


<style lang="scss">
    table {
        @apply w-full;
        border-collapse: separate;
        border-spacing: 0 10px;

        tr {
            td {
                @apply bg-white px-3 py-2;
            }
            td:first-child {
                @apply rounded-l-[15px];
            }
            td:last-child {
                @apply rounded-r-[15px];
            }
        }
        tr > th {
            @apply bg-red px-4 py-3 text-white text-left text-[14px] w-1/5 font-normal;
            &:first-child {
                @apply rounded-l-[15px];
            }
            &:last-child {
                @apply rounded-r-[15px];
            }
        }
        tr td:first-child,
        tr td:last-child {
            @apply bg-white;
        }
    }
</style>
