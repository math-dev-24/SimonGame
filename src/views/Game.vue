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

const difficultyColors = {
  'Novice': 'from-green-500 to-emerald-600',
  'Normal': 'from-blue-500 to-indigo-600',
  'Expert': 'from-purple-500 to-violet-600',
  'Extreme': 'from-red-500 to-pink-600'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <!-- Main content -->
    <div class="relative z-10 container mx-auto px-4 py-8">
      <!-- Header with controls -->
      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <router-link
          to="/"
          class="flex-1 group relative overflow-hidden rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:border-slate-600 transition-all duration-300"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative p-4 text-center">
            <div class="flex items-center justify-center gap-2 text-white font-semibold">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Changer difficulté
            </div>
          </div>
        </router-link>

        <button
          v-if="simonStore.canHelp && simonStore.ready"
          @click="simonStore.helpGame"
          class="flex-1 group relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
        >
          <div class="p-4 text-center">
            <div class="flex items-center justify-center gap-2 text-white font-bold text-lg">
              <span>💡</span>
              Aidez-moi
            </div>
          </div>
        </button>
      </div>

      <!-- Score and stats -->
      <div class="mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Score -->
          <div class="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 text-center">
            <div class="text-2xl font-bold text-white mb-2">{{ simonStore.score }}</div>
            <div class="text-slate-400 text-sm">Score</div>
          </div>

          <!-- Difficulty -->
          <div class="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 text-center">
            <div class="text-lg font-bold text-white mb-2">{{ userStore.difficulty }}</div>
            <div class="text-slate-400 text-sm">Mode</div>
          </div>

          <!-- Lives -->
          <div class="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 text-center">
            <div class="flex items-center justify-center gap-2 mb-2">
              <div class="text-2xl font-bold text-white">{{ simonStore.life }}</div>
              <div class="text-red-400 text-xl">❤️</div>
            </div>
            <div class="text-slate-400 text-sm">{{ simonStore.life < 2 ? "Vie" : "Vies" }}</div>
          </div>
        </div>
      </div>

      <!-- Game status -->
      <div class="text-center mb-8">
        <div v-if="simonStore.playingSequence" 
             class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
          👀 Regardez bien !
        </div>
        <div v-if="!simonStore.playingSequence && simonStore.ready" 
             class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
          🎮 Jouez !
        </div>
      </div>

      <!-- Game board -->
      <div class="flex justify-center mb-8">
        <div class="grid grid-cols-3 gap-4 max-w-2xl">
          <!-- Top row -->
          <div
            @click="simonStore.selectSquare('hautGauche')"
            class="relative group cursor-pointer transition-all duration-300 transform hover:scale-105"
            :class="[
              'w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-2xl border-2',
              simonStore.hautGauche 
                ? 'bg-emerald-500 border-emerald-400 shadow-emerald-500/50' 
                : 'bg-slate-700 border-slate-600 hover:border-emerald-400/50'
            ]"
          >
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div
            @click="simonStore.selectSquare('hautMilieu')"
            class="relative group cursor-pointer transition-all duration-300 transform hover:scale-105"
            :class="[
              'w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-2xl border-2',
              simonStore.hautMilieu 
                ? 'bg-sky-500 border-sky-400 shadow-sky-500/50' 
                : 'bg-slate-700 border-slate-600 hover:border-sky-400/50'
            ]"
          >
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-400/20 to-sky-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div
            @click="simonStore.selectSquare('hautDroit')"
            class="relative group cursor-pointer transition-all duration-300 transform hover:scale-105"
            :class="[
              'w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-2xl border-2',
              simonStore.hautDroit 
                ? 'bg-indigo-500 border-indigo-400 shadow-indigo-500/50' 
                : 'bg-slate-700 border-slate-600 hover:border-indigo-400/50'
            ]"
          >
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-400/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <!-- Bottom row -->
          <div
            @click="simonStore.selectSquare('basGauche')"
            class="relative group cursor-pointer transition-all duration-300 transform hover:scale-105"
            :class="[
              'w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-2xl border-2',
              simonStore.basGauche 
                ? 'bg-blue-500 border-blue-400 shadow-blue-500/50' 
                : 'bg-slate-700 border-slate-600 hover:border-blue-400/50'
            ]"
          >
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div
            @click="simonStore.selectSquare('basMilieu')"
            class="relative group cursor-pointer transition-all duration-300 transform hover:scale-105"
            :class="[
              'w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-2xl border-2',
              simonStore.basMilieu 
                ? 'bg-red-500 border-red-400 shadow-red-500/50' 
                : 'bg-slate-700 border-slate-600 hover:border-red-400/50'
            ]"
          >
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-400/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div
            @click="simonStore.selectSquare('basDroit')"
            class="relative group cursor-pointer transition-all duration-300 transform hover:scale-105"
            :class="[
              'w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-2xl border-2',
              simonStore.basDroit 
                ? 'bg-lime-500 border-lime-400 shadow-lime-500/50' 
                : 'bg-slate-700 border-slate-600 hover:border-lime-400/50'
            ]"
          >
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-lime-400/20 to-lime-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>

      <!-- Step times recap -->
      <div v-if="simonStore.stepTimes.length > 0" class="mb-8">
        <div class="max-w-2xl mx-auto">
          <h3 class="text-xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
            <span class="text-2xl">⏱️</span>
            Temps par étape
          </h3>
          
          <div class="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
            <!-- Header -->
            <div class="grid grid-cols-3 gap-4 p-4 bg-slate-700/50 border-b border-slate-600">
              <div class="text-center font-semibold text-white">Rang</div>
              <div class="text-center font-semibold text-white">Étape</div>
              <div class="text-center font-semibold text-white">Temps</div>
            </div>
            
            <!-- Rows -->
            <div class="max-h-48 overflow-y-auto">
              <div 
                v-for="(stepTime, index) in [...simonStore.stepTimes].sort((a, b) => b.time - a.time)" 
                :key="index"
                class="grid grid-cols-3 gap-4 p-3 border-b border-slate-600/50 hover:bg-slate-700/30 transition-colors duration-200"
              >
                <div class="text-center text-slate-300">
                  <span class="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                        :class="{
                          'bg-yellow-500 text-yellow-900': index === 0,
                          'bg-slate-500 text-slate-900': index === 1,
                          'bg-orange-600 text-orange-900': index === 2,
                          'bg-slate-600 text-slate-200': index > 2
                        }">
                    {{ index + 1 }}
                  </span>
                </div>
                <div class="text-center text-white font-medium">{{ stepTime.step }}</div>
                <div class="text-center">
                  <span class="text-sm font-mono"
                        :class="{
                          'text-yellow-400': index === 0,
                          'text-slate-300': index === 1,
                          'text-orange-400': index === 2,
                          'text-slate-400': index > 2
                        }">
                    {{ stepTime.time }}ms
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Stats footer -->
            <div v-if="simonStore.getStepTimesStats()" class="p-4 bg-slate-700/30 border-t border-slate-600">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                <div>
                  <div class="text-slate-400">Moyenne</div>
                  <div class="text-white font-semibold">{{ simonStore.getStepTimesStats()?.averageTime }}ms</div>
                </div>
                <div>
                  <div class="text-slate-400">Plus rapide</div>
                  <div class="text-emerald-400 font-semibold">{{ simonStore.getStepTimesStats()?.minTime }}ms</div>
                </div>
                <div>
                  <div class="text-slate-400">Plus lent</div>
                  <div class="text-red-400 font-semibold">{{ simonStore.getStepTimesStats()?.maxTime }}ms</div>
                </div>
                <div>
                  <div class="text-slate-400">Total</div>
                  <div class="text-blue-400 font-semibold">{{ simonStore.getStepTimesStats()?.totalSteps }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- End game modal -->
    <div v-if="simonStore.endGame">
      <EndGame :score="simonStore.score" @go-restart="goRestartGame" @go-change-difficulty="goChangeDifficulty"/>
    </div>

    <Teleport to="body" v-if="!simonStore.ready">
          <div class="fixed top-0 left-0 z-50 w-full h-full bg-black/70"></div>
          <div class="fixed top-0 left-0 z-50 w-2/4 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center bg-slate-400 rounded-2xl">

            <button
            @click="simonStore.newGame"
            class="cursor-pointer flex-1 group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            <div class="p-4 text-center">
              <div class="flex items-center justify-center gap-2 text-white font-bold text-lg">
                <span>🚀</span>
                Je suis prêt !
              </div>
            </div>
          </button>
          </div>

      </Teleport>
  </div>
</template>

<style scoped>
/* Animations pour les carrés actifs */
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px currentColor;
  }
  50% {
    box-shadow: 0 0 40px currentColor, 0 0 60px currentColor;
  }
}

/* Animation pour les carrés quand ils sont actifs */
.bg-emerald-500,
.bg-sky-500,
.bg-indigo-500,
.bg-blue-500,
.bg-red-500,
.bg-lime-500 {
  animation: glow 0.5s ease-in-out;
}
</style>