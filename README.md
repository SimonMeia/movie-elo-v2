# movie-elo-v2

## Development

1. Edit the env file
2. Run `docker compose up`
3. Run `npm i`
4. Run `node ace migration:run --seed`
5. Run `node ace serve --watch`

## Cron jobs

The demo user uses de [adonisjs-scheduler](https://packages.adonisjs.com/packages/adonisjs-scheduler) package. So run
`node ace scheduler:run` when deploying (or `node ace scheduler:run --watch` during dev if necessary)

## Demo User
```
username: demo@movie-elo.com
password: 1234
```

## Documentation

- [Adonis Documentation](https://docs.adonisjs.com)
- [Lucid Documentation](https://lucid.adonisjs.com/docs/introduction)

- [Class diagram](https://dbdiagram.io/d/movie-elo-v2-class-65d31741ac844320ae74486a)
- [Relationnal schema](https://dbdiagram.io/d/movie-elo-v2-realtionnal-65d3172cac844320ae744674)
