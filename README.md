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

The purpose of this endpoint is to provide a simple interface to get the students' scores from [mod.tanet](http://mod.tanet.edu.te.ua).

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

```javascript
{
    "success": true,
    "response": {
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
}
```

In case of error additional `error` property will be present.

In case of incorrect arguments you'll recieve a meaningful response explaining which arguments haven't passed the validation.

## News
### Get

To be done
