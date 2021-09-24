/*
Language: Pseudo
Description: My custom for pseudo code
Website: None
Category: common
*/

var custom_pseudo_func = function(hljs) {
    return {
        aliases: ['ps'],
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
                begin: /[-+*/><=!^ṿ\\]+/,
            },
        ],
    };
};

hljs.registerLanguage("pseudo", custom_pseudo_func)