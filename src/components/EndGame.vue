<script setup lang="ts">
import { useSimonStore } from "@/stores/SimonStore";

const props = defineProps<{
  score: number
}>()

const emit = defineEmits<{
  (e: 'goRestart'):void
  (e: 'goChangeDifficulty'):void
}>()

const simonStore = useSimonStore()

// Obtenir les statistiques des temps
const stats = simonStore.getStepTimesStats()

// Fonction pour formater le temps en secondes
const formatTime = (ms: number) => {
  return (ms / 1000).toFixed(2)
}

// Fonction pour obtenir le message selon le score
const getScoreMessage = (score: number) => {
  if (score === 0) return "Dommage, essayez encore !"
  if (score < 5) return "Pas mal pour commencer !"
  if (score < 10) return "Bien joué !"
  if (score < 15) return "Excellent !"
  if (score < 20) return "Impressionnant !"
  return "Légendaire ! 🏆"
}

// Fonction pour obtenir l'emoji selon le score
const getScoreEmoji = (score: number) => {
  if (score === 0) return "😢"
  if (score < 5) return "😊"
  if (score < 10) return "😎"
  if (score < 15) return "🤩"
  if (score < 20) return "🔥"
  return "👑"
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
    ></div>

    <!-- Modal -->
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="relative w-full max-w-2xl animate-modalIn">
        <!-- Modal content -->
        <div class="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
          <!-- Header -->
          <div class="relative p-8 pb-6">
            <!-- Background decoration -->
            <div class="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10"></div>
            <div class="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl"></div>
            
            <div class="relative text-center">
              <div class="text-6xl mb-4">{{ getScoreEmoji(props.score) }}</div>
              <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
                Partie terminée !
              </h1>
              <p class="text-xl text-slate-300 mb-2">
                {{ getScoreMessage(props.score) }}
              </p>
              <div class="text-3xl font-bold text-white">
                Score final : <span class="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">{{ props.score }}</span>
              </div>
            </div>
          </div>

          <!-- Stats section -->
          <div v-if="stats" class="px-8 pb-6 mt-4">
            <div class="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <h3 class="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                <span class="text-2xl">📊</span>
                Statistiques de la partie
              </h3>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-white">{{ stats.totalSteps }}</div>
                  <div class="text-slate-400 text-sm">Étapes</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-emerald-400">{{ formatTime(stats.averageTime) }}s</div>
                  <div class="text-slate-400 text-sm">Moyenne</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-400">{{ formatTime(stats.minTime) }}s</div>
                  <div class="text-slate-400 text-sm">Plus rapide</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-red-400">{{ formatTime(stats.maxTime) }}s</div>
                  <div class="text-slate-400 text-sm">Plus lent</div>
                </div>
              </div>

              <!-- Best times -->
              <div v-if="stats.stepTimes.length > 0" class="mt-4">
                <h4 class="text-lg font-semibold text-white mb-3 text-center">Meilleurs temps</h4>
                <div class="flex justify-center gap-2">
                  <div 
                    v-for="(stepTime, index) in stats.stepTimes.slice(0, 3)" 
                    :key="index"
                    class="flex items-center gap-2 px-3 py-2 rounded-lg"
                    :class="{
                      'bg-yellow-500/20 border border-yellow-500/30': index === 0,
                      'bg-slate-500/20 border border-slate-500/30': index === 1,
                      'bg-orange-500/20 border border-orange-500/30': index === 2
                    }"
                  >
                    <span class="text-sm font-bold"
                          :class="{
                            'text-yellow-400': index === 0,
                            'text-slate-300': index === 1,
                            'text-orange-400': index === 2
                          }">
                      {{ index + 1 }}
                    </span>
                    <span class="text-sm text-white">Étape {{ stepTime.step }}</span>
                    <span class="text-sm font-mono"
                          :class="{
                            'text-yellow-400': index === 0,
                            'text-slate-300': index === 1,
                            'text-orange-400': index === 2
                          }">
                      {{ formatTime(stepTime.time) }}s
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="p-8 pt-0">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                @click="emit('goRestart')"
                class="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
              >
                <div class="p-4 text-center">
                  <div class="flex items-center justify-center gap-2 text-white font-bold text-lg">
                    <span>🔄</span>
                    Rejouer
                  </div>
                  <div class="text-amber-100 text-sm mt-1">Même difficulté</div>
                </div>
              </button>

              <button
                @click="emit('goChangeDifficulty')"
                class="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                <div class="p-4 text-center">
                  <div class="flex items-center justify-center gap-2 text-white font-bold text-lg">
                    <span>⚙️</span>
                    Changer
                  </div>
                  <div class="text-emerald-100 text-sm mt-1">Nouvelle difficulté</div>
                </div>
              </button>
            </div>
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