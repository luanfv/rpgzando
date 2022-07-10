echo "Creating google-services.json file"
cat > ./android/app/google-services.json <<EOL
{
  "project_info": {
    "project_number": "$PROJECT_NUMBER",
    "firebase_url": "$FIREBASE_URL",
    "project_id": "$PROJECT_ID",
    "storage_bucket": "$STORAGE_BUCKET"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "$MOBILESDK_APP_ID",
        "android_client_info": {
          "package_name": "$PACKAGE"
        }
      },
      "oauth_client": [
        {
          "client_id": "$OAUTH_ANDROID_CLIENT_ID",
          "client_type": 1,
          "android_info": {
            "package_name": "$PACKAGE",
            "certificate_hash": "$OAUTH_ANDROID_CERTIFICATE_HASH"
          }
        },
        {
          "client_id": "$OAUTH_WEB_CLIENT_ID",
          "client_type": 3
        }
      ],
      "api_key": [
        {
          "current_key": "$API_KEY"
        }
      ],
      "services": {
        "appinvite_service": {
          "other_platform_oauth_client": [
            {
              "client_id": "$OAUTH_WEB_CLIENT_ID",
              "client_type": 3
            },
            {
              "client_id": "$OAUTH_IOS_CLIENT_ID",
              "client_type": 2,
              "ios_info": {
                "bundle_id": "$PACKAGE"
              }
            }
          ]
        }
      }
    }
  ],
  "configuration_version": "1"
}
EOL

echo "Creating .env file"
cat > ./.env <<EOL
AUTH_GOOGLE="$OAUTH_WEB_CLIENT_ID"
EOL
