export default class EvaluationResult{
    constructor(
        public reelWindowBeforeEvaluation:[] = [] , 
        public reelWindowAfterEvaluation:[] = [],
        public comboMultiplierLevel : number = 1 ,
        public payOut : number = 0,
        public replacementCards : [] = [],
        public wins : [] = [],
        public winningCards : [] = [],
        public scatterFormed : boolean = false,
    ){}

    addPayout (amount : number){
        this.payOut = amount
    }

    setreelWindowBeforeEvaluation(reelWindow:[]){
        this.reelWindowBeforeEvaluation = reelWindow
    }
}