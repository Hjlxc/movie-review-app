# movie-review-app

This project implement a movie review app with React-Redux framework, that pulling the data from [TMDB movie database](https://www.themoviedb.org/documentation/api) for end user to review.

## Feature

- Dynamic adjust the grid layout to fit different screen size
- All user to review a list of movies with overall information
- Provide detail information for each selected movie
- Dynamic load data by using [React Infinite Scroller](https://www.npmjs.com/package/react-infinite-scroller)
- Provide useful filter feature
  ..1. Filter by Language
  ..2. Filter by Voting
  ..3. Filter for Adult Only
  ..4. Search by Title Key Wrod
- Provide useful sorting feature
  ..1. Sort by Rating
  ..2. Sort by Alphabet
  ..3. Sort by Release data

## Structure

The project has 3 main sections that allow for easy extension, [modules](https://github.com/Hjlxc/movie-review-app/tree/master/src/modules), [container](https://github.com/Hjlxc/movie-review-app/tree/master/src/container) and [component](https://github.com/Hjlxc/movie-review-app/tree/master/src/component)

### modules

The modules contains the redux module, any redux state and logic should add to here.

### container

The container are served as the container that group the components. In addition, it will also connect and receive redux state. Container can either be stateful or stateless.

### component

The component should only be responsible for render and be stateless.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Todo

- Implement specific mobile UI for better mobile user experience
- Improve UI/UX for better user experience
- Adding additional feature based on required
