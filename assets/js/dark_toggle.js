var is_dark = window.matchMedia('(prefers-color-scheme)').matches;
var maxScroll = 0;
var minScroll = 0;
const dark_style = '<link rel="stylesheet" type="text/css" href="/assets/css/dark.css">';

// if (is_dark) {
//     $( 'head' ).append(dark_style)      
// }

function toggle() {
    if (maxScroll < 2 * nav_init) {
        if (document.documentElement.scrollTop >= 0 && minScroll < -40) {
            if (is_dark) {
                $( 'head link' ).last().remove();
            } else {
                $( 'head' ).append(dark_style);
            };
            minScroll = 0;
            maxScroll = 0;
        };
        minScroll = Math.min(document.documentElement.scrollTop, minScroll);
        maxScroll = Math.max(document.documentElement.scrollTop, maxScroll);
    } else {
        $( '#toggle-indicator' ).remove();
    };
};

$( window ).on('scroll', toggle);
