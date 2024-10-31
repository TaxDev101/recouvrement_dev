import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const AppTooltip = ({ text, position, children, ...props }) => {
  return (
    <OverlayTrigger
      placement={position}
      delay={{ show: 250, hide: 400 }}
      overlay={
        <Tooltip id="button-tooltip" {...props}>
          {text}
        </Tooltip>
      }
    >
      <span>{children}</span>
    </OverlayTrigger>
  );
};

export default AppTooltip;
