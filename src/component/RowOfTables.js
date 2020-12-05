import React from 'react';
import './RowOfTables.style.css';
import {horizontal} from "../util/Tables";

function RowOfTables({onTableClick, onTableDragStart, onTableDragOver, onTableDragEnd, data, isDraggable}) {
    return (
        <div className="row-tables">
            {
                horizontal.map(x => {
                    const value = data.find(tab => tab.x === x);
                    return <div key={x}
                                className={isDraggable ? "table-shell-green" : "table-shell-purple"}
                                onDragOver={(e) => onTableDragOver(e, x)}

                    >
                        <div draggable={isDraggable}
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