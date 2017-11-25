# Serverless Mailgun Slack

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![CircleCI](https://circleci.com/gh/henry40408/serverless-mailgun-slack.svg?style=shield)](https://circleci.com/gh/henry40408/serverless-mailgun-slack)
[![codecov](https://codecov.io/gh/henry40408/serverless-mailgun-slack/branch/master/graph/badge.svg)](https://codecov.io/gh/henry40408/serverless-mailgun-slack)
[![GitHub release](https://img.shields.io/github/release/henry40408/serverless-mailgun-slack.svg)](https://github.com/henry40408/serverless-mailgun-slack)
[![license](https://img.shields.io/github/license/henry40408/serverless-mailgun-slack.svg)](https://github.com/henry40408/serverless-mailgun-slack)

> Redirect e-mails to Slack via Mailgun Routes

## Requirements

* Node 6.10.3, according to
  [Lambda Execution Environment and Available Libraries](http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html)
* AWS CLI,
  [with credentials configured](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

## Installatin Dependencies

`yarn` is recommended, `npm` should work as well.

```bash
$ yarn
```

## Default Settings

* AWS region: `ap-northeast-1`

Edit `serverless.yml` to change the above settings.

```yaml
service: serverless-webcron

provider:
  # ...
  region: "ap-northeast-1" # <-- AWS region
  # ...
```

## Configure Secrets

```bash
$ cp secrets.example.yml secrets.yml
$ edit secrets.yml
```

* Replace `slack_webhook_url` with your own Slack Webhook URL.
* Replace `mailgun_api_key` with
  [Mailgun API key](https://help.mailgun.com/hc/en-us/articles/203380100-Where-can-I-find-my-API-key-and-SMTP-credentials-).

## Deploy

```bash
$ yarn run sls deploy
```

## License

MIT
