import React, {Component} from 'react';

/*Steps
Logic: we need to compare the value of the DOM inputs to the limit set in the component in App.js and output that value on the screen
1.Set the initial state to an empty string
2. Create an event handler that refers to the length of the user input value and compare it to the props limit set in App.js, if it meets these conditions, we will setState the input value to the DOM input value
3. link the event handler using either refs or bind, both work.
4. in the render function, display the remaining characters by subtracting the current value from the limit value set in the props
*/

class CharacterLimit extends Component {
  constructor() {
    super()
    this.state = {
        inputValue: ''  //sets initial inputValue state to an empty string
    }
  }
  
  _handleInput = () => {
      
   if (this.refs.userInput.value.length <= this.props.limit) {  //compares the total length of each input to the character limit set in the main.js file
        this.setState({
        inputValue: this.refs.userInput.value
     });
    }
  }
  
  render() {
    return (
      <div>
        <hr />
        <h1>Characters Left</h1>
        <input
        ref="userInput"                     //create a ref so that we can refer to this in the event handler function above
        value={this.state.currentInput}     //so that it displays the user input in the box
        type="text" 
        onInput={this._handleInput} />      
        <p>
        Characters left: {this.props.limit - this.state.inputValue.length}
        </p>   
        <hr />
      </div>
    )
  }
}

export default CharacterLimit;