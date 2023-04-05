<script setup lang="ts">
import { LayoutHeader, Menu, TypographyText, Dropdown, MenuItem } from 'ant-design-vue'
import { DownCircleOutlined, CheckCircleOutlined } from '@ant-design/icons-vue'
import { useAppStateStore } from '@/stores/appState';

const appState = useAppStateStore()

function handleMenuItemClick({ key }: any) {
  appState.setPalette(key)
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.dropdown-title {
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 0.5rem;
}

.palette {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  padding: 1rem;
}
</style>

<style lang="scss">
.palette-item {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  &__active {
    background-color: rgba(0 ,0, 0, 0.35);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

<template>
  <LayoutHeader class="header">
    <TypographyText strong class="text-white">Spectral</TypographyText>
    <Dropdown>
      <a @click.prevent class="text-white dropdown-title">
        <span>Change Theme</span>
        <DownCircleOutlined></DownCircleOutlined>
      </a>

      <template #overlay>
        <Menu
          defaultSelectedKeys="1" 
          class="palette"
          @click="handleMenuItemClick">
          <MenuItem 
            :key="index" v-for="(palette, index) in appState.colorPalettes" 
            class="palette-item"
            :style="{backgroundColor: palette.primaryColor}">
            <div v-if="palette.primaryColor === appState.activePalette?.primaryColor" class="palette-item__active text-white">
              <CheckCircleOutlined/>
            </div>
          </MenuItem>
        </Menu>
      </template>
    </Dropdown>
  </LayoutHeader>
</template>