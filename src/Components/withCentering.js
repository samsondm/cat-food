import React from 'react';
import './withCentering.scss';

export default function withCentring(WrappedComponent, height = "100%") {
  return class extends React.Component {
    render() {
      const { className, ...other } = this.props;
      return (
        <div className="centering-outer" style={{ height }}>
          <div className="centering-middle">
            <WrappedComponent className={"centering-inner " + (className ? className : "")} {...other} />
          </div>
        </div>
      );
    }
  }
}