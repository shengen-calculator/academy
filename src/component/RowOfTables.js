import React from 'react';
import './RowOfTables.css';

function RowOfTables({onTableClick, data}) {
    const height = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];

    return (
        <div className="row-tables">
            {
                height.map(x => {
                    const value = data.filter(tab => tab.x === x)[0];
                    return <div key={x} onClick={() => onTableClick(x)} className="table">
                        {value ? value.seats : ''}
                        </div>
                })
            }
        </div>

    );
}

export default RowOfTables;