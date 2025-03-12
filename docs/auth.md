# Auth API Spec

## Register User

Endpoint: POST /api/auth/register

Request Body:

```json
{
  "username": "Natra",
  "password": "rahasia",
  "name": "Rafly Natra"
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
    "message": "Username must not be empty, ...."
  }
}
```

## Login User

Endpoint: POST /api/auth/login

Request Body:

```json
{
  "username": "Natra",
  "password": "rahasia"
}
```

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
    "message": "Username or password is invalid, ...."
  }
}
```

## Logout User

Endpoint: DELETE /api/auth/logout

Request Header:

- token: token

Response Body (Success):

```json
{
  "data": null
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
