# User API Spec

## Get User

Endpoint: GET /api/users/current

Request Header:

- token: token

Response Body (Success):

```json
{
  "data": {
    "username": "Natra",
    "name": "Rafly Natra",
    "token": "token123132432123123"
  }
}
```

Response Body (Failure):

```json
{
  "error": {
    "message": "Unauthorized, ...."
  }
}
```

## Update User

Endpoint: PATCH /api/users/current

Request Header:

- token: token

Request Body:

```json
{
  "username": "Natra", //optional
  "password": "rahasia" //optional
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "Natra",
    "name": "Rafly Natra"
  }
}
```

Response Body (Failure):

```json
{
  "error": {
    "message": "Unauthorized, ...."
  }
}
```
