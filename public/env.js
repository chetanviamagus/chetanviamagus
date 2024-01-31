window.env = {
    VITE_BASE_API_URL: "https://dev.neubird.web-devapp.com1",
    VITE_ENABLE_PWA_MODE: "true",
    VITE_LOCAL_DB_NAME: "BOILERPLATE_DB",
    VITE_SHOW_LOGS: "true",
    VITE_PLATFORM_ADMIN: "false",
    VITE_GENERATE_SOURCEMAP: "false",
    VITE_PORT: "3005",
    VITE_SHOULD_PERSIST: "Y",
    VITE_PERSIST_STORAGE: "INDEX_DB",
    VITE_PERSIST_STORAGE_SECRET: "SecreT$key",
    VITE_DEFAULT_SYSTEM_PROMPT:"You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.",
    VITE_OPENAI_API_HOST:"",
    VITE_DEFAULT_TEMPERATURE:"",
    VITE_OPENAI_API_TYPE:"",
    VITE_OPENAI_API_VERSION:"",
    VITE_OPENAI_ORGANIZATION:"",
    VITE_AZURE_DEPLOYMENT_ID:"",
    VITE_DEFAULT_MODEL:"gpt-3.5-turbo",
    VITE_OPENAI_API_KEY:"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",
    //Microsoft SSO MSAL login requirements
    VITE_MICROSOFT_CLIENT_ID:"ebd53e9a-adc4-4ef0-93ad-a7f9fcd54d93",
    VITE_MICROSOFT_TENANT_ID:"2f6740bd-afa3-4ca6-a2f0-deae89ed27ee",
    //Google SSO login requirements
    VITE_GOOGLE_CLIENT_ID:"1006635141096-e71mr2ahbbo69lkp4t207sdg3rue1tvi.apps.googleusercontent.com",
    VITE_GOOGLE_API_KEY:"YOUR_API_KEY",
    VITE_GOOGLE_CSE_ID:"YOUR_ENGINE_ID",
    VITE_LOAD_TENANT_BASED_LOGIN_CONFIG:true,
    //Form login requirements
    "VITE_LOGIN_CONFIG": `{
        "CLIENT_LOGO": "https://www.neubird.com/assets/images/logo.png",
        "CLIENT_NAME": "Neubird",
        "CLIENT_COPYRIGHT": "Neubird © 2021",
        "CLIENT_TERMS_CONDITIONS": "https://www.neubird.com/terms-and-conditions",
        "CLIENT_PRIVACY_POLICY": "https://www.neubird.com/privacy-policy",
        "CLIENT_SUPPORT_EMAIL": "",
        "CLIENT_SUPPORT_PHONE": "",
        "CLIENT_TAG_LINE": "Neubird",
        "CLIENT_DESCRIPTION": "Neubird",
        "ENABLE_MICROSOFT_LOGIN": true,
        "ENABLE_GOOGLE_LOGIN": true,
        "ENABLE_FORM_LOGIN": true,
        "ENABLE_SIGNUP": true,
        "SSO_PROVIDER": [
          {
            "NAME": "Microsoft",
            "CLIENT_ID": "ebd53e9a-adc4-4ef0-93ad-a7f9fcd54d93",
            "TENANT_ID": "2f6740bd-afa3-4ca6-a2f0-deae89ed27ee"
          },
          {
            "NAME": "Google",
            "CLIENT_ID": "1006635141096-e71mr2ahbbo69lkp4t207sdg3rue1tvi.apps.googleusercontent.com",
            "API_KEY": "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",
            "CSE_ID": "1006635141096-e71mr2ahbbo69lkp4t207sdg3rue1tvi.apps.googleusercontent.com"
          }
        ]
    }`
};