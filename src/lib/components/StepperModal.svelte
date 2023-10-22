<script lang="ts">
    import icon from "$lib/assets/icons/check.svg?raw"

    export let parent: any

    import { getToastStore } from "@skeletonlabs/skeleton"

    const toast = getToastStore()

    // Stores
    import { Step, Stepper, getModalStore } from "@skeletonlabs/skeleton"
    const modalStore = getModalStore()
    const clb = $modalStore[0].response ?? null;

    // Form Data
    const formData = {
        text: $modalStore[0].body,
    }

    $: errt = document.querySelector(".errt").innerText

    let chip = null

    $: stepText = ""
    $: selectedChip = chip

    // We've created a custom submit function to pass the response and close the modal.
    function onFormSubmit(): void {
        if ($modalStore[0].response) $modalStore[0].response(formData)
        modalStore.close()
    }
    function autofill(e) {
        let text = e.target.innerText.toLowerCase()
        if (stepText.length == 0)
            text = text.charAt(0).toUpperCase() + text.substring(1)
        if (text[text.length - 1] != " ") text = " " + text
        formData.text = stepText + text
    }
    function onStep() {
        stepText = String(formData.text)
        chip = null
    }
    function setChip(val, ind) {
        if (chip === ind) {
            chip = undefined
            formData.text = stepText
            return
        }
        chip = ind
        let text = val.toLowerCase()
        if (stepText.length == 0)
            text = text.charAt(0).toUpperCase() + text.substring(1)
        if (text[text.length - 1] != " ") text = " " + text
        formData.text = stepText + text
    }
    function onBack() {
        chip = null
        formData.text = "" //stepText.replace(document.querySelectorAll('.chiptext')[chip].innerText, "");
    }

    // Base Classes
    const cBase = "card p-4 w-modal shadow-xl space-y-4"
    const cHeader = "text-2xl font-bold"
    const cForm = "p-4 space-y-4 rounded-container-token"

    const stepdata = [
        {
            title: "Приветствие",
            values: [
                "Простите, но в настоящее время данная функция не может быть использована,",
                "Простите, но на текущий момент эта опция не функционирует,",
                "К сожалению, на данный момент эта функция не работает,",
                "На данный момент недоступна,",
            ],
        },
        {
            title: "Решение проблемы",
            values: [
                "Вы можете",
                "Мы можем вам предложить",
                "Сейчас альтернативным вариантом является",
            ],
        },
        {
            title: "Решение в зависимости от ошибки",
            kwvals: {
                DATA: [
                    "проверить правильность загружаемых данных.",
                    "обратиться к оператору, чтобы решить проблему.",
                ],
                EXECUTION: [
                    "повторить запрос позже.",
                    "проверить правильность запроса.",
                    "обратиться к оператору, чтобы решить проблему.",
                ],
                TRANSPORT: [
                    "повторить запрос позже.",
                    "обратиться к оператору, чтобы решить проблему.",
                ],
            },
        },
        {
            title: "",
            values: [
                "Приносим извинения за предоставленные неудобства. Мы уже решаем эту проблему и в ближайшее время устраним её.",
                "Простите за доставленные неудобства. Наша команда работает над устранением проблемы.",
                "Извините за доставленные неудобства. Мы работаем над решением проблемы.",
                "Наша команда приносит извинения. Мы приложим все усилия, чтобы решить эту проблему как можно скорее.",
            ],
        },
        {
            title: "",
            values: [
                "Мы обязательно сообщим вам сразу, как устраним все неполадки.",
                "Вам придет уведомление, как только неполадки будут устранены.",
                "Вы будете уведомлены, как только проблема будет решена.",
                "Как только проблема будет решена, вы получите уведомление.",
            ],
        },
    ]
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
    <div class="modal-example-form {cBase}">
        <header class={cHeader}>{$modalStore[0].title ?? ""}</header>
        <Stepper
            stepTerm="Шаг"
            buttonCompleteLabel="Отправить"
            on:step={onStep}
            buttonNextLabel={"Далее"}
            buttonBackLabel={"Назад"}
            on:back={onBack}
            on:complete={(q) => {
                console.log(q);
                
                parent.onClose()
                if (clb) clb(formData.text)
                toast.trigger({
                    message: "Сообщение сохранено",
                    timeout: 1700,
                    hideDismiss: true,
                })
            }}
        >
            {@debug parent}
            {#each stepdata as dd}
                <Step>
                    <svelte:fragment slot="header">{dd.title}</svelte:fragment>
                    <div class="cForm">
                        <textarea
                            cols="30"
                            rows="3"
                            class="input rounded-[15px] py-2 px-3"
                            bind:value={formData.text}
                        />
                        <div
                            class="flex justify-center gap-x-3 py-3 flex-1 flex-wrap gap-y-2 px-4"
                        >
                            {#if dd.kwvals !== undefined}
                                {@const cur = dd.kwvals[errt]}
                                <div class="flex flex-col">
                                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                                    <div class="flex gap-x-2">
                                        {#each cur as c, i}
                                            <span
                                                on:click={() => setChip(c, i)}
                                                on:keyup
                                                class="max-w-16 whitespace-break-spaces h-fit chip {i ===
                                                selectedChip
                                                    ? 'variant-filled'
                                                    : 'variant-ringed'}"
                                            >
                                                {#if i === selectedChip}
                                                    <span
                                                        class="fill-white h-[12px] w-[12px]"
                                                        >{@html icon}</span
                                                    >
                                                {/if}
                                                <span
                                                    class="chiptext block break-words"
                                                    >{c}</span
                                                >
                                            </span>
                                        {/each}
                                        <br />
                                    </div>
                                </div>
                            {:else}
                                {#each dd.values as c, i}
                                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                                    <span
                                        on:click={() => setChip(c, i)}
                                        on:keyup
                                        class="max-w-16 whitespace-break-spaces h-fit chip {i ===
                                        selectedChip
                                            ? 'variant-filled'
                                            : 'variant-ringed'}"
                                    >
                                        {#if i === selectedChip}
                                            <span
                                                class="fill-white h-[12px] w-[12px]"
                                                >{@html icon}</span
                                            >
                                        {/if}
                                        <span class="chiptext block break-words"
                                            >{c}</span
                                        >
                                    </span>
                                {/each}
                            {/if}
                        </div>
                    </div>
                </Step>
            {/each}
            <!-- <Step>
                <svelte:fragment slot="header">Приветствие</svelte:fragment>
                <div class="cForm">
                    <textarea
                        cols="30"
                        rows="3"
                        class="input rounded-[15px] py-2 px-3"
                        bind:value={formData.text}
                    />
                    <div class="flex justify-center gap-x-3 py-3">
                        {#each ["Здравствуйте", "Пидораствуйте", "Всем привет я мориарти"] as c, i}
                            <span
                                on:click={() => setChip(c, i)}
                                on:keyup
                                class="chip {i === selectedChip
                                    ? 'variant-filled'
                                    : 'variant-ringed'}"
                            >
                                {#if i === selectedChip}
                                    <span class="fill-white h-[12px] w-[12px]"
                                        >{@html icon}</span
                                    >
                                {/if}
                                <span>{c}</span>
                            </span>
                        {/each}
                    </div>
                </div>
            </Step>
            <Step>
                <svelte:fragment slot="header">Решение</svelte:fragment>
                <div class="cForm">
                    <textarea
                        cols="30"
                        rows="3"
                        class="input rounded-[15px] py-2 px-3"
                        bind:value={formData.text}
                    />
                    <div class="flex justify-center gap-x-3 py-3">
                        {#each ["Здравствуйте", "Пидораствуйте", "Всем привет я мориарти"] as c, i}
                            <span
                                on:click={() => setChip(c, i)}
                                on:keyup
                                class="chip {i === selectedChip
                                    ? 'variant-filled'
                                    : 'variant-ringed'}"
                            >
                                {#if i === selectedChip}
                                    <span class="fill-white h-[12px] w-[12px]"
                                        >{@html icon}</span
                                    >
                                {/if}
                                <span>{c}</span>
                            </span>
                        {/each}
                    </div>
                </div>
            </Step>
            <Step
                ><svelte:fragment slot="header">Обратная связь</svelte:fragment>
                Соси жопу
            </Step> -->
            <Step
                ><svelte:fragment slot="header">Завершите ответ</svelte:fragment
                >
                <div class="cForm">
                    <textarea
                        cols="30"
                        rows="5"
                        class="input rounded-[15px] py-2 px-3"
                        bind:value={formData.text}
                    />
                </div>
            </Step>
        </Stepper>
        <!-- Enable for debugging: -->
        <!-- <form class="modal-form {cForm}">
            <label class="label">
                <span />
                <textarea
                    class="input p-2 rounded-[10px]"
                    bind:value={formData.text}
                    placeholder="Введите текст..."
                />
            </label>
        </form> -->
        <!-- <footer class="modal-footer {parent.regionFooter}">
            <button
                class="btn {parent.buttonNeutral}"
                on:click={parent.onClose}>{parent.buttonTextCancel}</button
            >
            <button
                class="btn {parent.buttonPositive}"
                on:click={onFormSubmit}>Отправить</button
            >
        </footer> -->
    </div>
{/if}
