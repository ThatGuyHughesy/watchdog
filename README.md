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
ACCOUNT_SID=<TWILIO_ACCOUNT_SID_GOES_HERE>
AUTH_TOKEN=<TWILIO_AUTH_TOKEN_GOES_HERE>
WHATSAPP_FROM=<TWILIO_SANDBOX_NUMBER_GOES_HERE>
WHATSAPP_TO=<YOUR_NUMBER_GOES_HERE>
```

Run:

    $ npm start

## Testing

For ESLint run:

    $ npm run lint

For tests run:

    $ npm run test

## Copyright & License

Copyright (c) 2019 Conor Hughes - Released under the MIT license.
