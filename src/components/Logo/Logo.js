import React from 'react';
import lavibraLogo from '../../assets/images/lavibra-labs-logo.png';

const logo = (props) => (
    <div className="logo" style={{ height: props.height }}>
        <img src={lavibraLogo} height="100px" alt="Lavibra-Labs-Telemedicine-Logo" />
    </div>
);

export default logo;