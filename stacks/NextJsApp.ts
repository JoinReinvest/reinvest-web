import { NextjsSite, StackContext } from 'sst/constructs'

export const NextJsApp = function NextJsApp ({ stack }: StackContext) {
    // Create the Next.js site
    const site = new NextjsSite(stack, "reinvest-web-app", {
        path: "reinvest-web-app/",
        // customDomain: "my-app.com",
        environment: {
            SITE_NAME: process.env.SITE_NAME,
            REINVEST_SITE_URL: process.env.REINVEST_SITE_URL,
            AWS_COGNITO_USER_POOL_ID: process.env.AWS_COGNITO_USER_POOL_ID,
            AWS_COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID,
            API_URL: process.env.API_URL,
            ANALYZE: process.env.ANALYZE,
            AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION,
        },
    })

    // Add the site's URL to stack output
    stack.addOutputs({
        URL: site.url || 'localhost',
    })
}

