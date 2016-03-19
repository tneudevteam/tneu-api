<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [TNEU APIs](#tneu-apis)
- [API](#api)
  - [Scores](#scores)
    - [Auth](#auth)
    - [Get](#get)
  - [News](#news)
    - [Get](#get-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# TNEU APIs
The home for TNEU APIs.

# API
## Scores
### Auth

__Request__: `/act?role=scores&cmd=auth&username=***&password=***`

__Response__:

Access token to make further requests
```json
{
  "success": true,
  "token": "9civebg8kcebkmq4q4qounrhd4"
}
```

### Get

__Request__: `/act?role=scores&cmd=get&token=***`

__Response__:

To be done

## News
### Get
