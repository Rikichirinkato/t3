import { ECellValue, IParams } from '../models';
import './cell.css';

function Cell(params: IParams) {
    return <div className='Cell'>
               {
                   params.value === ECellValue.Empty
                    ? <div className='InnerCell' onClick={() => params.click(params.index)}></div>
                    : params.value
               }
           </div>
}

export default Cell;
