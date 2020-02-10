import React, {Component} from 'react';

/*Steps
1. Create the input box with an onInput prop
2. Write the initial state of the input box and set it to an empty string
3. Write an event handler that targets the DOM inputs coming from the user and include it in the render method
4. Write up a setState function that tracks the value coming in from the input box
5. Link the input value to the state of the component
6. Bind the onInput prop to the component so that the character counter takes effect
7. Display the total characters written in the box
*/

class CharacterCounter extends Component {
  constructor() {
    super()
    this.state = {
        inputValue: ''  //sets initial inputValue state to an empty string
    }
  }
  
  _handleInput(event) {
   if (event.target.value.length <= 140) {
        this.setState({
        inputValue: event.target.value
     })
    }
  }
  
  render() {
    return (
      <div>
        <hr />
        <h1>Character Counter</h1>
        <input value={this.state.inputValue} type="text" onInput={this._handleInput.bind(this)}/>
        <p>Total Chars: {this.state.inputValue.length}</p>
      </div>
    )
  }
}

export default CharacterCounter;