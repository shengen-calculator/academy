import React from 'react';
import './RowOfTables.style.css';

function RowOfTables({onTableClick, onTableDragStart, onTableDragOver, onTableDragEnd, data}) {
    const height = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    return (
        <div className="row-tables">
            {
                height.map(x => {
                    const value = data.find(tab => tab.x === x);
                    return <div key={x}
                                className="table-shell"
                                onDragOver={(e) => onTableDragOver(e, x)}

                    >
                        <div draggable
                             onClick={() => onTableClick(x)}
                             onDragStart={(e) => onTableDragStart(e, x)}
                             className="table"
                             onDragEnd={onTableDragEnd}
                        >
                            {value ? value.seats : ''}
                        </div>
                    </div>
                })
            }
        </div>

    );
}

export default RowOfTables;