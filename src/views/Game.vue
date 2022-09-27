<script setup lang="ts">

import {useSimonStore} from "@/stores/simonStore";

const simonStore = useSimonStore()

</script>


<template>
  <div>
    <h1 class="font-bold text-2xl">{{simonStore.title}}</h1>
    <div>
      <div class="btnNew" @click="simonStore.newGame()">Nouvelle partie</div>
      <div class="score">Votre score : {{simonStore.score}}</div>
      <div>
        <div v-if="simonStore.msg_demo">Démonstration :</div>
        <div v-else>C'est à vous !</div>
      </div>

      <div class="flex">
        <div
            @click="simonStore.selectSquare('hautGauche')"
            class="w-14 md:w-28 lg:w-40 h14 md:h-28 lg:h-40 bg-slate-300 shadow-blue-300 shadow border-indigo-200 border-2 m-2"
            :class="{'bg-emerald-700' : simonStore.hautGauche}"
        ></div>
        <div
            @click="simonStore.selectSquare('hautMilieu')"
            class="w-14 md:w-28 lg:w-40 h-14 md:h-28 lg:h-40 bg-slate-300 shadow-blue-300 shadow border-indigo-200 border-2 m-2"
            :class="{bleu : simonStore.hautMilieu}"
        ></div>
        <div
            @click="simonStore.selectSquare('hautDroit')"
            class="w-14 md:w-28 lg:w-40 h14 md:h-28 lg:h-40 bg-slate-300 shadow-blue-300 shadow border-indigo-200 border-2 m-2"
            :class="{bleu : simonStore.hautDroit}"
        ></div>
      </div>
      <div class="flex">
        <div
            @click="simonStore.selectSquare('basGauche')"
            class="w-14 md:w-28 lg:w-40 h14 md:h-28 lg:h-40 bg-slate-300 shadow-blue-300 shadow border-indigo-200 border-2 m-2"
            :class="{bleu : simonStore.basGauche}"
        ></div>
        <div
            @click="simonStore.selectSquare('basMilieu')"
            class="w-14 md:w-28 lg:w-40 h14 md:h-28 lg:h-40 bg-slate-300 shadow-blue-300 shadow border-indigo-200 border-2 m-2"
            :class="{bleu : simonStore.basMilieu}"
        ></div>
        <div
            @click="simonStore.selectSquare('basDroit')"
            class="w-14 md:w-28 lg:w-40 h14 md:h-28 lg:h-40 bg-slate-300 shadow-blue-300 shadow border-indigo-200 border-2 m-2"
            :class="{bleu : simonStore.basDroit}"
        ></div>
      </div>
      <div
          @mouseleave="simonStore.help = false"
          class="bg-black text-white font-bold"
      >
        <div @mouseover="simonStore.help = true">Un peu d'aide ?</div>
        <TransitionGroup>
          <div v-if="simonStore.help" v-for="(seq,index) in simonStore.sequence" :key="index">
            {{index+1}} -> {{seq}}
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>
