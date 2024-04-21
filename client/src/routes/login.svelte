<script>
	import { navigate } from "svelte-routing";
	import { token } from "../store";

  import Navbar from "../lib/navbar.svelte";
  
  const appendAlert = () => {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
    `<div class="alert alert-light alert-dismissible" role="alert">`,
     `<div>Incorrect Email or Password!</div>`,
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
  }

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch('http://localhost:8080/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('token', '1')
		    token.set(localStorage.getItem('token'))
		    navigate('/home', {replace: true})
      } else {
		    console.error(result.message)
        appendAlert()
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
</script>

<main>

  <Navbar activePage="login"/>
  <div class="main-page d-flex align-items-center py-4 bg-body-tertiary">
    <div class="form-signin w-100 m-auto">
      <div id="liveAlertPlaceholder"></div>
      <form on:submit={handleSubmit}>
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
        <div class="form-floating">
          <input name="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com" data-nlok-ref-guid="0fa3aba7-87d1-4244-cde9-9f6c71e0964c" autocomplete="off" required>
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input name="password" type="password" class="form-control" id="floatingPassword" placeholder="Password" data-nlok-ref-guid="54b9b4cf-c751-42be-c6bc-00aca082dbe7" autocomplete="off" required>
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-check text-start my-3">
          <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">Remember me</label>
        </div>
        <button class="btn btn-primary w-100 py-2" type="submit" data-nlok-ref-guid="85d0a875-db8b-4162-ad91-c86cb5ce0674">Sign in</button>
        <p>Don't have an account? <a class="btn-link" href="/register">Sign up</a></p>
      </form>
    </div>
  </div>
</main>

<style>
</style>