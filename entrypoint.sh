#!/bin/bash

missing_variables=""
missing_opt_variables=false

[ -z "$REACT_APP_API_URL" ] && missing_variables+="REACT_APP_API_URL, "
[ -z "$REACT_APP_GRAFANA_DASHBOARD_URL" ] && missing_variables+="REACT_APP_GRAFANA_DASHBOARD_URL, "
[ -z "$REACT_APP_REFRESH_INTERVAL" ] && missing_opt_variables=true

if [ -n "$missing_variables" ]; then
    missing_variables="${missing_variables%, }"
    echo "Error: Some environment variables are missing: $missing_variables."
    exit 1
fi

if [ $missing_opt_variables = true ]; then
    echo "REACT_APP_REFRESH_INTERVAL environment variable is not set. Default value of 60s will be used."
fi

# Start server
npm start