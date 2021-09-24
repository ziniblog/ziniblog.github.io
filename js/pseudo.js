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
                begin: /[A-Z]+|(?<=[A-Z])[0-9]|[0-9](?=[A-Z])/,
            },
            {
                className: 'doctag',
                begin: /[<>+|-▲▶▼◀]+/,
            },
        ],
    };
};

hljs.registerLanguage("pseudo", custom_pseudo_func)