<script setup lang="ts">
import {useUserStore} from "@/stores/UserStore";

const userStore = useUserStore()

// Types de messages pour différents styles
const getMessageStyle = (text: string) => {
  if (text.toLowerCase().includes('gagné') || text.toLowerCase().includes('victoire') || text.toLowerCase().includes('félicitations')) {
    return {
      bg: 'bg-gradient-to-r from-emerald-500 to-green-600',
      border: 'border-emerald-400',
      icon: '🎉',
      shadow: 'shadow-emerald-500/25'
    }
  }
  if (text.toLowerCase().includes('perdu') || text.toLowerCase().includes('échec') || text.toLowerCase().includes('dommage')) {
    return {
      bg: 'bg-gradient-to-r from-red-500 to-pink-600',
      border: 'border-red-400',
      icon: '💔',
      shadow: 'shadow-red-500/25'
    }
  }
  if (text.toLowerCase().includes('niveau') || text.toLowerCase().includes('score')) {
    return {
      bg: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      border: 'border-blue-400',
      icon: '⭐',
      shadow: 'shadow-blue-500/25'
    }
  }
  // Style par défaut
  return {
    bg: 'bg-gradient-to-r from-slate-600 to-slate-700',
    border: 'border-slate-500',
    icon: 'ℹ️',
    shadow: 'shadow-slate-500/25'
  }
}
</script>

<template>
  <Teleport to="body">
    <TransitionGroup 
      tag="div" 
      name="notification" 
      class="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm w-full md:w-96"
    >
      <div 
        v-for="(msg, index) in userStore.list_pop" 
        :key="index" 
        :class="[
          'relative group overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-300 transform hover:scale-105',
          getMessageStyle(msg.text).bg,
          getMessageStyle(msg.text).border,
          getMessageStyle(msg.text).shadow
        ]"
      >
        <!-- Background pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 right-0 w-20 h-20 transform rotate-12 translate-x-8 -translate-y-8 bg-white/20 rounded-full"></div>
          <div class="absolute bottom-0 left-0 w-16 h-16 transform -rotate-12 -translate-x-6 translate-y-6 bg-white/20 rounded-full"></div>
        </div>

        <!-- Content -->
        <div class="relative p-4">
          <div class="flex items-start gap-3">
            <!-- Icon -->
            <div class="text-2xl flex-shrink-0">
              {{ getMessageStyle(msg.text).icon }}
            </div>
            
            <!-- Message -->
            <div class="flex-1">
              <p class="text-white font-semibold text-sm leading-relaxed">
                {{ msg.text }}
              </p>
            </div>
          </div>

          <!-- Progress bar -->
          <div class="absolute bottom-0 left-0 h-1 bg-white/20 w-full">
            <div class="h-full bg-white/40 rounded-r-full animate-progress"></div>
          </div>
        </div>

        <!-- Glow effect -->
        <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10"></div>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped>
/* Animations pour les notifications */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.notification-move {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animation de la barre de progression */
@keyframes progress {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}

.animate-progress {
  animation: progress 3s linear forwards;
}

/* Animation d'entrée pour les nouveaux éléments */
.notification-enter-active {
  animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(100%) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

/* Animation de sortie */
.notification-leave-active {
  animation: slideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideOut {
  0% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(100%) scale(0.8);
  }
}
</style>