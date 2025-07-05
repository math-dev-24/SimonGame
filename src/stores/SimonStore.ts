import { defineStore } from "pinia";
import {useUserStore} from "@/stores/UserStore";

interface StepTime {
    step: number;
    time: number;
}

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
    endGame: boolean,
    stepTimes: StepTime[],
    currentStepStartTime: number
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
        endGame: false,
        stepTimes: [],
        currentStepStartTime: 0
    }),
    actions: {
        newGame(){
            const userStore = useUserStore()
            userStore.sendMessage("C'est partie !", "success")
            this.ready = true
            this.sequence = [];
            this.stepTimes = [];
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
                    this.currentStepStartTime = Date.now();
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
                            const stepTime = Date.now() - this.currentStepStartTime;
                            this.stepTimes.push({
                                step: this.score,
                                time: stepTime
                            });
                            
                            const userStore = useUserStore()
                            userStore.sendMessage("Félicitation ! ", "success")
                            setTimeout(() => (userStore.sendMessage("C'est reparti !", "success")), 500)
                            setTimeout(() => (this.nextTurn()), 1000)
                        }
                    }, 100)
                }else{
                    this.lostGame()
                }
            }else{
                if (!this.ready){
                    const userStore = useUserStore()
                    userStore.sendMessage("Click sur le bouton ready !", "warning")
                }
            }
        },
        helpGame(){
            console.log(this.tmp[0])
            //@ts-ignore
            this[this.tmp[0]] = true
            setTimeout(()=> {
                this.allGray()
            }, 400)
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
            if (this.score > 20){
                this.timer = this.timer * 0.7
            }
            if (this.score > 30){
                this.timer = this.timer * 0.6
            }
            if (this.score > 40){
                this.timer = this.timer * 0.5
            }
            if (this.score > 50){
                this.timer = this.timer * 0.4
            }
            if (this.score > 60){
                this.timer = this.timer * 0.3
            }
            if (this.score > 70){
                this.timer = this.timer * 0.2
            }
        },
        getStepTimesStats() {
            if (this.stepTimes.length === 0) return null;
            
            const times = this.stepTimes.map(step => step.time);
            const average = times.reduce((sum, time) => sum + time, 0) / times.length;
            const min = Math.min(...times);
            const max = Math.max(...times);
            
            return {
                totalSteps: this.stepTimes.length,
                averageTime: Math.round(average),
                minTime: min,
                maxTime: max,
                stepTimes: this.stepTimes
            };
        }
    }
})