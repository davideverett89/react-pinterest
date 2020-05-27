import React from 'react';
import PropTypes from 'prop-types';
import './PinForm.scss';
import authData from '../../helpers/data/authData';

class PinForm extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    saveNewPin: PropTypes.func.isRequired,
  }

  state = {
    pinTitle: '',
    pinImageUrl: '',
  }

  titleChange = (e) => {
    e.preventDefault();
    this.setState({ pinTitle: e.target.value });
  }

  imageUrlChange = (e) => {
    e.preventDefault();
    this.setState({ pinImageUrl: e.target.value });
  }

  savePin = (e) => {
    e.preventDefault();
    const { pinImageUrl, pinTitle } = this.state;
    const { boardId, saveNewPin } = this.props;
    const newPin = {
      boardId,
      imageUrl: pinImageUrl,
      title: pinTitle,
      uid: authData.getUid(),
    };
    saveNewPin(newPin);
  }

  render() {
    const { pinTitle, pinImageUrl } = this.state;
    return (
        <div className="PinForm">
            <form className="col-6 offset-3">
                <div className="form-group">
                    <label htmlFor="pin-title">Title</label>
                    <input
                    type="text"
                    className="form-control"
                    id="pin-title"
                    aria-describedby="emailHelp"
                    placeholder="Pin Title"
                    value={pinTitle}
                    onChange={this.titleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pin-imageUrl">Image Url</label>
                    <input
                    type="text"
                    className="form-control"
                    id="pin-imageUrl"
                    placeholder="Enter image url address"
                    value={pinImageUrl}
                    onChange={this.imageUrlChange}
                    />
                </div>
                <button className="m-3 btn btn-dark" onClick={this.savePin}>Save Pin</button>
            </form>
        </div>
    );
  }
}

export default PinForm;
