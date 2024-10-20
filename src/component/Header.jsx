import React from 'react';
import './Header.css';

export default function Header({ title, leftChild, rightChild }) {
    return (
        <div className="Header">
            <div className="header_left">{leftChild}</div>
            <div className="header_title">{title}</div>
            <div className="header_right">{rightChild}</div>
        </div>
    );
}
