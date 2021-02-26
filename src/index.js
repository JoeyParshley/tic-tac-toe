import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Square = (props) => {
  return(
    /*
          when square is clicked the onClick function provided by the Board through
          the props is called.
          - onClick prop on the built in DOM <button> componeent tells react to setup a click
            event listener
          - when button is clicked, React will call onClick even handler defined in Square's
            render() method
          - this event handler call this.props.onClick(). Tjhe Square's onClick prop was
            specified by the Board
          - since the Board passed onClick={() => this.handleClick(i)} to Square, the Square
            calls this.handleClick(i) when clicked

          Square components no longer maintain state, they receive values from the Board
          component and inform the Board component when they are clicked.
          The Sqare Components are now "Controlled Compoonents" The board has full control
          over them
     */

    /*
        Modifying the Square to be a function component because it does not have its own state
        and now contains ony a render entails changing 'this.props' to 'props' and changing
        'onClick={() => this.props.onClick()}' to the shorter 'onClick={props.onClick} NOTE THE
        LACK OF PARENTHESES ON BOTH SIDES
     */
    <button className={'square'} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  /*
    Add constructor to board to se the boards initial state to contain an array
    of 9 nulls corrsponding to each square
   */
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,                          // X is the first move by default
    }
  }

  /*
    Add nadleClick function
   */
  handleClick(i) {
    /*
       calling slicer() to create a copy of the squares array to modify instead of
       modifying the existing array. Instead we can replace the array with a new copy`
     */
    const squares = this.state.squares.slice()
    // if there is a winner return early
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // each timne a player makes a move xIsNext will be flipped to determine whos turn it is
    squares[i] = this.state.xIsNext ?  'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    })
  }

  renderSquare(i) {
    /*
      Pass down two props from Board to Square: 'value' and 'onClick'
        - onCLick prop is a function that Square can call when clicked
     */
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )
  }

  render() {
    const winner = calculateWinner(this.state.squares)
    let status;
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

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

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}