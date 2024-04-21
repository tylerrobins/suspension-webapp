<script>
	import { onMount } from "svelte";
    import Navbar from "../lib/navbar.svelte";

    let data = [];
    let error = null;

    onMount(async() => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/user/list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            data = await response.json()
            console.log(data)
        } catch (err) {
            error = err.message;
        }
    })

</script>

<main>
<Navbar activePage="clients"/>
<div class="py-3 text-center">
    <h1 class="display-5 fw-bold text-body-emphasis">Clients</h1>
</div>
{#if error}
    <p>Error: {error}</p>
{:else if data.length > 0}
    <ul>
        {#each data as item}
            <li>{item.email}</li>
        {/each}
    </ul>
{:else}
    <p>Loading...</p>
{/if}
</main>

<style>
</style>
