import { Carousel } from "antd";
export default function IndexCarousel() {
  const contentStyle = {
    height: "300px",
    width: "100%",
    // color: "#fff",
    lineHeight: "300px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <Carousel autoplay>
      <div>
        <h3>
          <img
            style={contentStyle}
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603443458590&di=00276f03c816a2efa1cdf70a876a3152&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201408%2F18%2F102924ksgdxyyacjdggygx.jpg"
            alt=""
          />
        </h3>
      </div>
      <div>
        <h3>
          <img
            style={contentStyle}
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603443458590&di=00276f03c816a2efa1cdf70a876a3152&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201408%2F18%2F102924ksgdxyyacjdggygx.jpg"
            alt=""
          />
        </h3>
      </div>
      <div>
        <h3>
          <img
            style={contentStyle}
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603519904703&di=77b3b7c36c8c8712a6089dd283c80a14&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201706%2F24%2F160153jcicq9jfcisld7v7.jpg"
            alt=""
          />
        </h3>
      </div>
      <div>
        <h3>
          <img
            style={contentStyle}
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603519904703&di=77b3b7c36c8c8712a6089dd283c80a14&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201706%2F24%2F160153jcicq9jfcisld7v7.jpg"
            alt=""
          />
        </h3>
      </div>
    </Carousel>
  );
}
