import React from 'react';
import PropTypes from 'prop-types';

import './SingleBoard.scss';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';

import Pin from '../Pin/Pin';

class SingleBoard extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    board: {},
    pins: [],
  }

  componentDidMount() {
    const { boardId } = this.props;
    boardsData.getSingleBoard(boardId)
      .then((response) => {
        const board = response.data;
        this.setState({ board });
        pinsData.getPinsByBoardId(boardId)
          .then((pins) => this.setState({ pins }));
      })
      .catch((err) => console.error('There was a problems getting a single board:', err));
  }

  render() {
    const { setSingleBoard } = this.props;
    const { board, pins } = this.state;

    const makePins = pins.map((p) => <Pin key={p.id} pin={p} />);

    return (
        <div className="SingleBoard">
            <button className="btn btn-warning" onClick={() => { setSingleBoard(''); }}>X</button>
            <h2>{board.name} Board</h2>
            <h3>{board.description}</h3>
            <div className="d-flex flex-wrap">
                {makePins}
            </div>
        </div>
    );
  }
}

export default SingleBoard;
