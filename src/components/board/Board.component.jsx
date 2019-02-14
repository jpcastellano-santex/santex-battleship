// Package dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Local dependencies
import Cell from '../cell/Cell.component';

// Styles
import './Board.sass';

const Board = (props) => {
  const { matrix, onClick, myBoard, disabled } = props;
  return (
    <div className="board">
      <div className="board_elements">
        {matrix.map((row, rowIndex) => (
          row.map((column, columnIndex) => (
            <div className="board_element" key={`element_${rowIndex}_${columnIndex}`}>
              <Cell
                position={{ x: rowIndex, y: columnIndex }}
                status={matrix[rowIndex][columnIndex]}
                onClick={onClick}
                disabled={disabled}
                myBoard={myBoard}
              />
            </div>
          ))
        ))
        }
      </div>
    </div>
  );
};

Board.propTypes = {
  matrix: PropTypes.instanceOf(Array),
  onClick: PropTypes.func.isRequired,
  myBoard: false
};

Board.defaultProps = {
  matrix: [],
};

export default Board;
