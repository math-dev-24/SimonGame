<template>
  <h1 class="text-center font-bold text-2xl my-3">Jeu de simon</h1>

  <router-view v-slot="{ Component, route }">
    <Transition name="page" mode="out-in" appear>
      <div :key="route.name" class="container m-auto">
        <component :is="Component" />
      </div>
    </Transition>
  </router-view>
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