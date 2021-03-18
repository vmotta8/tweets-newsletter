# Typescript Serverless Framework Template

[Serverless Framework Documentation](https://www.serverless.com/)

### What's included
  - Typescript
  - Eslint
  - Jest
  - Middy
  - Simple hello service and handler
  - [serverless-pseudo-parameters plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Allows you to take advantage of CloudFormation Pseudo Parameters.
  - [serverless-bundle plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Bundler based on the serverless-webpack plugin - requires zero configuration and fully compatible with ES6/ES7 features.

### Getting started
```
% serverless create --name YOUR_PROJECT_NAME --template-url https://github.com/vmotta8/sls-typescript-template
% cd YOUR_PROJECT_NAME
% yarn
% yarn test
```

### How to deploy
```
% yarn build
% sls deploy -v
```

