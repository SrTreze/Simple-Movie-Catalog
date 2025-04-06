# Simple-Movie-Catalog

Simple movie catalog in Vue 3 with Vite and Vuex4, using [tmdb](https://developer.themoviedb.org/).

### Compile and Hot-Reload for Development

In the file .env.development, add your access token to 'Bearer'. It should look something like:
```
Bearer='your-access-token'
```

To run the app, run the following command on you command line
```sh
npm run dev
```

### Notes

- Was asked to use Vuex, and since Vuex was specified instead of Pinia (the one I'm already used to using) it was assumed that Vuez refered to Vuex4 (which lead to learning it's syntax)

- When selecting a genre in the combobox, the error ```Uncaught IndexSizeError: Failed to execute 'getRangeAt' on 'Selection': 0 is not a valid index.``` is given, however, this seems to be a browser issue, since it does not happen on safari

- Pagination componet receives 'current page' and 'total pages' as properties instead of using the store/a store module to make the component more flexible and reusable (e.g. if a view to list favorite movies were to be added)
