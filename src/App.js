import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from './chat';


const style = {
  color: 'blue',
}


class App extends Component {

  state = {
    inputstyle: true,
  }

  handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.props.sendMessage(e.target.value, 'Me'); 
      this.input.value = ''; 
      this.input.placeholder = '';
    }

  }

  handleMouseEnter = () => {
    this.setState({ inputstyle: false });
  }

  handleMouseLeave = () => {
    this.setState({ inputstyle: true});
  }


  render() {
    const { feed } = this.props;
    const inputstyle = this.state.inputstyle ? 'custom-input' : 'custom-input-active';
    return (
      <div className='container'>
        <div className='row justify-content-center align-items-center'>
          <div className='col-md-6'>
            <div className='chat-container'>
              <div className='chat-window'>
                <h3 className='text-secondary text-center'> Talk to Alisher's Assistant</h3>
                <input className={inputstyle} placeholder='Chat with Brianna' ref={input => this.input = input} onKeyDown={this.handleOnKeyDown} onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}/> 
                {feed.map(entry => {
                  return (
                    <div className='output'> 
                    <span key={Math.random()}>
                      <p className='text-secondary'> {entry.text} - <span style={style}>{entry.sender}</span> </p>
                    </span>
                    </div> 
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  feed: state
});

export default connect(mapStateToProps, { sendMessage })(App);
