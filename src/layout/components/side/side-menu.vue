<template>
  <div v-if="showMenu(item.meta)">
    <template v-if="hasOneShowingChild(children)">
      <Submenu :name="meta.name">
        <side-menu-item slot="title" :icon="meta.icon" :title="meta.title" />
        <template v-for="childrenItem in children">
          <side-menu :key="childrenItem.name" :item="childrenItem" />
        </template>
      </Submenu>
    </template>
    <template v-else>
      <MenuItem :name="meta.name" @click.native="toPage(meta)">
        <side-menu-item :icon="meta.icon" :title="meta.title" />
      </MenuItem>
    </template>
  </div>
</template>

<script>
import sideMenuItem from './side-menu-item.vue'
import menuMixins from './menuMixins'
export default {
  name: 'side-menu',
  mixins: [menuMixins],
  components: {
    sideMenuItem
  },
  methods: {
    toPage(meta) {
      this.$router.push({
        name: meta.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
