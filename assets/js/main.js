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


/* Dark Toggle
 * Modified from https://www.kooslooijesteijn.net/blog/add-dark-mode-to-website
 */

const toggle_label = document.querySelector('#dark-toggle-label');
window.addEventListener('scroll', function () {
    if (this.scrollY >= nav_init) {
        toggle_label.classList.add('hidden');
    } else {
        toggle_label.classList.remove('hidden');
    }
})
const root = document.documentElement
const checkbox = document.querySelector('#dark-toggle-box');
checkbox.addEventListener( 'change', function() {
    if(this.checked) {
        root.classList.add('theme-dark');
    } else {
        root.classList.remove('theme-dark');
    }
});


