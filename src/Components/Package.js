import React from 'react';
import './Package.scss';
import Border from './Border';

class Package extends React.Component {
  state = {
    isSelected: false,
    isHovered: false,
  }

  handleMouseEnter = (e) => {
    if (this.props.isDisabled) return;
    e.preventDefault();
    this.setState({
      isHovered: true
    })
  }

  handleMouseLeave = (e) => {
    if (this.props.isDisabled || !this.state.isHovered) return;
    e.preventDefault();
    this.setState({
      isHovered: false
    })
  }

  handleClick = (e) => {
    if (this.props.isDisabled) return;
    e.preventDefault();
    if (!this.state.isSelected) {
      this.setState({
        isHovered: false,
        isSelected: true
      });
    } else {
      this.setState({
        isSelected: false
      });
    }
  }

  render() {
    const {
      taste: { description, name: taste, portionCount, miceCount, weight, isCustomerHappy },
      isDisabled,
      title,
      warningTitle,
      name,
      outOfStockCaption,
      saleCaption
    } = this.props;

    // determine new ending of the words
    let portionEnding = portionCount === 1 ?
      'ия' :
      portionCount > 1 && portionCount < 5 ?
        'ии' :
        'ий';
    let miceEnding = miceCount === 1 ?
      'ь' :
      miceCount > 1 && miceCount < 5 ?
        'и' :
        'ей';
    // className calculation depending on the state       
    let backClassName, ovalClassName, borderClass;
    let titleClassName = "package__title";
    if (isDisabled) {
      backClassName = "package__back package__back_disabled";
      ovalClassName = "package__oval package__oval_disabled";
      titleClassName = "package__title package__disabled";
      borderClass = "package__border__stroke package__border__stroke_disabled";
    } else if (this.state.isSelected && this.state.isHovered) {
      backClassName = "package__back package__back_selected-hover";
      ovalClassName = "package__oval package__oval_selected-hover";
      titleClassName = "package__title package__title_selected-hover";
      borderClass = "package__border__stroke package__border__stroke_selected-hover";
    } else if (this.state.isSelected && !this.state.isHovered) {
      backClassName = "package__back package__back_selected";
      ovalClassName = "package__oval package__oval_selected";
      borderClass = "package__border__stroke package__border__stroke_selected";
    } else if (!this.state.isSelected && this.state.isHovered) {
      backClassName = "package__back package__back_default-hover";
      ovalClassName = "package__oval package__oval_default-hover";
      borderClass = "package__border__stroke package__border__stroke_default-hover";
    } else {
      backClassName = "package__back";
      ovalClassName = "package__oval";
      borderClass = "package__border__stroke";
    }
    const nameClassName = "package__name" + (isDisabled ? " package__disabled" : "");
    const tasteClassName = "package__taste" + (isDisabled ? " package__disabled" : "");
    const contentClassName = "package__content" + (isDisabled ? " package__disabled" : "");
    const captionClassName = "package__caption" + (isDisabled ? " package__caption_disabled" : "");

    // package title and capture calculation
    const currentTitle = this.state.isSelected && this.state.isHovered ? warningTitle : title;
    let currentCaption;
    if (isDisabled) {
      currentCaption = outOfStockCaption.replace(/#name/, taste);
    } else if (this.state.isSelected) {
      currentCaption = description;
    } else {
      const buy = 'купи'
      const arr = saleCaption.split(buy);
      currentCaption = <React.Fragment>
        {arr[0]}<span className="package__buy" onClickCapture={this.handleClick} onTouchStartCapture={this.handleClick}>{buy}</span>{arr[1]}
      </React.Fragment>;
    }
    return (
      <div className={"package"} >
        <div className={backClassName} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClickCapture={this.handleClick} onTouchStartCapture={this.onClick}>
          <Border svgClass="package__border" borderClass={borderClass} />
          <div className="package__background" />
          <div className={titleClassName}>
            {currentTitle}
          </div>
          <div className={nameClassName}>
            {name}
          </div>
          <div className={tasteClassName}>
            {'с ' + taste}
          </div>
          <div className={contentClassName}>
            <div>
              <span className="package__portion-count">{portionCount}</span>{' порц' + portionEnding}
            </div>
            <div>
              <span className="package__mice-count">{miceCount !== 1 ? miceCount + ' ' : ''}</span>{'мыш' + miceEnding + ' в подарок'}
            </div>
            {isCustomerHappy &&
              <div className="package__customer-happy">
                заказчик доволен
            </div>}
          </div>
          <div className={ovalClassName}>
            <span className="package__weight">
              {weight}
            </span>
            <span className="package__unit">
              кг
             </span>
          </div>
        </div>
        <div className={captionClassName}>
          {currentCaption}
        </div>
      </div>
    );
  }
}

export default Package;