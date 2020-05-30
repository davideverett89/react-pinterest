import React from 'react';
import PropTypes from 'prop-types';
import './BoardContainer.scss';

import boardsData from '../../helpers/data/boardsData';
import authData from '../../helpers/data/authData';
import smash from '../../helpers/data/smash';

import Board from '../Board/Board';
import BoardForm from '../BoardForm/BoardForm';

class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state ={
    boards: [],
    formOpen: false,
    editBoard: {},
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

  saveNewBoard = (newBoard) => {
    boardsData.saveBoard(newBoard)
      .then(() => {
        this.getInfo();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('There is a problem with saving a new board:', err));
  }

  putBoard = (boardId, updatedBoard) => {
    boardsData.updateBoard(boardId, updatedBoard)
      .then(() => {
        this.getInfo();
        this.setState({ formOpen: false, editBoard: {} });
      })
      .catch((err) => console.error('There was a problem with updating a board:', err));
  }

  editABoard = (board) => {
    this.setState({ formOpen: true, editBoard: board });
  }

  render() {
    const { boards, formOpen, editBoard } = this.state;
    const { setSingleBoard } = this.props;
    const makeBoards = boards.map((board) => (
      <Board key={board.id} board={board} setSingleBoard={setSingleBoard} removeBoard={this.removeBoard} editABoard={this.editABoard} />
    ));

    return (
          <div className="BoardContainer">
              <h2>Boards</h2>
              <button className="m-3 btn btn-success" onClick={() => this.setState({ formOpen: true })}><i className="fas fa-plus"></i></button>
              { formOpen ? <BoardForm saveNewBoard={this.saveNewBoard} board={editBoard} putBoard={this.putBoard} /> : ''}
              <div className="d-flex flex-wrap">
                {makeBoards}
              </div>
          </div>
    );
  }
}

export default BoardContainer;
