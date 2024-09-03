import * as fs from 'path';

export enum Suit {
    SPADES = 'S',
    CLUBS = 'C',
    HEARTS = 'H',
    DIAMONDS = 'D'
}

export const CARD_IMG_WIDTH: number = 265;
export const CARD_IMG_HEIGHT: number = 371;

export const CORNER_WIDTH: number = 43;
export const CORNER_HEIGHT: number = 88;

const KING_VAL: number = 13;
const QUEEN_VAL: number = 12;
const JACK_VAL: number = 11;
const ACE_VAL: number = 1;

/**
 * 
 * @param faceVal must be an integer in the range [1-13].
 * @returns string version
 */
function faceValToString(faceVal: number): string {
    switch(faceVal) {
        case KING_VAL:
            return 'K';
        case QUEEN_VAL:
            return 'Q';
        case JACK_VAL:
            return 'J';
        case ACE_VAL:
            return 'A';
        default:
            return faceVal.toString();
    }
}

export async function createDeck(srcFolder: string): Promise<Deck> {
    let cards: Card[] = new Array();
    let loadPromises: Promise<void>[] = new Array();

    for(let suitVal in Suit) {
        for (let i: number = 1; i <= 13; ++i) {
            let card = new Card(Suit[suitVal], i, srcFolder);
            cards.push(card);
            loadPromises.push(card.loadAsset());
        }
    }

    let deck = new Deck(cards);

    await Promise.all(loadPromises);

    return deck;
}

export class Card {

    suit: Suit;
    faceValue: number;
    srcFolder: string;
    image: HTMLImageElement;
    key: string;

    constructor(suit: Suit, faceValue: number, srcFolder: string) {
        
        if (!Number.isInteger(faceValue) || faceValue < 1 || faceValue > 13) {
            throw(new Error(`Face value must be an integer between 1 and 13. Value: ${faceValue}`));
        }

        let faceValueStr: string = faceValToString(faceValue);

        this.suit = suit;
        this.faceValue = faceValue;
        this.srcFolder = srcFolder;
        this.image = new Image();
        this.image.width = CARD_IMG_WIDTH;
        this.image.height = CARD_IMG_HEIGHT;
        this.key = `${suit}_${faceValueStr}`;


    }

    async loadAsset() {
        let self = this;

        let p = new Promise<void>(
            (resolve, reject) => {
                self.image.onload = () => {
                    resolve();
                }

                self.image.onerror = (ev: Event) => {
                    reject(ev);
                }

                self.image.src = fs.join(self.srcFolder, `${self.key}.png`);
            }
        );

        await p;
    }


    drawCorner(c: CanvasRenderingContext2D): void {
        c.drawImage(
            this.image,
            0, 0, CORNER_WIDTH, CORNER_HEIGHT,
            0, 0, c.canvas.width, c.canvas.height
        );
    }

    drawFull(c: CanvasRenderingContext2D): void {
        c.drawImage(
            this.image,
            0, 0,
            CARD_IMG_WIDTH, CARD_IMG_HEIGHT,
            0, 0, c.canvas.width, c.canvas.height
        );
    }
}

export class Deck {
    _cards: Card[] = Array();

    constructor(cards: Card[]) {
        this._cards = cards;
    }
}
