<script lang="ts">
    // Props
    /** Exposes parent props to this component. */
    export let parent: any;

    // Stores
    import { getModalStore } from '@skeletonlabs/skeleton';
    const modalStore = getModalStore();

    // Form Data
    const formData = {
        text: '',
    };

    // We've created a custom submit function to pass the response and close the modal.
    function onFormSubmit(): void {
        if ($modalStore[0].response) $modalStore[0].response(formData);
        modalStore.close();
    }

    // Base Classes
    const cBase = 'card p-4 w-modal shadow-xl space-y-4';
    const cHeader = 'text-2xl font-bold';
    const cForm = 'p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
    <div class="modal-example-form {cBase}">
        <header class={cHeader}>{$modalStore[0].title ?? ''}</header>
        <article>{$modalStore[0].body ?? ''}</article>
        <!-- Enable for debugging: -->
        <form class="modal-form {cForm}">
            <label class="label">
                <span></span>
                <textarea class="input p-2 rounded-[10px]" bind:value={formData.text} placeholder="Введите текст..." />
            </label>
            <!-- <label class="label">
                <span>Phone Number</span>
                <input class="input" type="tel" bind:value={formData.tel} placeholder="Enter phone..." />
            </label>
            <label class="label">
                <span>Email</span>
                <input class="input" type="email" bind:value={formData.email} placeholder="Enter email address..." />
            </label> -->
        </form>
        <!-- prettier-ignore -->
        <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Отправить</button>
    </footer>
    </div>
{/if}