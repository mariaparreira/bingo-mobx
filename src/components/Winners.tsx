import { observer } from "mobx-react"
import bingoStore from "./BingoStore";


function Winners() {
    const winners = bingoStore.winners;

    return (
        <section data-role="winners">
            <h3>Winners</h3>
            { winners.length > 0 ? (
                <ul>
                    { winners.map((winner, index) => (
                        <li key={index}>
                            { winner }
                        </li>
                    ))}
                </ul>
            ) : (
                <p>no winners yet, game in progress</p>
            )}
        </section>
    )
}

export default observer(Winners);