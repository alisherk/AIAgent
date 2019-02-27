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

  scrollToBottom() {

    //gets a height of the scrollable area inside chat-window div
    const scrollHeight = this.el.scrollHeight;
    //gets the height of the viewable portion of the scroll 
    const clientHeight = this.el.clientHeight;
    //get a difference between scrollHeight and cleinHeight and set it to maxScrollTop
    const maxScrollTop = scrollHeight - clientHeight;
    //assign scrollTop property to the difference between scrollHeight and clientHeight (if > 0 this scrolls down if less remains the same) 
    this.el.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  //triger the option above if there is change in components 
  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.props.sendMessage(e.target.value, 'Me');
      this.input.value = '';
    }
  }

  handleFocus = () => {
    this.setState({ inputstyle: false });
  }
  handleBlur = () => {
    this.setState({ inputstyle: true });
  }

  render() {
    const { feed } = this.props;
    const inputstyle = this.state.inputstyle ? 'custom-input' : 'custom-input-active';
    return (
      <div className='container custom-box'>
        <div className='row justify-content-center align-items-center'>
          <div className='col-xs-12 col-md-6'>
            <h4 className='text-secondary text-center'> Chat to Alisher's Agent</h4>
            <div className='chat-container' ref={el => this.el = el}>
              {feed.map(entry => {
                return (
                  <span key={Math.random()}>
                    <p className='output text-secondary'> {entry.text} - <span style={style}>{entry.sender}</span> </p>
                  </span>
                );
              })}

            </div>
            <input className={inputstyle} placeholder='Chat now' ref={input => this.input = input} onKeyDown={this.handleOnKeyDown} onFocus={this.handleFocus} onBlur={this.handleBlur} />

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
