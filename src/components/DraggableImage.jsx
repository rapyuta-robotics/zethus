import _ from 'lodash';
import React from 'react';

class DraggableImage extends React.Component {
  constructor(props) {
    super(props);

    this.elementRef = React.createRef();

    this.divMouseDown = { left: 0, top: 0 };
    this.mouseDown = { x: 0, y: 0 };

    this.hide = this.hide.bind(this);
    this.moveDiv = this.moveDiv.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    const {
      viz: { rosObject },
    } = this.props;

    rosObject.setImageRef(
      this.elementRef.current.getElementsByTagName('canvas')[0],
    );
  }

  hide() {
    const {
      updateVisibilty,
      viz: { id, rosObject },
    } = this.props;

    updateVisibilty(id, false);
    rosObject.hide();
  }

  moveDiv({ clientX, clientY }) {
    const { x: initialX, y: initialY } = this.mouseDown;
    const { left: divInitialLeft, top: divInitialTop } = this.divMouseDown;

    this.setDivPosition(
      `${divInitialLeft + clientX - initialX}px`,
      `${divInitialTop + clientY - initialY}px`,
    );
  }

  onMouseDown({ clientX, clientY }) {
    const { left, top } = this.elementRef.current.style;
    this.mouseDown = {
      x: clientX,
      y: clientY,
    };
    this.divMouseDown = {
      left: _.parseInt(left) || 0,
      top: _.parseInt(top) || 0,
    };
    window.addEventListener('mousemove', this.moveDiv);
  }

  onMouseUp() {
    window.removeEventListener('mousemove', this.moveDiv);
  }

  setDivPosition(left, top) {
    this.elementRef.current.style.top = top;
    this.elementRef.current.style.left = left;
  }

  render() {
    const {
      viz: { visible, name },
    } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <div
        ref={this.elementRef}
        className="vizImageContainer"
        onMouseUp={this.onMouseUp}
      >
        <div className="vizImageHeader" onMouseDown={this.onMouseDown}>
          <div className="vizImageName">{name}</div>
          <div className="flexGrow" />
          <button type="button" className="vizImageClose" onClick={this.hide}>
            CLOSE
          </button>
        </div>
        <canvas />
      </div>
    );
  }
}

export default DraggableImage;
