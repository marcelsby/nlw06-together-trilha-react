import { ReactNode } from 'react';

import logoImg from '../assets/images/logo.svg';

import '../styles/room-header.scss';

type RoomHeaderProps = {
    children: ReactNode;
}

export function RoomHeader(props: RoomHeaderProps) {
    return (
        <header>
            <div className="content">
                <img src={logoImg} alt="Logo Let me Ask" />
                {props.children}
            </div>
        </header>
    )
}