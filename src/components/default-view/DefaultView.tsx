import "./defaulViw.scss";
import logo from "../../assets/logo/logo.png";
import zoom from "../../assets/images/zoom.svg";
import googleMeet from "../../assets/images/google-meet.svg";

interface IDefaultView {
  onClick: () => void;
}
function DefaultView(props: IDefaultView) {
  const { onClick } = props;
  return (
    <div className="default-view-container">
      <div className="title-container">
        <img className="logo" src={logo} alt="" />
        <div className="title-style">Chrome extension</div>
      </div>
      <div className="text">Get automatic meeting summary</div>
      <div className="features">
        <div className="feature">
          <div className="logo">
            <img src={zoom} alt="" />
          </div>
          <div className="title-box">
            <div className="title">Zoom</div>
            <div className="subtitle">
              Tap on a Zoom meeting link to open it in your Chrome browser.
            </div>
          </div>
        </div>
        <div className="feature">
          <div className="logo">
            <img src={googleMeet} alt="" />
          </div>
          <div className="title-box">
            <div className="title">Google Meet</div>
            <div className="subtitle">
              Start a meeting from{" "}
              <a href="https://meet.google.com/" target="_blank">
                meet.google.com
              </a>{" "}
              in your Chrome browser.
            </div>
          </div>
        </div>
      </div>
      <div className="record" onClick={onClick}>
        Record on my device instead
      </div>
    </div>
  );
}

export default DefaultView;
