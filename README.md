<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [TNEU APIs *](#tneu-apis-)
- [API](#api)
  - [:100: Scores](#100-scores)
    - [Auth](#auth)
    - [Get](#get)
  - [:newspaper: News](#newspaper-news)
    - [Get](#get-1)
- [Development](#development)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# TNEU APIs [![Build Status](https://travis-ci.org/vladgolubev/tneu-api.svg?branch=master)](https://travis-ci.org/vladgolubev/tneu-api)
The home for TNEU APIs.

# API
## :100: Scores

The purpose of this endpoint is to provide a simple interface to get the students' scores from [mod.tanet](http://mod.tanet.edu.te.ua).

### Auth

__Request__: `/act?role=scores&cmd=auth&username=***&password=***`

__Response__:

Access token to make further requests
```json
{ "token": "9civebg8kcebkmq4q4qounrhd4" }
```

### Get

__Request__: `/act?role=scores&cmd=get&token=***`

__Response__:

```javascript
{
    "name": "Плішко Іван Володимирович",
    "group": "СДМК-91",
    "semesters": [ // Array of 2 elements
        [{ // Each element is an array of subjects in current semester
            "name": "Гроші та кредит",
            "controlType": "Екзамен",
            "totalScore": 90,
            "modules": [{
                "weight": 20,
                "date": "05.11.15",
                "score": 90
            }, /* ... */ ]
        }, /* ... */ ],
        [{
            "name": "Іноземна мова",
            "controlType": "Залік",
            "totalScore": 92,
            "modules": [{
                "weight": 30,
                "date": "23.10.15",
                "score": 92
            }, /* ... */ ]
        }, /* ... */ ]
    ]
}
```

In case of incorrect arguments you'll recieve a meaningful response explaining which arguments haven't passed the validation.

## :newspaper: News
### Get

To be done

# Development

In order to run in locally, follow these steps:

1. `git clone git@github.com:vladgolubev/tneu-api.git`
2. `cd tneu-api`
3. `docker build -t tneu-api .`
4. `docker run -p 9101:9101 tneu-api`
