import { defineStore } from "pinia";
import {useUserStore} from "@/stores/UserStore";

interface SimonInterface{
    life: number,
    score: number,
    ready: boolean,
    timer: number,
    sequence: any,
    tmp: any,
    hautGauche : boolean,
    hautMilieu : boolean,
    hautDroit : boolean,
    basGauche : boolean,
    basDroit : boolean,
    basMilieu : boolean,
    canHelp: boolean,
    playingSequence: boolean,
    endGame: boolean
}

const squareMapping = ["hautGauche","hautMilieu","hautDroit","basGauche","basMilieu","basDroit"]


export const useSimonStore = defineStore("simonStore",{
    state: (): SimonInterface => ({
        life: 9,
        score: 0,
        ready: false,
        timer: 500,
        sequence : [],
        tmp: [],
        hautGauche : false,
        hautMilieu : false,
        hautDroit : false,
        basGauche : false,
        basDroit : false,
        basMilieu : false,
        canHelp: false,
        playingSequence: false,
        endGame: false
    }),
    actions: {
        newGame(){
            const userStore = useUserStore()
            userStore.sendMessage("C'est partie !", "success")
            this.ready = true
            this.sequence = [];
            this.nextTurn();
        },
        nextTurn(){
            this.addElementToSequence();
            this.allGray();
            this.playSequence(this.tmp[0]);
        },
        addElementToSequence(){
            this.goUpdateSpeed()
            this.score = this.sequence.length;
            const random = Math.floor(Math.random() * squareMapping.length);
            this.sequence.push(squareMapping[random]);
            this.tmp = this.sequence.slice();
        },
        allGray(){
            squareMapping.forEach(e => {
                //@ts-ignore
                this[e] = false;
            })
        },
        playSequence(instruction: string){
            this.playingSequence = true
            //@ts-ignore
            this[instruction] = true
            setTimeout(()=>
            {
                this.allGray()
                this.tmp.shift()
                if (this.tmp[0]){
                    setTimeout(()=> {this.playSequence(this.tmp[0])} , this.timer)
                }else{
                    this.tmp = this.sequence.slice()
                    this.playingSequence = false
                }
            },this.timer)
        },
        selectSquare(instruction: string){
            if (this.ready && !this.playingSequence){
                if(instruction === this.tmp[0]){
                    //@ts-ignore
                    this[instruction] = true
                    setTimeout(()=>{
                        this.allGray()
                        this.tmp.shift()
                        if (!this.tmp[0]){
                            setTimeout(() => (this.nextTurn()), 1000)
                        }
                    }, 100)
                }else{

                    this.lostGame()
                }
            }else{
                if (!this.ready){
                    const userStore = useUserStore()
                    userStore.sendMessage("Click on ready button", "warning")
                }
            }
        },
        lostGame(){
            const userStore = useUserStore()
            if (this.life === 0){
                this.endGame = true
            }else{
                this.life -= 1
                userStore.sendMessage(`Hoops ! il vous reste ${this.life} vie(s)`, "warning")
            }
        },
        goUpdateSpeed(){
            if (this.score > 5){
                this.timer = this.timer * 0.95
            }
            if (this.score > 10){
                this.timer = this.timer * 0.8
            }
        }
    }
})