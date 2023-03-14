<script setup lang="ts">
import ListPop from "@/components/ListPop.vue"
</script>

<template>
  <div class="bg-slate-800 w-full min-h-screen text-black text-white">
    <h1 class="text-center py-6 font-bold text-2xl uppercase">Jeu de simon</h1>
    <router-view v-slot="{ Component}">
      <Transition name="page" mode="out-in" appear>
        <div class="container m-auto">
          <component :is="Component" />
        </div>
      </Transition>
    </router-view>
    <ListPop></ListPop>
  </div>
</template>



<style scoped lang="sass">
.page-enter-active,
.page-leave-active
  transition: all 0.3s
.page-enter-from
  transform: translateX(-20px)
  opacity: 0
  transition-delay: .3s
.page-leave-to
  transform: translateX(20px)
  opacity: 0


</style>