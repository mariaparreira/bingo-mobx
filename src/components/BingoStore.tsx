// import React, { createContext, useContext, useRef } from "react";
import { action, makeAutoObservable, observable } from "mobx";
import { BingoTicket } from "../types";
import { createContext, useContext, useRef } from "react";

export interface Player {
    name: string;
    ticket: BingoTicket;
};

class BingoStore {
    players: Player[] = [];
    numbersDrawn: number[] = [];
    winners: string[] = [];

    constructor() {
        makeAutoObservable(this, {
            players: observable,
            numbersDrawn: observable,
            winners: observable,
            registerPlayer: action,
            drawNumber: action,
        })
    }

    registerPlayer(player: Player) {
        if (!this.hasUniqueNumbers(player.ticket)) return;
        this.players.push(player);
    }

    hasUniqueNumbers(ticket: BingoTicket): boolean {
        const numbersSet = new Set<number>();
        for (const row of ticket) {
            for (const number of row) {
                if (numbersSet.has(number)) {
                    return false; // Ticket contains repeating numbers
                }
                numbersSet.add(number);
            }
        }
        return true; // All numbers are unique
    }

    drawNumber(number: number) {
        if (this.numbersDrawn.includes(number)) return;
        this.numbersDrawn.push(number);

        const checkWin = this.checkWinners(this.players, this.numbersDrawn);
        if (checkWin.length > 0) {
            this.winners.push(...checkWin);
        }
    }

    checkWinners(players: Player[], numbersDrawn: number[]): string[] {
        const winners: string[] = [];

        for (const player of players) {
            if (this.hasWinningLine(player.ticket, numbersDrawn)) {
                winners.push(player.name);
            }
        }

        return winners;
    }

    hasWinningLine(ticket: BingoTicket, numbersDrawn: number[]): boolean {
        // Check Horizontal
        for (const row of ticket) {
            if (row.every(num => numbersDrawn.includes(num))) return true;
        }

        // Check Vertical
        for (let i=0; i < ticket[0].length; i++) {
            let ticketUpdate = ticket.map(row => [...row]) as number[][];
            ticketUpdate[2].splice(2, 0, -1);

            const col = ticketUpdate.map(row => row[i]);
            if (col.every(num => numbersDrawn.includes(num) || num === -1)) return true;
        }

        // Check Diagonal
        const diagonal1 = [ticket[0][0], ticket[1][1], ticket[3][3], ticket[4][4]];
        const diagonal2 = [ticket[0][4], ticket[1][3], ticket[3][1], ticket[4][0]];

        if (diagonal1.every(num => numbersDrawn.includes(num)) || diagonal2.every(num => numbersDrawn.includes(num))) return true;

        return false;
    }
};

const bingoStore = new BingoStore();

export default bingoStore;

// const BingoStoreContext = createContext<BingoStore>(null as unknown as BingoStore);

// export const useBingoStore = () => useContext(BingoStoreContext);

// type BingoStoreProps = {
//     children: React.ReactNode;
//     players: Player[];
// };

// export function BingoStoreProvider({ children, players }: BingoStoreProps) {
//     const store = useRef(new BingoStore());

//     return (
//         <BingoStoreContext.Provider value={store.current}>
//             {children}
//         </BingoStoreContext.Provider>
//     )
// }