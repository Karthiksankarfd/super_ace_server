import chalk from "chalk";

export type WinType = "THREE-OF-KIND" | "FOUR-OF-KIND" | "FIVE-OF-KIND";

export type SymbolType =
  | "ACE"
  | "KING"
  | "QUEEN"
  | "JOKER"
  | "SPADE"
  | "HEART"
  | "DIAMOND"
  | "CLUBS";

export default class PayoutService {

  private paytable: Record<
    SymbolType,
    Record<WinType, { multiplier: number }>
  >;

  constructor(
    paytable: Record<
      SymbolType,
      Record<WinType, { multiplier: number }>
    >
  ) {
    this.paytable = paytable;
  }

  payout(winDetails: {
    win: WinType,
    char: SymbolType,
    ways: number,
    bet: number,
    comboMultiplierLevel: number
  }) {

    const { win, char, ways, comboMultiplierLevel, bet } = winDetails;
    const multiplier = this.paytable[char][win].multiplier;
    let amountwon =  ways * ( multiplier * comboMultiplierLevel * bet);
    return amountwon ;
  }
}