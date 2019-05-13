import React from 'react';
import { connect } from 'react-redux';
import NameEntry from './NameEntry';
import Game from './Game';
function Navbar (props) {

  const { currentChannel } = props;

  return (
    <nav>
      <h3># [{ currentChannel }] &nbsp; <Game /> </h3>
      <NameEntry />
    </nav>
  );
}

const mapStateToProps = function (state) {
  return {
    currentChannel: state.game.name
  };
};

export default connect(mapStateToProps)(Navbar);
