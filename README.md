# Gradient Descent

## Description

This project explores how we can use supervised learning to solve a regression problem; predict the sale price of a house given a particular age. The algorithm chosen here is gradient descent with univariant linear regression using the mean squared error as the cost function.

## Common Terms

Gradient Descent is a machine learning algorithm which is used to find the local minima (or global minima in convex functions) of a given cost function.

Machine learning is the science of getting computers to learn without being explicitly programmed. - Arthur Samuel (1959)

Supervised learning is when you give the computer all the input, output pairs for the training data.

Regression problem - Predicting continuous values

## Getting Started

To install dependencies we use yarn:

```
yarn install
```

### Starting locally:

To start the server:

```
yarn workspace server dev
```

To start the app:

```
yarn workspace app dev
```

### Lerna

First off, What is [`lerna`](https://github.com/lerna/lerna)? [`lerna`](https://github.com/lerna/lerna) is a tool that allows you to maintain multiple `npm` packages within one repository.

There's a couple of benefits to this kind of approach, the paradigm is called a `monorepo`, and more can be read about it from the [source of `babel`, and `react`](https://github.com/babel/babel/blob/master/doc/design/monorepo.md).

Here's the gist:

- Single lint, build, test and release process.
- Easy to coordinate changes across modules.
- Single place to report issues.
- Easier to setup a development environment.
- Tests across modules are ran together which finds bugs that touch multiple modules easier.

### Vite

Vite is a new and upcoming frontend build tool which is blazingly fast and comes with rich out of the box features such as a ready to go static file server. For more information about vite visit: https://vitejs.dev/.

## TODO:

- [x] Convert csv data to json
- [x] Setup a simple server for client to retrieve data
- [x] Plot the data onto a scatter diagram
- [x] Plot the hypothesis line
- [x] Calculate cost function
- [x] Gradient descent algorithm
- [x] Contour plot of the error
- [ ] Enable controls for adjusting the parameters of the line
- [ ] Visualise the steps of GD alg

![mean square error](https://images.squarespace-cdn.com/content/v1/5eeae1506bdf6661fc47e928/1603773819214-35PELAZY56BUMPNHZI1B/image-asset.png?format=1500w)
