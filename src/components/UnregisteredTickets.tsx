import React from "react";
import { generateRandomTicket, randomName } from "../utils";
import bingoStore from "./BingoStore";
import { observer } from "mobx-react";


function UnregisteredTickets() {
    return (
        <section data-role="unregistered-tickets">
            <h3>Unregistered tickets</h3>
            <ul>
                {[...Array(10)].map((_, i) => (
                    <li key={i}>
                        <RegisterableTicket />
                    </li>
                ))}
            </ul>
        </section>
    );
}

function RegisterableTicket() {
    const isNumDrawn = (num: number) => bingoStore.numbersDrawn.includes(num);
    const numbers = generateRandomTicket();
    const name = randomName();

    const handleRegisterTicket = () => {
        bingoStore.registerPlayer({ name, ticket: numbers });
    }

    return (
        <>
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
            <button onClick={handleRegisterTicket}>Register ticket</button>
        </>
    );
}

export default observer(UnregisteredTickets);