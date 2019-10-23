<template>
  <header id="nav" class="header">
    <nav class="navbar navbar-expand-md navbar-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <router-link to="/" class="nav-link active" href="#">Landing</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/home" class="nav-link" href="#">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/planet" class="nav-link" href="#">Planet</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "navbar"
};
</script>

<style lang="scss" scoped>
#nav {
  padding: 30px;
  nav a {
    font-weight: bold;
    color: #2c3e50;
    transition: all ease-in-out 0.8s;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>