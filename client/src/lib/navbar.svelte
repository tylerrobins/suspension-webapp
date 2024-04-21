<script>
	import { navigate } from "svelte-routing";
	import { token } from "../store";

    export let activePage;

    const logout = () => {
        localStorage.clear();
        token.set(localStorage.getItem('token'))
        navigate('/home', {replace: true})
    }

    $: isAuthenticated = $token;
</script>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
    <a class="navbar-brand" href="/">SuspensionApp</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item" class:active={activePage === 'workshop'}>
          <a class="nav-link active" aria-current="page" href="/workshop">Workshop</a>
        </li>
        <li class="nav-item" class:active={activePage === 'clients'}>
          <a class="nav-link" href="/clients">Clients</a>
        </li>
      </ul>
      {#if activePage !== 'login'}
      <div class="d-flex">
        {#if isAuthenticated}
            <button class="btn btn-outline-success" on:click={logout}>Logout</button>
        {:else}
            <button style="color: grey;" class="btn btn-link" on:click={() => {navigate('/register', {replace: true})}}>Sign up</button>
            <button class="btn btn-outline-success" on:click={() => {navigate('/login', {replace: true})}}>Login</button>
        {/if}
      </div>
      {/if}
    </div>
  </div>
</nav>

<style>
    .active > a {
        color: blue;
        font-weight: bold;
    }
</style>