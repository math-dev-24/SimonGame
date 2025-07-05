<script setup lang="ts">
import {ref} from "vue";
import RegleGame from "@/components/RegleGame.vue"
import {useUserStore} from "@/stores/UserStore";

const userStore = useUserStore()

const modalHelp = ref<boolean>(false)

const modes = [
  { name: 'Novice', description: 'Parfait pour débuter', color: 'from-green-400 to-green-600', icon: '🎯' },
  { name: 'Normal', description: 'Niveau intermédiaire', color: 'from-blue-400 to-blue-600', icon: '⚡' },
  { name: 'Expert', description: 'Pour les joueurs expérimentés', color: 'from-purple-400 to-purple-600', icon: '🔥' },
  { name: 'Extreme', description: 'Défi ultime', color: 'from-red-400 to-red-600', icon: '💀' }
]

const selectedMode = ref(modes.find(mode => mode.name === userStore.difficulty) || modes[0])

const selectMode = (mode: any) => {
  selectedMode.value = mode
  userStore.difficulty = mode.name
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
    <div class="relative z-10 container mx-auto px-4 py-16">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-6xl md:text-8xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 animate-pulse">
          SIMON
        </h1>
        <p class="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Testez votre mémoire avec ce jeu classique. Suivez la séquence et devenez le champion !
        </p>
      </div>

      <!-- Difficulty selection -->
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-white text-center mb-8">
          Choisissez votre niveau
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div
            v-for="mode in modes"
            :key="mode.name"
            @click="selectMode(mode)"
            :class="[
              'relative group cursor-pointer transition-all duration-300 transform hover:scale-105 rounded-2xl',
              selectedMode.name === mode.name 
                ? 'ring-4 ring-emerald-400 ring-opacity-50' 
                : 'hover:ring-2 hover:ring-slate-400 hover:ring-opacity-30'
            ]"
          >
            <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                 :class="mode.color"></div>
            <div class="relative bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 text-center h-full">
              <div class="text-4xl mb-4">{{ mode.icon }}</div>
              <h3 class="text-xl font-bold text-white mb-2">{{ mode.name }}</h3>
              <p class="text-slate-400 text-sm">{{ mode.description }}</p>
              
              <!-- Selection indicator -->
              <div v-if="selectedMode.name === mode.name" 
                   class="absolute top-4 right-4 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Start button -->
        <div class="text-center">
          <router-link 
            to="/simon-game-play" 
            class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25"
          >
            <span class="mr-3">🚀</span>
            Commencer le jeu
            <span class="ml-3">→</span>
          </router-link>
        </div>
      </div>

      <!-- Help button -->
      <div class="fixed top-6 right-6 z-20">
        <button
          @click="modalHelp = true"
          class="group relative p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-full hover:bg-slate-700/80 transition-all duration-300 transform hover:scale-110"
        >
          <svg class="w-6 h-6 text-slate-300 group-hover:text-emerald-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.95 18q.525 0 .888-.363t.362-.887q0-.525-.362-.888t-.888-.362q-.525 0-.887.363t-.363.887q0 .525.363.888t.887.362Zm-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.313.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/>
          </svg>
          
          <!-- Tooltip -->
          <div class="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div class="bg-slate-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
              Règles du jeu
            </div>
            <div class="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-slate-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <template v-if="modalHelp">
      <RegleGame @go-close="modalHelp = false" />
    </template>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>