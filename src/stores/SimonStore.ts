import { defineStore } from "pinia";
import {useUserStore} from "@/stores/UserStore";

interface SimonInterface{
    title: string,
    score: number,
    timer: number,
    sequence: any,
    tmp: any,
    hautGauche : boolean,
    hautMilieu : boolean,
    hautDroit : boolean,
    basGauche : boolean,
    basDroit : boolean,
    basMilieu : boolean,
    msg_demo : boolean,
    help:boolean
}

const squareMapping = ["hautGauche","hautMilieu","hautDroit","basGauche","basMilieu","basDroit"]


export const useSimonStore = defineStore("simonStore",{
    state: (): SimonInterface => ({
        title: "Jeu de Simon",
        score: 0,
        timer: 500,
        sequence : [],
        tmp: [],
        hautGauche : false,
        hautMilieu : false,
        hautDroit : false,
        basGauche : false,
        basDroit : false,
        basMilieu : false,
        msg_demo: false,
        help: false
    }),
    actions: {
        newGame(){
            this.sequence = [];
            this.nextTurn();
        },
        nextTurn(){
            this.addElementToSequence();
            this.allGray();
            console.log(this.tmp)
            this.playSequence(this.tmp[0]);
        },
        addElementToSequence(){
            this.score > 5 ? this.timer = 350 : this.timer = 500;
            this.score = this.sequence.length;
            const random = Math.floor(Math.random() * squareMapping.length);
            this.sequence.push(squareMapping[random]);
            this.tmp = this.tmp.slice();
        },
        allGray(){
            squareMapping.forEach(e => {
                //@ts-ignore
                return this[e] = false;
            })
        },
        playSequence(instruction: string){
            this.msg_demo = true
            //@ts-ignore
            this[instruction] = true
            setTimeout(()=>{
                this.allGray()
                this.tmp.shift()
                if (this.tmp[0]){
                    setTimeout(()=> {this.playSequence(this.tmp[0])} , this.timer)
                }else{
                    this.tmp = this.sequence.slice()
                    this.msg_demo = false
                }
            },this.timer)
        },
        selectSquare(instruction: string){
            if(instruction === this.tmp[0]){
                //@ts-ignore
                this[instruction] = true
                setTimeout(()=>{
                    this.allGray()
                    this.tmp.shift()
                    if (!this.tmp[0]){
                        setTimeout(() => (this.nextTurn()), 200)
                    }
                }, this.timer)
            }else{
                const userStore = useUserStore()
                userStore.sendMessage("Hoops", "warning")
            }
        }
    }
})