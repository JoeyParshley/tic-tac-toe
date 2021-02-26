import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Square extends React.Component {
  // constructor to initialize the state
  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
  }

  render() {
    return(
      /*
            fill square with an "X" when clicked by passing a function that sets the
            value property of this.state
            This tells React to re-render the Square whenever the button is clicked
       */
      <button
          className={'square'}
          onClick={() => this.setState({value: 'X'})}>
        {this.state.value}
      </button>
    )
  }
}

class Board extends React.Component {
  renderSquare(i) {
    // passes a prop called value to the square
    return <Square value={i}/>;
  }

  render() {
    const status = 'Next Player: X'

    return (
        <div>
          <div className={'status'}>{status}</div>
          <div className={'board-row'}>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className={'board-row'}>
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className={'board-row'}>
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
    )
  }
}

class Game extends React.Component {
  render() {
    return (
        <div className={'game'}>
          <div className={'game-board'}>
            <Board />
          </div>
          <div className={'game-info'}>
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
    )
  }
}

// ========================================
ReactDOM.render(
    <Game />,
    document.getElementById('root')
)