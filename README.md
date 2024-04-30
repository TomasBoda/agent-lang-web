<img src="https://github.com/TomasBoda/agent-lang/blob/main/assets/logos/agent-lang-web-logo-black.png#gh-light-mode-only" width="300">
<img src="https://github.com/TomasBoda/agent-lang/blob/main/assets/logos/agent-lang-web-logo-white.png#gh-dark-mode-only" width="300">

![Version Badge](https://img.shields.io/badge/version-1.0.0-blue?style=flat)
![Contributors Badge](https://img.shields.io/badge/contributors-1-green?style=flat)
![License Badge](https://img.shields.io/badge/license-MIT-red?style=flat)

## About
Web interface with code sandbox for the **AgentLang** programming language written in [TypeScript](https://www.typescriptlang.org/) using the [Next.js](https://nextjs.org/) framework.

## Running Locally
If you wish to run the project locally, clone the repository to your local machine, install all necessary packages and start the application.
```bash
# clone the repository
git clone https://github.com/TomasBoda/agent-lang-web.git
# checkout the project
cd agent-lang-web
# install necessary packages
npm install
# run the application
npm run dev
```

## Running Using Docker
If you wish to run the project using Docker, build the Docker image and run it using the following commands:
```bash
# clone the repository
git clone https://github.com/TomasBoda/agent-lang-web.git
# checkout the project
cd agent-lang-web
# build the image
docker build -it agent-lang-web-image .
# run the image
docker run -p 3000:3000 agent-lang-web-image
```
The last command will forward the port `3000` to your local machine, so your app is available in the browser on the address `http://localhost:3000`.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](/LICENSE.md)

Made by [Tomas Boda](https://github.com/TomasBoda)
