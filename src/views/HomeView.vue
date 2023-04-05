<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 4rem 1rem;
  font-size: 1.2rem;
  text-align: center;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: left;
}
</style>

<template>
  <main class="container">
    <h1 class="page-title">No Asset Selected</h1>
    <p>Please select an asset from the sidebar.</p>
  </main>
</template>
