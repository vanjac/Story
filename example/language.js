{
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
            "expr": "all-Nothing"
        },
        {
            "id": "GNothing",
            "expr": "Nothing"
        },
        {
            "id": "GNumber",
            "expr": "Number|Anything"
        },
        {
            "id": "GText",
            "expr": "Text|Anything"
        },
        {
            "id": "GCondition",
            "expr": "Condition|Anything"
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
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Control",
            "returnType": "Nothing",
            "BasePhrase": {
                "keyword": "while",
                "Parts": [
                    {
                        "id": "condition",
                        "name": "Condition",
                        "type": "Condition"
                    },
                    {
                        "text": "do"
                    },
                    {
                        "id": "command",
                        "name": "Command",
                        "type": "Nothing"
                    }
                ]
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Control",
            "returnType": "Nothing",
            "BasePhrase": {
                "keyword": "until",
                "Parts": [
                    {
                        "id": "condition",
                        "name": "Condition",
                        "type": "Condition"
                    },
                    {
                        "text": "do"
                    },
                    {
                        "id": "command",
                        "name": "Command",
                        "type": "Nothing"
                    }
                ]
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Control",
            "returnType": "Nothing",
            "BasePhrase": {
                "keyword": "repeat",
                "Parts": [
                    {
                        "id": "command",
                        "name": "Command",
                        "type": "Command"
                    },
                    {
                        "text": "for"
                    },
                    {
                        "id": "number",
                        "name": "Number",
                        "type": "Number"
                    },
                    {
                        "text": "times"
                    }
                ]
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Control",
            "returnType": "Nothing",
            "BasePhrase": {
                "keyword": "wait",
                "Parts": [
                    {
                        "id": "number",
                        "name": "Number",
                        "type": "Number"
                    },
                    {
                        "text": "seconds"
                    }
                ]
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Control",
            "returnType": "Nothing",
            "BasePhrase": {
                "keyword": "then",
                "Parts": [
                    {
                        "id": "command2",
                        "name": "Second Command",
                        "type": "Nothing"
                    }
                ]
            },
            "PrecedingArgument": {
                "name": "First Command",
                "type": "Nothing"
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Control",
            "returnType": "Text",
            "BasePhrase": {
                "keyword": "as text",
                "Parts": [ ]
            },
            "PrecedingArgument": {
                "name": "Value",
                "type": "Anything"
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Control",
            "returnType": "Number",
            "BasePhrase": {
                "keyword": "as number",
                "Parts": [ ]
            },
            "PrecedingArgument": {
                "name": "Value",
                "type": "Anything"
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Logic",
            "returnType": "Condition",
            "BasePhrase": {
                "keyword": "not",
                "Parts": [
                    {
                        "id": "condition",
                        "name": "Condition",
                        "type": "Condition"
                    }
                ]
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Logic",
            "returnType": "Condition",
            "BasePhrase": {
                "keyword": "and",
                "Parts": [
                    {
                        "id": "b",
                        "name": "b",
                        "type": "Condition"
                    }
                ]
            },
            "PrecedingArgument": {
                "name": "a",
                "type": "Condition"
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Logic",
            "returnType": "Condition",
            "BasePhrase": {
                "keyword": "or",
                "Parts": [
                    {
                        "id": "b",
                        "name": "b",
                        "type": "Condition"
                    }
                ]
            },
            "PrecedingArgument": {
                "name": "a",
                "type": "Condition"
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Logic",
            "returnType": "Condition",
            "BasePhrase": {
                "keyword": "=",
                "Parts": [
                    {
                        "id": "b",
                        "name": "b",
                        "type": "Anything"
                    }
                ]
            },
            "PrecedingArgument": {
                "name": "a",
                "type": "Anything"
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Logic",
            "returnType": "Condition",
            "BasePhrase": {
                "keyword": "<>",
                "Parts": [
                    {
                        "id": "b",
                        "name": "b",
                        "type": "Anything"
                    }
                ]
            },
            "PrecedingArgument": {
                "name": "a",
                "type": "Anything"
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Math",
            "returnType": "Number",
            "BasePhrase": {
                "keyword": "+",
                "Parts": [
                    {
                        "id": "b",
                        "name": "b",
                        "type": "Number"
                    }
                ]
            },
            "PrecedingArgument": {
                "name": "a",
                "type": "Number"
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Math",
            "returnType": "Number",
            "BasePhrase": {
                "keyword": "-",
                "Parts": [
                    {
                        "id": "b",
                        "name": "b",
                        "type": "Number"
                    }
                ]
            },
            "PrecedingArgument": {
                "name": "a",
                "type": "Number"
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Math",
            "returnType": "Number",
            "BasePhrase": {
                "keyword": "*",
                "Parts": [
                    {
                        "id": "b",
                        "name": "b",
                        "type": "Number"
                    }
                ]
            },
            "PrecedingArgument": {
                "name": "a",
                "type": "Number"
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Math",
            "returnType": "Number",
            "BasePhrase": {
                "keyword": "/",
                "Parts": [
                    {
                        "id": "b",
                        "name": "b",
                        "type": "Number"
                    }
                ]
            },
            "PrecedingArgument": {
                "name": "a",
                "type": "Number"
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Math",
            "returnType": "Condition",
            "BasePhrase": {
                "keyword": "<",
                "Parts": [
                    {
                        "id": "b",
                        "name": "b",
                        "type": "Number"
                    }
                ]
            },
            "PrecedingArgument": {
                "name": "a",
                "type": "Number"
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Math",
            "returnType": "Condition",
            "BasePhrase": {
                "keyword": ">",
                "Parts": [
                    {
                        "id": "b",
                        "name": "b",
                        "type": "Number"
                    }
                ]
            },
            "PrecedingArgument": {
                "name": "a",
                "type": "Number"
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Math",
            "returnType": "Condition",
            "BasePhrase": {
                "keyword": "<=",
                "Parts": [
                    {
                        "id": "b",
                        "name": "b",
                        "type": "Number"
                    }
                ]
            },
            "PrecedingArgument": {
                "name": "a",
                "type": "Number"
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Math",
            "returnType": "Condition",
            "BasePhrase": {
                "keyword": ">=",
                "Parts": [
                    {
                        "id": "b",
                        "name": "b",
                        "type": "Number"
                    }
                ]
            },
            "PrecedingArgument": {
                "name": "a",
                "type": "Number"
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Variables",
            "returnType": "Nothing",
            "BasePhrase": {
                "keyword": "set",
                "Parts": [
                    {
                        "id": "variable",
                        "name": "Variable",
                        "type": ""
                    },
                    {
                        "text": "to"
                    },
                    {
                        "id": "value",
                        "name": "Value",
                        "type": "Anything"
                    }
                ]
            },
            "OptionalPhrases": [ ]
        },
        {
            "shortDescription": "",
            "longDescription": "",
            "category": "Variables",
            "returnType": "Anything",
            "BasePhrase": {
                "keyword": "variable",
                "Parts": [
                    {
                        "id": "variable",
                        "name": "Variable",
                        "type": ""
                    }
                ]
            },
            "OptionalPhrases": [ ]
        }
    ]
}
