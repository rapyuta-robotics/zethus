import React from 'react';

class DraggableImage extends React.Component {
  constructor(props) {
    super(props);

    this.style = {
      left: '0px',
      top: '0px',
    };

    this.elementRef = React.createRef();
    this.hide = this.hide.bind(this);
    this.moveDiv = this.moveDiv.bind(this);
    this.initDragDiv = this.initDragDiv.bind(this);
    this.removeDragEvents = this.removeDragEvents.bind(this);
  }

  componentDidMount() {
    const {
      viz: { rosObject },
    } = this.props;

    rosObject.setImageRef(
      this.elementRef.current.getElementsByTagName('canvas')[0],
    );

    this.setDivPosition();
  }

  hide() {
    const {
      viz: { id, rosObject },
      updateVisibilty,
    } = this.props;

    updateVisibilty(id, false);
    rosObject.hide();
  }

  moveDiv(e) {
    e.preventDefault();
    const { clientX, clientY } = e;
    this.style = {
      left: `${clientX - this.elementRef.current.clientWidth / 2}px`,
      top: `${clientY - this.elementRef.current.clientHeight / 2}px`,
    };
    this.setDivPosition();
  }

  initDragDiv() {
    window.addEventListener('mousemove', this.moveDiv);
  }

  removeDragEvents() {
    window.removeEventListener('mousemove', this.moveDiv);
  }

  setDivPosition() {
    const { left, top } = this.style;

    this.elementRef.current.style.top = top;
    this.elementRef.current.style.left = left;
  }

  render() {
    const {
      viz: { id, visible },
    } = this.props;

    return (
      <div
        ref={this.elementRef}
        className="viz-image-container"
        id={id}
        onMouseDown={this.initDragDiv}
        onMouseUp={this.removeDragEvents}
        style={{ display: visible ? 'flex' : 'none' }}
      >
        <div className="img-header">
          <span className="img-close-btn" onClick={this.hide}>
            CLOSE
          </span>
        </div>
        <canvas
          id="id"
          width="320"
          height="240"
          style={{ border: '1px solid #d3d3d3' }}
        >
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </div>
    );
  }
}

export default DraggableImage;
