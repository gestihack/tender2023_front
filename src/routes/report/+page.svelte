<script lang="ts">
 import icon from "$lib/assets/icons/edit.svg?raw"
 import logo from "$lib/assets/icons/tendericon.svg?raw"
</script>
<section class="flex pt-[13vw] flex-col">
    <div class="w-[18vw] m-auto mb-[8vw]">
        {@html logo}
    </div>
    <div class="flex row m-auto p-1 w-[60vw] bg-white rounded-[100px]" >
        <input class="m-auto w-[50vw]" placeholder="Введите ошибку">
        <div class="h-[4vw] w-[4vw] rounded-[100px] bg-[#DB2B21] flex hover:bg-[#B9221E]">
            <div class="fill-[#FFF] w-4 h-4 m-auto">
                {@html icon}
            </div>
        </div>
    </div>
</section>

<style>
    input :active, :hover, :focus {
        outline: 0;
        outline-offset: 0;
    }
</style>