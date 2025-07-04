import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'purpleblush',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345',
  database: 'purpleblush'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PurpleblushDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'purpleblush';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.purpleblush', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
