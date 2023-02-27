import { NextjsSite, StackContext }from 'sst/constructs';

export const NextJsApp = function NextJsApp({ stack }: StackContext) {

  // ... existing constructs

  // Create the Next.js site
  const site = new NextjsSite(stack, 'reinvest-web-app', {
    path: 'reinvest-web-app/',
    // customDomain: "my-app.com",
    // environmant: {
    //
    // }
  });

  // Add the site's URL to stack output
  stack.addOutputs({
    URL: site.url || 'localhost',
  });
};

