<script setup lang="ts">
import { Layout, LayoutContent } from 'ant-design-vue'
import SidebarMenu from '@/components/SidebarMenu.vue'
import AppHeader from '@/components/AppHeader.vue'
</script>

<style lang="scss">
.text-white {
  color: #fff;
}
</style>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
}
.content {
  padding: 1rem;

  &-container {
    background: #fff;
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
  }
}
</style>

<template>
  <Layout class="layout">
    <AppHeader />
    <LayoutContent class="content">
      <Layout class="content-container">
        <Suspense>
          <SidebarMenu />
        </Suspense>
        <LayoutContent>
          <slot />
        </LayoutContent>
      </Layout>
    </LayoutContent>
  </Layout>
</template>
