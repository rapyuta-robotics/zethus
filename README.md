# Zethus
[![NPM package][npm]][npm-url]
[![Dependencies][dependencies]][dependencies-url]
[![Dev Dependencies][dev-dependencies]][dev-dependencies-url]
[![Language Grade][lgtm]][lgtm-url]

Realtime robot data visualization in the browser

### Getting started
#### Development version
**You’ll need to have Node 8.16.0 or Node 10.16.0 or later version on your local development machine** (but it’s not required on the server). You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.  
To start the user interface locally in dev mode, run the following commands:
```
npm install
npm start
```
#### Production version
The production version can be run locally with either docker or by building from source.  
**Running the docker container:**
```
docker build -t=zethus .
docker run -p 8080:8080 zethus
```
**Building the source:**
```
npm install
npm run build
```
Then start a server in `build` directory. You can use [serve](https://www.npmjs.com/package/serve) npm package or any similar software

### Visualizations and Documentation
Available options for each visualization on the [Github Wiki page](https://github.com/rapyuta-robotics/zethus/wiki)

### Contributing
PRs, bug reports, and feature requests are welcome! Please observe [CONTRIBUTING.md](https://github.com/rapyuta-robotics/zethus/blob/devel/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/rapyuta-robotics/zethus/blob/devel/CODE_OF_CONDUCT.md) when making a contribution.

### Maintenance Status
Active: Rapyuta Robotics is actively working on this project, and we expect to continue for work for the foreseeable future.

[npm]: https://badge.fury.io/js/zethus.svg
[npm-url]: https://www.npmjs.com/package/zethus
[dependencies]: https://img.shields.io/david/rapyuta-robotics/zethus.svg
[dependencies-url]: https://david-dm.org/rapyuta-robotics/zethus
[dev-dependencies]: https://img.shields.io/david/dev/rapyuta-robotics/zethus.svg
[dev-dependencies-url]: https://david-dm.org/rapyuta-robotics/zethus#info=devDependencies
[lgtm]: https://img.shields.io/lgtm/grade/javascript/g/rapyuta-robotics/zethus.svg?label=code%20quality
[lgtm-url]: https://lgtm.com/projects/g/rapyuta-robotics/zethus

