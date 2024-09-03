import React from 'react';

import * as DeckLib from '../deck/DeckLib';

export default function CardCorner(props: {card: DeckLib.Card}) {
    const eltRef: React.LegacyRef<HTMLCanvasElement> = React.useRef(null);

    React.useEffect(
        () => {props.card.drawCorner(eltRef.current.getContext('2d'));},
        [props.card]
    );

    return <canvas ref={eltRef} width={DeckLib.CORNER_WIDTH} height={DeckLib.CORNER_HEIGHT}/>;
}