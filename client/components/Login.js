import React from 'react';
import { connect } from 'react-redux';
import { updateName, updateNameThunk, editName } from '../store';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempName: this.props.name,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      tempName: evt.target.value,
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="bg-modal">
        <div className="modal-contents">
          <form onSubmit={(evt) => handleSubmit(evt, this.state.tempName)}>
            <input type="text"
              id="edit-name"
              value={this.state.tempName}
              onChange={this.handleChange}
              placeholder="Name" />
            <button className="button" type="submit">confirm</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    name: state.name
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleChange(evt) {
      dispatch(updateName(evt.target.value));
    },
    handleSubmit(evt, name) {
      evt.preventDefault();
      dispatch(updateNameThunk(name));
      dispatch(editName(false));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
