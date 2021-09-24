/*
Language: Pseudo
Description: My custom for pseudo code
Website: None
Category: common
*/

var custom_pseudo_func = function(hljs) {
    return {
        aliases: ['zini'],
        contains: [
            {
                className: 'comment',
                begin: /#/,
                end: /\s\s|\n|$/,
            },
            {
                className: 'strong',
                begin: /\b[A-Z][A-Z0-9]*\b/,
            },
            {
                className: 'number',
                begin: /\b[0-9]+\b/,
            },
            {
                className: 'doctag',
                begin: /[<>=^*+|▲▶▼◀-]+/,
            },
        ],
    };
};

hljs.registerLanguage("pseudo", custom_pseudo_func)