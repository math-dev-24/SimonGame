<script setup lang="ts">
import {useUserStore} from "@/stores/UserStore";


const userStore = useUserStore()

</script>

<template>
  <Teleport to="body">
    <TransitionGroup tag="div" name="list" class="fixed z-30 bottom-1 right-1 flex flex-col w-full">
      <div v-for="(msg,index) in userStore.list_pop" :key="index" class="border-1 border-emerald-900 text-white p-4 font-bold bg-emerald-500 w-2/3 m-auto my-1 rounded-md text-center">
        {{msg.text}}
      </div>
    </TransitionGroup>
  </Teleport>

</template>

<style scoped lang="sass">
.list-enter-active,
.list-leave-active
  transition: all .5s ease
.list-enter-from
  transform: translateY(10px)
  opacity: 0
.list-leave-to
  opacity: 0
  transform: translateY(-20px)
</style>