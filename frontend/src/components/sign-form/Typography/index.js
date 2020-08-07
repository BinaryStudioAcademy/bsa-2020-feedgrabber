/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {theme} from '../Theme';

const Base = css`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  margin-bottom: ${props => props.marginBottom || "0.35em"};
  margin-top: ${props => props.marginTop || 0};
  margin-left: ${props => props.marginLeft || 0};
  margin-right: ${props => props.marginRight || 0};
  color: ${props => theme.color[props.color] || theme.color.dark};
  font-weight: ${props => props.fontWeight || 400};
  text-align: ${props => props.align || "inherit"};
`;

const Body = styled.p`
  ${Base}
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;
`;

const H4 = styled.h4`
  ${Base}
  font-size: 2.125rem;
  line-height: 1.17;
  letter-spacing: 0.00735em;
`;

const Body2 = styled.p`
  ${Base}
  font-size: 0.875rem;
  line-height: 1.5;
  letter-spacing: 0.01071em;
`;

class Typography extends React.Component {
  static propTypes = {
    variant: PropTypes.oneOf([
      'h4',
      'body',
      'body2'
    ]),
    marginBottom: PropTypes.string,
    marginTop: PropTypes.string,
    marginLeft: PropTypes.string,
    marginRight: PropTypes.string,
    color: PropTypes.string,
    fontWeight: PropTypes.number,
    align: PropTypes.oneOf(['right', 'left', 'center', 'inherit'])
  };

  static defaultProps = {
    variant: 'body'
  };

  render() {
    const variants = {
      'h4': H4,
      'body': Body,
      'body2': Body2
    };

    return React.createElement(variants[this.props.variant], this.props);
  }
}

export default Typography;
