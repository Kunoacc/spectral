<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Layout, LayoutHeader, Menu, LayoutContent, TypographyText } from 'ant-design-vue'
import SidebarMenu from '@/components/sidebar-menu.vue'
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
        <SidebarMenu :loading="false" :items="[
            { 'id': 0, 'name': 'Asset 0', 'parentId': null },
            { 'id': 1, 'name': 'Asset 1', 'parentId': null },
            { 'id': 2, 'name': 'Asset 2', 'parentId': 1 },
            { 'id': 3, 'name': 'Asset 3', 'parentId': 1 },
            { 'id': 4, 'name': 'Asset 4', 'parentId': 3 },
            { 'id': 5, 'name': 'Asset 5', 'parentId': null },
            { 'id': 6, 'name': 'Asset 5', 'parentId': 5 },
        ]" />
        <LayoutContent>
          <slot />
        </LayoutContent>
      </Layout>

    </LayoutContent>
  </Layout>
</template>