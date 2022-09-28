import { defineStore } from "pinia";


export type StylePop = "danger" | "success" | "warning"

export type DifficultyMode = "Novice" | "Normal" | "Expert" |"Extreme"

interface PopPupInterface{
    text: string,
    style: StylePop
}

interface userStore{
    list_pop: PopPupInterface[],
    difficulty: DifficultyMode
}


export const useUserStore = defineStore("userStore", {
    state: (): userStore => ({
        list_pop: [],
        difficulty: "Normal"
    }),
    actions: {
        sendMessage(msg: string, style : StylePop){
            const newPop: PopPupInterface = {text: msg, style: style}
            this.list_pop.push(newPop)
            setTimeout(()=>{
                this.list_pop.splice(0,1)
            }, 3000)
        }
    }
})