import React, { useEffect, useState } from 'react';
import  '../resources/Layout.css'
import {
  HomeOutlined,CopyOutlined,ShoppingCartOutlined,UnorderedListOutlined,UserOutlined,LogoutOutlined,MenuFoldOutlined,MenuUnfoldOutlined} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import {Link} from 'react-router-dom';
// import useSelection from 'antd/es/table/hooks/useSelection';
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import {useNavigate} from 'react-router-dom'
const { Header, Sider, Content } = Layout;

const Defaultlayout = (props) => {
  // function NewCart(){
  //   <Link to='/cart'/>
  // }
  // const navigate=useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {cartItems,loading}=useSelector(state=>state.rootreducer)||{};
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
useEffect(()=>{
localStorage.setItem('cartItems',JSON.stringify(cartItems))
},[cartItems])
  return (
    <Layout>
    {loading&&(<div className='spinner'>
    <div className="spinner-border" role="status">
</div>
</div>)}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" ><h3>Fresh Mart</h3></div>
        <Menu className='remove'
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={[
            {
              key: '/home',
              icon: <HomeOutlined />,
              label: <Link to='/home'>Home</Link>,
            },
            {
              key: '/cart',
              icon: <ShoppingCartOutlined/>,
              label: <Link to='/cart'>Cart</Link>,
            },
            {
              key: '/bills',
              icon: <CopyOutlined/>,
              label:  <Link to='/bills'>Bills</Link>,
            },
            {
              key: '/items',
              icon: <UnorderedListOutlined/>,
              label:  <Link to='/items'>Items</Link>,
            },
            {
              key: '/customers',
              icon: <UserOutlined />,
              label:  <Link to='/customers'>Customers</Link>,
            },
            {
              key: '/logout',
              icon: <LogoutOutlined/>,
              label:  <Link to='/logout' onClick={()=>{
                localStorage.removeItem('pos users')
                window.location.href='/login'
              }}>Logout</Link>,
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 10, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Link className='hey' to='/cart'>
          <div className='cart-count d-flex' >
            
                <b><p className='mt-3'>{cartItems.length}</p></b>
                <ShoppingCartOutlined />
              
          </div>
          </Link>
        </Header>
        <Content
          style={{
            margin: '10px',
            padding: 24,
            minHeight: '90vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >{props.children}
        </Content>
      </Layout>
    </Layout>
  );
};


export default Defaultlayout;