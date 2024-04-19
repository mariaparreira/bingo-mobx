import { observer } from "mobx-react";
import bingoStore from "./BingoStore";
import { random } from "../utils";
import { BingoNumber } from "../types";


function DrawnNumbers() {
    const handleDrawNumber = () => {
        const newNumber = random(1, 75) as BingoNumber;

        bingoStore.drawNumber(newNumber);
    }
    
    return (
        <section data-role="drawn-numbers">
            <h3>Drawn numbers</h3>
            <ul className="drawn">
                {bingoStore.numbersDrawn.map((n, index) => (
                    <li key={index} className="drawnNumber">
                        {n}
                    </li>
                ))}
            </ul>
            <button onClick={handleDrawNumber}>Draw number</button>
        </section>
    )
}

export default observer(DrawnNumbers);