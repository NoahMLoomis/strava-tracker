<script lang="ts">
	import { onMount } from 'svelte';
	import { createClient, loginWithPopup, logout } from '../../auth/authService';
	import { isAuthenticated, user } from '../../auth/store';

	let auth0Client: any;
	let newTask;

	onMount(async () => {
		auth0Client = await createClient();

		isAuthenticated.set(await auth0Client.isAuthenticated());
		user.set(await auth0Client.getUser());
	});

	function login() {
		loginWithPopup(auth0Client);
	}

</script>

<div class="text-column">
	{#if $isAuthenticated}
		<div>
			<h1>Hello {$user.email}!</h1>
			<button
				class="bg-slate-100 transition-all shadow-md hover:scale-110 p-2 text-2xl rounded-lg"
				on:click={() => logout(auth0Client)}
			>
				Logout
			</button>
		</div>
	{:else}
		<button
			class="bg-slate-100 transition-all shadow-md hover:scale-110 p-2 text-2xl rounded-lg"
			on:click={login}
		>
			Login
		</button>
	{/if}
</div>
