import { observer } from "mobx-react";
import bingoStore from "./BingoStore"
import Ticket from "./Ticket";


function RegisteredTickets() {
    const players = bingoStore.players;

    return (
        <section data-role="registered-tickets">
            <h3>Registered tickets</h3>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>
                        <Ticket name={player.name} numbers={player.ticket} />
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default observer(RegisteredTickets);