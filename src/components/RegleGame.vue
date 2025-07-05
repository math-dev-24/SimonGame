<script setup lang="ts">
const emit = defineEmits<{
  (e: "goClose"):void
}>()

const difficultyModes = [
  {
    name: 'Novice',
    icon: '🎯',
    lives: 9,
    help: 'Aide disponible',
    description: 'Mode découverte parfait pour débuter',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-500/10'
  },
  {
    name: 'Normal',
    icon: '⚡',
    lives: 5,
    help: 'Aide disponible',
    description: 'Niveau intermédiaire équilibré',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-500/10'
  },
  {
    name: 'Expert',
    icon: '🔥',
    lives: 3,
    help: 'Pas d\'aide',
    description: 'Pour les joueurs expérimentés',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-500/10'
  },
  {
    name: 'Extreme',
    icon: '💀',
    lives: 0,
    help: 'Pas d\'aide',
    description: 'Vitesse augmentée, défi ultime',
    color: 'from-red-500 to-pink-600',
    bgColor: 'bg-red-500/10'
  }
]
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div 
      @click="emit('goClose')" 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
    ></div>

    <!-- Modal -->
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="relative w-full max-w-4xl max-h-[95vh] animate-modalIn">
        <!-- Modal content -->
        <div class="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
          <!-- Header -->
          <div class="relative p-8 pb-6">
            <!-- Background decoration -->
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10"></div>
            <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl"></div>
            
            <div class="relative text-center">
              <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Règles du jeu
              </h1>
              <p class="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Une série d'instructions va être présentée. Vous devrez la ré-exécuter dans le bon ordre !
              </p>
            </div>
          </div>

          <!-- Content -->
          <div class="px-8 pb-8 flex-1 overflow-y-auto">
            <!-- Difficulty modes -->
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-white mb-6 text-center">Modes de difficulté</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="mode in difficultyModes"
                  :key="mode.name"
                  class="relative group p-6 rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:border-slate-600 transition-all duration-300"
                >
                  <!-- Mode header -->
                  <div class="flex items-center gap-3 mb-4 relative z-10">
                    <div class="text-3xl">{{ mode.icon }}</div>
                    <div>
                      <h3 class="text-xl font-bold text-white">{{ mode.name }}</h3>
                      <p class="text-slate-400 text-sm">{{ mode.description }}</p>
                    </div>
                  </div>

                  <!-- Mode details -->
                  <div class="space-y-2 relative z-10">
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span class="text-slate-300">
                        <span class="font-semibold">{{ mode.lives }}</span> 
                        {{ mode.lives === 0 ? 'vie' : mode.lives === 1 ? 'vie' : 'vies' }}
                      </span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span class="text-slate-300">{{ mode.help }}</span>
                    </div>
                  </div>

                  <!-- Hover effect -->
                  <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br z-0"
                       :class="mode.color"></div>
                </div>
              </div>
            </div>

            <!-- How to play -->
            <div class="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span class="text-2xl">🎮</span>
                Comment jouer
              </h3>
              <div class="space-y-3 text-slate-300">
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                  <p>Observez attentivement la séquence de couleurs qui s'allume</p>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                  <p>Reproduisez la séquence en cliquant sur les couleurs dans le bon ordre</p>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                  <p>La séquence s'allonge à chaque tour réussi. Continuez le plus longtemps possible !</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Close button -->
          <div class="absolute top-4 right-4">
            <button
              @click="emit('goClose')"
              class="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 hover:border-slate-500 transition-all duration-300 flex items-center justify-center group"
            >
              <svg class="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Action button -->
          <div class="p-8 pt-0 flex-shrink-0">
            <button
              @click="emit('goClose')"
              class="w-full py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25"
            >
              J'ai compris ! 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-modalIn {
  animation: modalIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>