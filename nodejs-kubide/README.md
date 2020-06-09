# Kubide API

API REST for Kubide

## Installation

`Run npm install`

## Note

- In .env file you can modify the PORT and database name.

## Endpoints

| HTTP Method | URI path       | Description                              |
| ----------- | -------------- | ---------------------------------------- |
| GET         | /              | Welcome message on JSON format           |
| GET         | /notes/:id     | Get `note` by ID on JSON format          |
| GET         | /notes         | Get all `notes` on JSON format           |
| POST        | /notes         | Create a `note` on JSON format           |
| PATCH       | /favorites/:id | Set a `note` as favorite on JSON format  |
| GET         | /favorites     | Get all favorites `notes` on JSON format |

## JSON response format

```json
{
  "_id": "5eda4cd52428c12a93673a32",
  "favorite": true,
  "title": "Título super molón",
  "description": "bla bla bla bla bla",
  "createdAt": "2020-06-05T13:47:01.092+00:00",
  "updatedAt": "2020-06-05T14:19:31.528+00:00",
  "__v": 0
}
```

## JSON response data types

| Property      | Data type |
| ------------- | --------- |
| `_id`         | String    |
| `title`       | String    |
| `description` | String    |
| `favorite`    | Boolean   |
