import Author from "./Author";
import Advert from "./Advert";
import { Col } from "antd";

const RightPageComponent = () => {

  return (
    <Col className="comm-right" xs={0} sm={0} md={6} lg={5} xl={4}>
      <div className="animate__animated animate__fadeInRightBig">
        {/* 个人信息 */}
        <Author />
       
        {/* 广告信息 */}
        <Advert />
            
      </div>
    </Col>
  )
}
export default RightPageComponent;