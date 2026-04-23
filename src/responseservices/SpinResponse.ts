export default class SpinResponse{
    constructor(
        public rootReelWindow : [] = [],
        public betAmount: number = 0,
        public spinId : string = `superace${Date.now()}`,
        public scatterFreeSpinCount: number = 0 , 
        public totalWin: number = 0,
        public evaluationResults:[] = [],
        public scatterSpinCylceResults:[] = [],
    ){
        this.spinId = `superace${Date.now()}`
    }

    setData(){
        
    }
}