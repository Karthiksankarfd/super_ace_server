// access payout based on the match suite
export enum AllowedWins {
   "THREE-OF-KIND",
   "FOUR-OF-KIND",
   "FIVE-OF-KIND"
};

export const  payout = {
    ACE : {
        "FIVE-OF-KIND" : {
            multiplier : 5
        },
        "FOUR-OF-KIND" : {
            multiplier : 3
        },
        "THREE-OF-KIND" : {
            multiplier : 1
        },
    },
    KING : {
        "FIVE-OF-KIND" : {
            multiplier : 4
        },
        "FOUR-OF-KIND" : {
            multiplier : 2.4
        },
        "THREE-OF-KIND" : {
            multiplier : 0.8
        },
    },
    QUEEN : {
        "FIVE-OF-KIND" : {
            multiplier : 3
        },
        "FOUR-OF-KIND" : {
            multiplier : 1.8
        },
        "THREE-OF-KIND" : {
            multiplier : 0.6
        },  
    },
    JOKER : {
        "FIVE-OF-KIND" : {
            multiplier : 2
        },
        "FOUR-OF-KIND" : {
            multiplier : 1.2
        },
        "THREE-OF-KIND" : {
            multiplier : 0.4
        },
    },
    SPADE : {
        "FIVE-OF-KIND" : {
            multiplier : 1
        },
        "FOUR-OF-KIND" : {
            multiplier : 0.6
        },
        "THREE-OF-KIND" : {
            multiplier : 0.2
        },
    },
    HEART : {
        "FIVE-OF-KIND" : {
            multiplier : 1
        },
        "FOUR-OF-KIND" : {
            multiplier : 0.6
        },
        "THREE-OF-KIND" : {
            multiplier : 0.2
        },
    },
    DIAMOND : {
        "FIVE-OF-KIND" : {
            multiplier : 0.5
        },
        "FOUR-OF-KIND" : {
            multiplier : 0.4
        },
        "THREE-OF-KIND" : {
            multiplier : 0.1
        },
    },
    CLUBS : {
        "FIVE-OF-KIND" : {
            multiplier : 0.5
        },
        "FOUR-OF-KIND" : {
            multiplier : 0.3
        },
        "THREE-OF-KIND" : {
            multiplier : 0.1
        },
    },
    
}