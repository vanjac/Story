language = {
    "Types": [
        {
            "name": "Anything",
            "color": "#00FF00",
            "allowedTypeGroup": "GAnything"
        },
        {
            "name": "Nothing",
            "color": "#000000",
            "allowedTypeGroup": "GNothing"
        },
        {
            "name": "Number",
            "color": "#0000FF",
            "allowedTypeGroup": "GNumber"
        },
        {
            "name": "Text",
            "color": "#FF00FF",
            "allowedTypeGroup": "GText"
        },
        {
            "name": "Condition",
            "color": "#FFFF00",
            "allowedTypeGroup": "GCondition"
        }
    ],
    "TypeGroups": [
        {
            "id": "GAnything",
            "expr": "all"
        },
        {
            "id": "GNothing",
            "expr": "Nothing"
        },
        {
            "id": "GNumber",
            "expr": "Number"
        },
        {
            "id": "GText",
            "expr": "Text"
        },
        {
            "id": "GCondition",
            "expr": "Condition"
        }
    ],
    "Categories": [
        {
            "name": "Control",
            "color": "#FFFF00"
        },
        {
            "name": "Math",
            "color": "#00FF00"
        },
        {
            "name": "Logic",
            "color": "#0000FF"
        },
        {
            "name": "Variables",
            "color": "#FF0000"
        }
    ],
    "Commands": [
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Control",
            "returnType": "Nothing",
            "BasePhrase": {
                "keyword": "if",
                "Parts": [
                    {
                        "id": "condition",
                        "name": "Condition",
                        "type": "Condition"
                    },
                    {
                        "text": "then"
                    },
                    {
                        "id": "command",
                        "name": "Command",
                        "type": "Nothing"
                    }
                ]
            },
            "OptionalPhrases": [
                {
                    "shortDescription": "",
                    "longDescription": "",
                    "allowedRule": "!otherwise",
                    "keyword": "otherwise",
                    "Parts": [
                        {
                            "id": "else-command",
                            "name": "Command",
                            "type": "Nothing"
                        }
                    ]
                }
            ]
        }
    ]
};

