import React from "react";
import { BingoTicket } from "../types"
import bingoStore from "./BingoStore";
import BingoStore from "./BingoStore";
import { observer } from "mobx-react";


function Ticket({ numbers, name }: TicketProps) {
    const isNumDrawn = (num: number) => bingoStore.numbersDrawn.includes(num);

    return (
        <div data-role="ticket">
            <h4>{name}</h4>
            <div className="ticketNumbers">
                {numbers.map((col, i) => {
                    return col.map((num, j) => {
                        const isDrawn = isNumDrawn(num);
                        return (
                            <React.Fragment key={`${i} + ${j}`}>
                                <div className={`num ${isDrawn ? "marked" : ""}`}>{num}</div>
                                {i === 2 && j === 1 ? <div>*</div> : null}
                            </React.Fragment>
                        );
                    });
                })}
            </div>
        </div>
    )
}

export default observer(Ticket);

interface TicketProps {
    numbers: BingoTicket;
    name: string;
}