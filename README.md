# openmensa-js

[OpenMensa](https://openmensa.org/) is a free database for canteens. This package provides an easy point of entry to interface with the OpenMensa api in NodeJS.

## Installation

```shell
npm install openmensa-js
```

## Example
```js
const openmensa = require('openmensa-js');

openmensa.getCanteens({
  lng: 11.5933126,
  lat: 50.9243788,
  dist: 15,
}).then(canteens => { /*Do something*/ });

// or async-await syntax

const canteens = await openmensa.getCanteens({
  lng: 11.5933126,
  lat: 50.9243788,
  dist: 15,
});

// Do something
```


## Methods

For more information on the API shemas and formats please refer to the [offical OpenMensa documentation](https://doc.openmensa.org/api/v2/).
All methods return promises.

### getCanteens

method for requesting a list of canteens

```js
openmensa.getCanteens(options);
```

| Name                   | Type    | Description                                                                                      |
|------------------------|---------|--------------------------------------------------------------------------------------------------|
| options.limit          | number  | max number of canteens returned (default: 100 = max)                                             |
| options.page           | number  | offset value to request more than the limit of 100 canteens                                      |
| options.lat            | number  | searches for canteens near given coordinates                                                     |
| options.lng            | number  | searches for canteens near given coordinates                                                     |
| options.dist           | number  | maximum distance to search for canteens near given coordinates (requires latitude and longitude) |
| options.ids            | array   | list of canteen IDs that should be returned                                                      |
| options.hasCoordinates | boolean | only canteens with (true) or without (false) coordinates will be returned                        |


### getCanteen

method for requesting info about a single canteen

```js
openmensa.getCanteen(id);
```

| Name       | Type    | Description                 |
|------------|---------|-----------------------------|
| id         | number  | the canteen’s numeric ID    |                                                                         |


### getDay

method for requesting opening information about a canteen on a specified date

```js
openmensa.getDay(id, date);
```

| Name     | Type    | Description                |
|----------|---------|----------------------------|
| id       | number  | the canteen’s numeric ID   |
| date     | Date    | date                       |


### getDays

method for requesting opening information about a canteen

```js
openmensa.getDays(id, options);
```

| Name                   | Type    | Description                                        |
|------------------------|---------|----------------------------------------------------|
| id                     | number  | the canteen’s numeric ID                           |
| options.start          | date    | start date (default: today)                        |
| options.limit          | number  | max number of days returned (default: 100 = max)   |

### getMeals

method for requesting a list of available meals at a specified canteen on a specified day

```js
openmensa.getMeals(id, date);
```

| Name                   | Type    | Description                                        |
|------------------------|---------|----------------------------------------------------|
| id                     | number  | the canteen’s numeric ID                           |
| date                   | date    | date                                               |

### getMeal

method for requesting information on a specified meal at a specified canteen on a specified day

```js
openmensa.getMeal(id, date, mealId);
```

| Name                   | Type    | Description                                        |
|------------------------|---------|----------------------------------------------------|
| id                     | number  | the canteen’s numeric ID                           |
| date                   | date    | date                                               |
| mealId                 | number  | the meals’s numeric ID                             |
