import React, { useEffect, useState } from "react";
import "../styles/components/Header.css";
import '../styles/components/Author.css'
import {
  HomeOutlined,
  PlayCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import { Row, Col, Menu } from "antd";
import Axios from "axios";
import servicePath from "../config/apiUrl";
import Router from "next/router";

const Header = () => {
  const [navArray,setNavArray] = useState([])
  useEffect(()=>{
    const fetchData = async ()=>{
      const results = await Axios(servicePath.getTypeInfo).then(
        (res)=>{
          return res.data.data          
        }
      )
      setNavArray(results)
    }
    fetchData()
  },[])


  const handleClick = (e)=>{
    if(e.key == 0){
      Router.push('/')
    }else{
      Router.push('/list?id='+e.key)
    }
  }

  return(
  <div className="header">
    <Row type="flex" justify="center">
      <Col xs={24} sm={24} md={15} lg={12}>
        <span className="header-logo">Tytp</span>
        <span className="header-txt">在学习阶段，只做了一些微小的工作</span>
      </Col>
      <Col xs={0} sm={0} md={14} lg={6}>
        <Menu mode="horizontal" onClick={handleClick}>
          <Menu.Item key="0">
            <HomeOutlined />
            首页
          </Menu.Item>

          {
            navArray.map((item)=>{
              return (
                  <Menu.Item key={item.id}>
                    <PlayCircleOutlined />
                    {item.typeName}
                  </Menu.Item>
              )
            })
          }
        

          <Menu.Item key="life">
            <SmileOutlined />
            生活
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  </div>

  )
}


export default Header;
