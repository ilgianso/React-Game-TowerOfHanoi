import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Hanoi extends React.Component {
  state = {
    col1: [4, 3, 2, 1],
    col2: [],
    col3: [],
    currentCol: undefined,
    finish: undefined
  };

  move(toCol, fromCol) {
    const copyCurrentArray = [...this.state[this.state.currentCol]];
    const elementToMove = copyCurrentArray.pop();
    this.setState(
      {
        [toCol]: [...this.state[toCol], elementToMove],
        [this.state.currentCol]: copyCurrentArray,
        currentCol: undefined
      },
      this.checkIfWin
    );
  }

  checkIfWin() {
    if (this.state.col1.length === 0 && this.state.col2.length === 0) {
      this.setState({
        finish: "Win"
      });
    }
  }

  unselect() {
    this.setState({
      currentCol: undefined
    });
  }

  rowClicked(colName) {
    if (this.state[colName].length === 0 && !this.state.currentCol) {
      return;
    } else if (!this.state.currentCol) {
      this.setState({
        currentCol: colName
      });
    } else if (this.state.currentCol == colName) {
      //deselezioni
      this.unselect();
    } else {
      const originCol = this.state[this.state.currentCol];
      const originColEl = originCol[originCol.length - 1];
      const destinationCol = this.state[colName];
      const destinationColEl = destinationCol[destinationCol.length - 1];

      if (originColEl > destinationColEl) {
        // deselezioni
        this.unselect();
      } else {
        this.move(colName, this.state.currentCol);
      }
    }
  }

  render() {
    return (
      <div className="App">
        {["col1", "col2", "col3"].map(col => (
          <Column
            key={col}
            selected={this.state.currentCol === col}
            col={this.state[col]}
            onClik={() => this.rowClicked(col)}
          />
        ))}
        {this.state.finish && <h2>You Win</h2>}
      </div>
    );
  }
}

const Layer = ({ size }) => (
  <div className="tile" style={{ width: size * 20 + "px" }} />
);

const Column = ({ selected, col, onClik }) => (
  <div className={`Tower ${selected ? "selected" : ""}`} onClick={onClik}>
    {col.map(el => (
      <Layer size={el} key={el} />
    ))}
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<Hanoi />, rootElement);
