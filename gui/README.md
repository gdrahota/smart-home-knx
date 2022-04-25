# base-gui

## Description

This repo serves as a GUI and back end template. It contains these basic infrastructures:

- Vue.js 2.6
- Quasar 1.x
- REST Client to be used in vuex actions
- application header including:
  - route's title (route.meta.title)
  - route's sub name (see root mixin fc)
  - a mechanism to configure and render menus, and it's items
- Login dialog

## Project setup

```
git clone https://github.com/kaulsdorf-it/base-backend.git
cd base-backend
yarn install
```

### Dev Mode - Compiles and hot-reloads for development

```
yarn dev
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
