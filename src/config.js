export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: "sa-east-1",
        BUCKET: "gilsoncav-notes-app-uploads"
    },
    apiGateway: {
        REGION: "sa-east-1",
        URL: "https://q4phlr5297.execute-api.sa-east-1.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_m3QIEZrUk",
        APP_CLIENT_ID: "q6vh8deg37hbhn81tec0pf8vq",
        IDENTITY_POOL_ID: "us-east-2:c486bf5a-869b-47c6-a955-65c74253651b"
    }
};