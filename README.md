# Watchdog

Get WhatsApp alerts whenever someone approaches your unattended laptop.

## Prerequisites

Linux

    $ sudo apt-get install fswebcam

Mac OSX

    $ brew install imagesnap

## Installation

Requires NodeJS & NPM.

Once installed, clone the repository and install its dependencies running:

    $ npm install

## Development

Sign up for [Twilio](https://www.twilio.com/try-twilio) and activate the [Sandbox for WhatsApp](https://www.twilio.com/console/sms/whatsapp/sandbox).

Once you have your credentials, create `.env` with the following:

```bash
TWILIO_ACCOUNT_SID=<TWILIO_ACCOUNT_SID_GOES_HERE>
TWILIO_AUTH_TOKEN=<TWILIO_AUTH_TOKEN_GOES_HERE>
TWILIO_WHATSAPP_FROM=<TWILIO_SANDBOX_NUMBER_GOES_HERE>
TWILIO_WHATSAPP_TO=<YOUR_NUMBER_GOES_HERE>
NGROK_AUTH_TOKEN=<NGROK_AUTH_TOKEN_GOES_HERE>
NGROK_SUBDOMAIN=<NGROK_SUBDOMAIN_GOES_HERE>
NGROK_URL=<NGROK_URL_GOES_HERE>
NGROK_REGION=<NGROK_REGION_GOES_HERE>
NGROK_USERNAME=<NGROK_USERNAME_GOES_HERE>
NGROK_PASSWORD=NGROK_PASSWORD_GOES_HERE>
SERVER_PORT=<SERVER_PORT_GOES_HERE>
```

Example `.env`

```bash
TWILIO_ACCOUNT_SID="44370743a981sdf18074ee2d7c87"
TWILIO_AUTH_TOKEN="f32dcbf09af4190caab20f3ecc0312"
TWILIO_WHATSAPP_FROM="1410000001"
TWILIO_WHATSAPP_TO="353870000001"
NGROK_AUTH_TOKEN="84shw61df31ud6s_kd73gr9hhd613"
NGROK_SUBDOMAIN="watchdog"
NGROK_URL="https://watchdog.ngrok.io"
NGROK_REGION="us"
NGROK_USERNAME="watchdog"
NGROK_PASSWORD="watchdog"
SERVER_PORT="5000"
```

Run:

    $ npm run start

## Testing

For ESLint run:

    $ npm run lint

For tests run:

    $ npm run test

## Copyright & License

Copyright (c) 2019 Conor Hughes - Released under the MIT license.
