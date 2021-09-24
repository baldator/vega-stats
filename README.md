# Vega Market - Bots analytics

The aim of the project is to provide a community example about how easy is to integrate Vega graphQL API into a react project.
The project is getting Vega live data and providing a simple view showing the ratio of trades executed by bots or humans.

## Live demo

You can acces the application here: [Live demo](https://square-scene-4524.on.fleek.co/)

# GraphQL query examples

GraphQL queries are executed by [Apollo Client](https://www.apollographql.com/).

## Run a simple query

To run a simple query call the useQuery method. The method perform a one-shot query and never refresh data.
Here is an example from the MarketSelect component:

```javascript
const GET_VEGA_MARKETS = gql`
    query{
      markets{
        value: id
        label: name
      }
    }
`;

const { loading, error, data } = useQuery(GET_VEGA_MARKETS);
```

## Run query and regularly reflesh data

If you want to refresh data regularly, you can use the pollInterval attribute of the options object.
You can find an example in the VegaRealTime component:

```javascript
const GET_VEGA_REAL_TIME = gql`
  query GetVegaRealTime {
    statistics{
      vt: vegaTime
    }
  }
`;

const { loading, error, data } = useQuery(GET_VEGA_REAL_TIME, {
    pollInterval: 1000
});
```

## Subscribe to event stream

If you want to subscribe to an event stream, you can use the useSubscription method provided by Apollo Client.
You can find an example in the App component:

```javascript
const SUBSCRIBE_TRADES = gql`
  subscription getTradingData {
    trades{
      size
      market{
        id
      }
      buyer{
        id
      }
    }
  }
`;


const result = useSubscription(
    SUBSCRIBE_TRADES
);
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
