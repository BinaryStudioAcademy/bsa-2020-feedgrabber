/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {theme} from '../Theme';

const StyledInput = styled.input`
  background-color: ${theme.color.grey};
  border: 1px solid ${theme.color.grey};
  border-radius: 4px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  outline: none;
  font-size: '1rem';
  transition: ${theme.transition.base({el: 'border'})};

  &:focus {
    border: 1px solid ${theme.color.primary};
    transition: ${theme.transition.base({el: 'border'})};
  }
`;

class Input extends React.Component {

  static defaultProps = {
    value: ''
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
    required: PropTypes.bool,
    pattern: PropTypes.string,
    placeholder: PropTypes.string
  };

  static defaultProps = {
    type: 'text',
    required: false
  };

  state = {
    value: this.props.value
  };

  handleChange = event => {
    this.setState({value: event.target.value});
  };

  render() {
    return (
      <StyledInput
        id={this.props.id}
        type={this.props.type}
        name={this.props.name}
        defaultValue={this.state.value}
        onChange={this.handleChange}
        required={this.props.required}
        pattern={this.props.pattern}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default Input;
