# Ajapo - Agile Planning Poker app :black_joker:

You can easily do Planning Poker on browser :+1:  
Try out from [here](https://planning-poker-app-835e9.web.app/) !

<img width="1440" alt="スクリーンショット 2023-02-19 20 34 36" src="https://user-images.githubusercontent.com/25704785/219945475-289c8cd0-12af-414f-b0d4-f5ce91d73cde.png">


## For developers

Recommend to use [Firestore emulator](https://cloud.google.com/firestore/docs/emulator) for local development.

### Initialize firebase CLI tool on your devise

[Official document](https://firebase.google.com/docs/cli)

```bash
# Install firebase-tools
curl -sL https://firebase.tools | bash
# or
npm install -g firebase-tools

# Connect to your Google account
firebase login
```

### Setup emulator

1. Install Java (JDK) from [here](https://www.oracle.com/jp/java/technologies/downloads/#jdk19-linux). Firestore emulator requires Java 11+ runtime.
2. Run `firebase init emulators`.
3. Select `Firestore Emulator`, and answer other questions.

For full reference of emulator suite, please read [this document](https://firebase.google.com/docs/emulator-suite/install_and_configure).

### Start local server with emulator

```bash
# Install dependencies
npm ci

# Start emulator (Note: Keep running with app server!)
firebase emulators:start

# Start app server
npm run start
```

Now you can use local emulator for developing !!

<img width="1440" alt="スクリーンショット 2023-02-19 20 37 57" src="https://user-images.githubusercontent.com/25704785/219945520-ea94eb54-f2bd-4470-9fbe-229a50327bed.png">

