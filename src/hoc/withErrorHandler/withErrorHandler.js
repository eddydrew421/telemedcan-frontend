import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

/*
This component will return a modal with an error message when an error occurs
It will take a wrapped component and return a unknown property value(hence the spread operator),
and only show conditionally (based on the axios instance of success of failure).
This component will be wrapped around the BurgerBuilder component since that's where we manage the state of the app.
*/

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

      state = {
        error: null
      }

      /* Gets called before the child components are rendered, and not causing side effects */
      componentWillMount() {
        this.reqInterceptor = axios.interceptors.request.use(req => {
          this.setState({error: null});
          return req;
        });
        this.resInterceptor = axios.interceptors.response.use(res => res, error => {
          this.setState({error: error});
        });
      }

      //This removes the interceptors, it executes when a component is no longer required
      componentWillUnmount() {
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);

      }

      errorConfirmedHandler = () => {
        this.setState({error: null})
      }

      render () {
        return (
          <Aux>
            <Modal
              show={this.state.error}
              modalClosed={this.errorConfirmedHandler}>
                {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrappedComponent {...this.props} />
          </Aux>
      );
    }
  }
}

export default withErrorHandler;
