<script setup lang="ts">
import {useSimonStore} from "@/stores/SimonStore";
import {useUserStore} from "@/stores/UserStore";
import {DIFFICULTY_TABLE} from "@/data/dataGame";
import {onMounted} from "vue";
import EndGame from "@/components/EndGame.vue";
import {useRouter} from "vue-router";
const simonStore = useSimonStore()
const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  const life: number = DIFFICULTY_TABLE[userStore.difficulty].life
  const canHelp: boolean = DIFFICULTY_TABLE[userStore.difficulty].canHelp
  const timer: number = DIFFICULTY_TABLE[userStore.difficulty].timer
  simonStore.$reset()
  simonStore.life = life
  simonStore.canHelp = canHelp
  simonStore.timer = timer
})

function goRestartGame(){
  const life: number = DIFFICULTY_TABLE[userStore.difficulty].life
  simonStore.endGame = false
  simonStore.score = 0
  simonStore.ready = false
  simonStore.life = life
}

function goChangeDifficulty(){
  userStore.list_pop = []
  router.push("/")
}

</script>


<template>
  <div>
    <div class="flex w-full flex-col md:flex-row content-between items-center p-2 md:p-0">
      <router-link
          to="/"
          class="w-full flex-1 m-2 p-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded-md block transition duration-300 m-auto text-center"
      >
        Changer difficulté
      </router-link>
      <div
          class="w-full flex-1 m-2 p-2 bg-indigo-900 hover:bg-indigo-800 text-white cursor-pointer rounded-md m-auto transition duration-300 text-center"
          v-if="!simonStore.ready"
          @click="simonStore.newGame"
      >
        Je suis prêt !
      </div>
      <div v-if="simonStore.canHelp && simonStore.ready"
           @click="simonStore.helpGame"
           class="w-full flex-1 m-2 p-2 bg-indigo-900 hover:bg-indigo-800 text-white cursor-pointer rounded-md m-auto transition duration-300 text-center"
      >
        Aidez-moi
      </div>

    </div>


    <div id="score">
      <div>Votre score : {{simonStore.score}}</div>
      <div>Mode : {{userStore.difficulty}}</div>
      <div>Vous avez {{simonStore.life}} {{simonStore.life < 2 ? "vie": "vies"}}</div>
    </div>

    <div class="text-3xl text-center p-4 uppercase font-bold">
      <div v-if="simonStore.playingSequence">Regardez bien !</div>
      <div v-if="!simonStore.playingSequence && simonStore.ready">Jouez !</div>
    </div>

    <div class="m-auto">
      <div class="col_cube">
        <div
            @click="simonStore.selectSquare('hautGauche')"
            class="flex-initial cursor-pointer hover:scale-105 transition duration-300 cube shadow-blue-800 shadow m-2"
            :class="{'bg-emerald-700' : simonStore.hautGauche, 'bg-slate-600' : !simonStore.hautGauche}"
        ></div>
        <div
            @click="simonStore.selectSquare('hautMilieu')"
            class="flex-initial cursor-pointer hover:scale-105 transition duration-300 cube shadow-blue-800 shadow m-2"
            :class="{'bg-sky-800' : simonStore.hautMilieu, 'bg-slate-600' : !simonStore.hautMilieu}"
        ></div>
        <div
            @click="simonStore.selectSquare('hautDroit')"
            class="flex-initial cursor-pointer hover:scale-105 transition duration-300 cube shadow-blue-800 shadow m-2"
            :class="{'bg-indigo-800' : simonStore.hautDroit, 'bg-slate-600' : !simonStore.hautDroit}"
        ></div>
      </div>
      <div class="col_cube">
        <div
            @click="simonStore.selectSquare('basGauche')"
            class="cursor-pointer hover:scale-105 transition duration-300 cube shadow-blue-800 shadow m-2"
            :class="{'bg-blue-700' : simonStore.basGauche, 'bg-slate-600' : !simonStore.basGauche}"
        ></div>
        <div
            @click="simonStore.selectSquare('basMilieu')"
            class="cursor-pointer hover:scale-105 transition duration-300 cube shadow-blue-800 shadow m-2"
            :class="{'bg-red-800' : simonStore.basMilieu, 'bg-slate-600' : !simonStore.basMilieu}"
        ></div>
        <div
            @click="simonStore.selectSquare('basDroit')"
            class="cursor-pointer hover:scale-105 transition duration-300 cube bg-slate-600 shadow-blue-800 shadow m-2"
            :class="{'bg-lime-800' : simonStore.basDroit, 'bg-slate-600' : !simonStore.basDroit}"
        ></div>
      </div>
    </div>
    <div v-if="simonStore.endGame">
      <EndGame :score="simonStore.score" @go-restart="goRestartGame" @go-change-difficulty="goChangeDifficulty"/>
    </div>
  </div>
</template>

<style scoped lang="sass">
=xl
  @Media screen and (min-width: 800px)
    @content

.cube
  width: 100px
  height: 100px
  +xl
    width: 200px
    height: 200px
.col_cube
  display: flex
  width: 100%
  justify-content: center
  align-items: center

#score
  width: 50%
  margin: 5px auto
  text-align: center
  font-weight: bold


</style>