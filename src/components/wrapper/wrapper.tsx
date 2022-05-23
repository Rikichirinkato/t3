import { useState } from 'react';
import Cell from '../cell/cell';
import { ECellValue, IParams } from '../models';
import './wrapper.css'

function Wrapper(): JSX.Element {
    const initCells = [
        {value: ECellValue.Empty},
        {value: ECellValue.Empty},
        {value: ECellValue.Empty},
        {value: ECellValue.Empty},
        {value: ECellValue.Empty},
        {value: ECellValue.Empty},
        {value: ECellValue.Empty},
        {value: ECellValue.Empty},
        {value: ECellValue.Empty},
    ];
    const [player, setPlayer] = useState(ECellValue.X);
    const [cells, setCells] = useState(initCells);
    const [winner, setWinner] = useState<ECellValue | null>(null);
    const [isStalemate, setIsStalemate] = useState(false);

    const onItemClick = (index: number) => {
        if (winner) return;
        cells[index].value = player;
        setCells(cells);
        updatePlayer(player);
        winnerCalculator(cells);
        setIsStalemate(!winner && cells.every(item => item.value !== ECellValue.Empty));
    }

    const updatePlayer = (current: ECellValue): void => {
        switch(current) {
            case ECellValue.O :
                setPlayer(ECellValue.X);
                break;
            case ECellValue.X :
                setPlayer(ECellValue.O);
                break;
        }
    }

    const onRestart = (): void => {
        setCells(initCells);
        setPlayer(ECellValue.X);
        setWinner(null);
    }

    const winnerCalculator = (cl: Partial<IParams>[]): void => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        lines.forEach(line => {
            const [a, b, c] = line;
            if (cl[a].value && cl[b].value && cl[c].value && cl[a].value === cl[b].value && cl[a].value === cl[c].value && cl[a].value !== ECellValue.Empty) {
                setWinner(player);
            }
        });
    }

    return <div className='Wrapper'>
                <div className='InfoBar'>
                    {
                        isStalemate
                        ? 'Stalemate'
                        : winner
                            ? `winner is ${winner}`
                            : `Current player is: ${player}`
                    }
                </div>
                <div className='CellsWrapper'>
                    {
                        cells.map((cell, index) => <Cell index={index} key={index} click={onItemClick} value={cell.value}/>)
                    }
                </div>
                <button className='RestartBtn' onClick={onRestart}>Restart</button>
           </div>
}

export default Wrapper;
