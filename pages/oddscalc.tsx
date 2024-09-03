import React from 'react';

import * as DeckLib from '../src/deck/DeckLib';
import CardCorner from '../src/component/CardCorner';



export default function OddsCalcPage() {

    const [deck, setDeck]: [DeckLib.Deck, React.Dispatch<React.SetStateAction<DeckLib.Deck>>] = React.useState(null);

    React.useEffect(
        () => {
            const initDeck = async () => {
                if (deck === null) {
                    let newDeck: DeckLib.Deck = await DeckLib.createDeck('/cards');
                    console.log(`newDeck: ${newDeck._cards.length}`);
                    setDeck(newDeck);
                }
            };

            initDeck();
        },
        [deck]
    );

    return (
        <div style={{backgroundColor: '#00ff00'}}>
            {
                deck?._cards.map(
                    (card) => {
                        return (<CardCorner key={card.key} card={card}/>);
                    }
                )
            }
        </div>
    );
}