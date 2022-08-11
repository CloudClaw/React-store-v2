import React from 'react';
import 'antd/dist/antd.css';

import { Menu, Layout } from 'antd';
import { NavLink } from 'react-router-dom';

const { Sider } = Layout;

export const SideBar: React.FC = React.memo(() => {
	return (
	  <Sider className="site-layout-background" width={200}>
		 <Menu
			mode="inline"
			style={{
			  height: '100%',
			}}>
			<Menu.Item>
			  <NavLink to="/">Все товары</NavLink>
			</Menu.Item>
			<Menu.Item>
			  <NavLink to="/smartphones">Смартфоны</NavLink>
			</Menu.Item>
			<Menu.Item>
			  <NavLink to="/pcs">Компьютеры</NavLink>
			</Menu.Item>
			<Menu.Item>
			  <NavLink to="/pads">Планшеты</NavLink>
			</Menu.Item>
		 </Menu>
	  </Sider>
	);
 });
