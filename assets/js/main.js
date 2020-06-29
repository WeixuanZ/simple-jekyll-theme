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
};


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
 * Modified, from https://gist.github.com/kslstn/20f654fd27eb29619040c74fa6526919
 */

(function initializeTheme(){
    syncBetweenTabs()
    listenToOS()
    listenToCheckbox()
    hideCheckbox()

    updatePref(
        storedPref() ||
        OSPref(),
        false
    )
}())

// Helper functions

function currentPref() {
    return (document.querySelector('#dark-toggle-box').checked) ? 'dark' : 'light';
}

function OSPref() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function storedPref() {
    const pref = localStorage.getItem('preference-theme')
    const lastChanged = localStorage.getItem('preference-theme-last-change')
    let now = new Date()
    const minutesPassed = (now.getTime() - lastChanged)/(1000*60)

    if (minutesPassed < 120 && pref === "light") return 'light'
    else if (minutesPassed < 120 && pref === "dark") return 'dark'
    else return undefined
}

function updateCheckbox(pref) {
    document.querySelector('#dark-toggle-box').checked = (pref === 'dark');
}

function savePref(key, value){
    let now = new Date();
    now = now.getTime();
    localStorage.setItem(key, value);
    localStorage.setItem(key+"-last-change", now);
}


function updatePref(newPref, withTransition = false, save = true, override = false){
    const root = document.documentElement
    if ((currentPref() === 'dark' || override) && newPref === 'light') {
        root.classList.remove('theme-dark');
        updateCheckbox('light');
    } else if ((currentPref() === 'light' || override) && newPref === 'dark') {
        root.classList.add('theme-dark');
        updateCheckbox('dark');
    }
    if (save) savePref('preference-theme', newPref);
}


// Event Listeners

function hideCheckbox() {
    const toggle_label = document.querySelector('#dark-toggle-label');
    window.addEventListener('scroll', function () {
        if (this.scrollY >= nav_init) {
            toggle_label.classList.add('hidden');
        } else {
            toggle_label.classList.remove('hidden');
        }
    })
}

function syncBetweenTabs(){
    window.addEventListener('storage', (e) => {
        if (e.key === 'preference-theme'){
            if (e.newValue === 'light') updatePref('light', true, false)
            else if (e.newValue === 'dark') updatePref('dark', true, false)
        }
    })
}

function listenToOS(){
    let mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQueryList.addListener( (m)=> {
        if (m.matches !== true) {
            updatePref('light', true)
        } else {
            updatePref('dark', true)
        }
    })
}

function listenToCheckbox(){
    const checkbox = document.querySelector('#dark-toggle-box');
    checkbox.addEventListener('change', function() {
        if(this.checked) {
            updatePref('dark', true, true, true);
        } else {
            updatePref('light', true, true, true);
        }
    })
}
