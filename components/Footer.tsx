/*
 * @Author: lyc
 * @Date: 2021-02-15 23:42:57
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-17 19:31:47
 * @Description: file content
 */
const Footer = () => {
  return (
    <>
      <style jsx={true}>
        {`
          .footer-div {
            text-align: center;
            width: 100%;
            padding: 1rem;
            color: #888;
          }
        `}
      </style>
      <div className="footer-div">
        <div>博客用了React+Node+Ant Design实现</div>
        <div>https://liyanchao2tytp.github.io/</div>
      </div>
    </>
  );
};

export default Footer;
