import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from './chat';

const style = {
  color: 'blue',
}

class App extends Component {
  render() {
    const { feed, sendMessage } = this.props;
    return (
      <div className='container'>

        <div className='main'>
          <h1> Alisher's bot in action</h1>

          {feed.map(entry => {
            return (
              <ul key={Math.random()}>
                <li> {entry.text} <span style={style}>{entry.sender}</span>  </li>
              </ul>
            )
          })}
          <input type='text' onKeyDown={(e) => e.keyCode === 13 ? sendMessage(e.target.value, 'Me') : null} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feed: state
});

export default connect(mapStateToProps, { sendMessage })(App);
