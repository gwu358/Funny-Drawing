import React from 'react';
import ChannelList from './ChannelList';

export default function Sidebar () {

  return (
    <section className="sidebar">
      <div className="sidebar-header">
        <h3 href="#">
          <div>Funny Drawing</div>
          <i alt="Brand" className="glyphicon glyphicon-comment">
          </i>
        </h3>
      </div>
      <h5>Channels</h5>
      <ChannelList />
    </section>
  );
}
