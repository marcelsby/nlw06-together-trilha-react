import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';

import '../styles/room-header.scss';

type RoomHeaderProps = {
    children: ReactNode;
}

export function RoomHeader(props: RoomHeaderProps) {
    return (
        <header>
            <div className="content">
                <Link to="/">
                    <img src={logoImg} alt="Logo Let me Ask" id="logo" />
                </Link>
                {props.children}
            </div>
        </header>
    )
}