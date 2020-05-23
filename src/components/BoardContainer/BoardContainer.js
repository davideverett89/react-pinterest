import React from 'react';
import PropTypes from 'prop-types';
import './BoardContainer.scss';

import boardsData from '../../helpers/data/boardsData';
import authData from '../../helpers/data/authData';
import smash from '../../helpers/data/smash';

import Board from '../Board/Board';

class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state ={
    boards: [],
  }

  getInfo = () => {
    boardsData.getBoardsByUid(authData.getUid())
      .then((boards) => this.setState({ boards }))
      .catch((err) => console.error('Unable to get all boards:', err));
  }

  componentDidMount() {
    this.getInfo();
  }

  removeBoard = (boardId) => {
    smash.completelyRemoveBoard(boardId)
      .then(() => this.getInfo())
      .catch((err) => console.error('There was a problem with deleting a board:', err));
  }

  render() {
    const { boards } = this.state;
    const { setSingleBoard } = this.props;
    const makeBoards = boards.map((board) => (
      <Board key={board.id} board={board} setSingleBoard={setSingleBoard} removeBoard={this.removeBoard} />
    ));

    return (
          <div className="BoardContainer">
              <h2>Boards</h2>
              <div className="d-flex flex-wrap">
                {makeBoards}
              </div>
          </div>
    );
  }
}

export default BoardContainer;
