<script>
  import { Router, Route } from 'svelte-routing';
  import ProtectedRoute from './lib/ProtectedRoute.svelte';

  import Login from './routes/login.svelte';
	import Register from './routes/register.svelte';

  import Workshop from './routes/workshop.svelte';
	import Clients from './routes/clients.svelte';
</script>

<Router>
  <Route path="/login" component={Login}></Route>
  <Route path="/register" component={Register}></Route>
  <ProtectedRoute path="/" component={Workshop}></ProtectedRoute>
  <ProtectedRoute path="/home" component={Workshop}></ProtectedRoute>
  <ProtectedRoute path="/workshop" component={Workshop}></ProtectedRoute>
  <ProtectedRoute path="/clients" component={Clients}></ProtectedRoute>
</Router>