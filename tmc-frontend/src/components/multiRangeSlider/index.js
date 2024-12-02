import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import raf from "rc-util/lib/raf";
import React from "react";
import useMediaQuery from "react-responsive";

const HandleTooltip = (props) => {
  const {
    value,
    children,
    visible,
    tipFormatter = (val) => `${val} %`,
    ...restProps
  } = props;

  const tooltipRef = React.useRef();
  const rafRef = React.useRef(null);

  function cancelKeepAlign() {
    raf.cancel(rafRef.current);
  }

  function keepAlign() {
    rafRef.current = raf(() => {
      if (tooltipRef.current) {
        tooltipRef.current.forceAlign();
      }
    });
  }

  React.useEffect(() => {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [value, visible]);

  return (
    <Tooltip
      placement="top"
      overlay={tipFormatter(value)}
      overlayInnerStyle={{
        minHeight: "auto",
        backgroundColor: "white",
        color: "blue",
        fontWeight: "bold",
      }}
      ref={tooltipRef}
      visible={visible}
      {...restProps}
    >
      {children}
    </Tooltip>
  );
};

export const handleRender = (node, props) => (
  <HandleTooltip value={props.value} visible={props.dragging}>
    {node}
  </HandleTooltip>
);

const MultiRangeSlider = ({ tipFormatter, tipProps, ...props }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 720px)",
  });

  const tipHandleRender = (node, handleProps) => (
    <HandleTooltip
      value={handleProps.value}
      // visible={handleProps.dragging}
      visible={isDesktopOrLaptop === undefined}
      tipFormatter={tipFormatter}
      {...tipProps}
    >
      {node}
    </HandleTooltip>
  );

  return <Slider {...props} handleRender={tipHandleRender} />;
};

export default MultiRangeSlider;
