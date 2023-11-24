import React from 'react';

const GRAFANA_DASHBOARD_URL = process.env.REACT_APP_GRAFANA_DASHBOARD_URL;

const dashBoardStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    border: 'none',
}

const GrafanaDashboard = () => {
    return (
        <iframe
            src={GRAFANA_DASHBOARD_URL}
            title="Grafana Dashboard"
            style={dashBoardStyle}
        ></iframe>
    );
};

export default GrafanaDashboard;
