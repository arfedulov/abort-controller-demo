<template>
  <h1>variants</h1>
  <p>
    This demonstrates that abort controller does not work when nuxt calls nitro
    route handlers directly. So each varian page has to be loaded from server
    avoiding client side routing.
  </p>
  <ol>
    <li>
      <a href="/one">abort event is lost (should not be lost)</a>
    </li>
    <li>
      <a href="/two"
        >abort controller works as expected if $fetch is called with full url</a
      >
    </li>
    <li>
      <a href="/three">abort controller works as expected with native fetch</a>
    </li>
    <li>
      <a href="/four">abort event emitted manually</a>
    </li>
  </ol>
</template>

<style>
li {
  margin: 8px;
}
</style>
