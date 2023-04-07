import { NextjsSite, StackContext } from 'sst/constructs'
import { stack } from 'sst/constructs/FunctionalStack'

export const NextJsApp = function NextJsApp ({ stack }: StackContext) {
    // Create the Next.js site
    const site = new NextjsSite(stack, "reinvest-web-app", {

        path: "reinvest-web-app/",
        // customDomain: "my-app.com",
        environment: {
            SITE_NAME: process.env.SITE_NAME as string,
            REINVEST_SITE_URL: process.env.REINVEST_SITE_URL as string,
            AWS_COGNITO_USER_POOL_ID: process.env.AWS_COGNITO_USER_POOL_ID as string,
            AWS_COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID as string,
            API_URL: process.env.API_URL as string,
            ANALYZE: process.env.ANALYZE as string,
            AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION as string,
            GOOGLE_MAPS_API_KEY: process.env.AWS_COGNITO_REGION as string,
            GOOGLE_MAPS_PLACES_URL: process.env.AWS_COGNITO_REGION as string,
            GOOGLE_MAPS_AUTOCOMPLETE_URL: process.env.AWS_COGNITO_REGION as string,
            SENTRY_DSN: process.env.AWS_COGNITO_REGION as string,
        },
    })

    // Add the site's URL to stack output
    stack.addOutputs({
        URL: site.url || 'localhost',
    })
}

