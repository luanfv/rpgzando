echo "Creating google-services.json file"
cat > ./android/app/google-services.json <<EOL
$GOOGLE_JSON
EOL

echo "Creating .env file"
cat > ./.env <<EOL
AUTH_GOOGLE="$OAUTH_WEB_CLIENT_ID"
EOL
