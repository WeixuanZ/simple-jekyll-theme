/* W Zhang
 * For weixuanz.github.io
 */

/* Footer */
const license_notice = '<a href="/license">License and Privacy Notice</a>';
if (location.href.includes("about")) {
    $( "#copyleft" ).html(license_notice);
} else if (location.href.includes("license") === false) {
    $( "#main-footer" ).hover(
        function() {
            $( "#copyleft" ).fadeOut(150, function() {
                $(this).html(license_notice).fadeIn(150);
            });
        }, function() {
            $( "#copyleft" ).fadeOut(150, function() {
                $(this).html('Copyleft <span style="display: inline-block; transform: rotate(180deg);">&copy;</span> 2020 W Zhang').fadeIn(150);
            });
    });
} ;


/* Code Copy
 * Modified, from https://stackoverflow.com/a/48078807/10365842
 */
let allCodeBlocksElements = $( "div.highlighter-rouge" );
allCodeBlocksElements.each(function(i) {
    let currentId = `codeblock${i + 1}`;
    $("code").attr('id', currentId);
    let clipButton = `<button class="code-copy-btn" data-clipboard-target="#${currentId}"><i class="fas fa-clone"></i>`;
    $("code").after(clipButton);
});
let clipboard = new ClipboardJS('.code-copy-btn');
clipboard.on('success', e => {
    console.log('Action:', e.action);
    console.log('Text:', e.text);
});
clipboard.on('error', e => {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
    console.log(e);
});


// Dark Toggle

let is_dark = window.matchMedia('(prefers-color-scheme)').matches && window.matchMedia("(max-width: 1000px)").matches;
let maxScroll = 0;
let minScroll = 0;
const dark_style = '<link rel="stylesheet" type="text/css" href="/assets/css/dark.css">';

if (is_dark) {
    $( 'head' ).append(dark_style)      
}

function toggle() {
    if (maxScroll < 2 * nav_init) {
        if (document.documentElement.scrollTop >= 0 && minScroll < -40) {
            if (is_dark) {
                $( 'head link' ).last().remove();
                is_dark = false;
            } else {
                $( 'head' ).append(dark_style);
                is_dark = true;
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
