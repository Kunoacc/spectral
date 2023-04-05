<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Layout, LayoutHeader, Menu, LayoutContent, TypographyText } from 'ant-design-vue'
import SidebarMenu from '@/components/sidebarMenu.vue'
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
}

.text-white {
  color: #fff;
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
    <LayoutHeader>
      <TypographyText strong class="text-white">Spectral</TypographyText>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys="1"></Menu>
    </LayoutHeader>

    <LayoutContent class="content">
      <Layout class="content-container">
        <Suspense>
          <SidebarMenu/>
        </Suspense>
        <LayoutContent>
          <slot />
        </LayoutContent>
      </Layout>

    </LayoutContent>
  </Layout>
</template>