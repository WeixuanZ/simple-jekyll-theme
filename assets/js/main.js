/**
 * @preserve W Zhang
 * For weixuanz.github.io
 */

/* Dark Toggle
 * Modified, from https://gist.github.com/kslstn/20f654fd27eb29619040c74fa6526919
 */

;(function initializeTheme() {
  syncBetweenTabs()
  listenToOS()
  listenToCheckbox()
  hideCheckbox()

  updatePref(storedPref() || OSPref(), false)
})()

// Helper Functions

function currentPref() {
  return document.querySelector('#dark-toggle-box').checked ? 'dark' : 'light'
}

function OSPref() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function storedPref() {
  const pref = localStorage.getItem('preference-theme')
  if (pref === 'light') return 'light'
  else if (pref === 'dark') return 'dark'
  else return undefined
}

function updateCheckbox(pref) {
  document.querySelector('#dark-toggle-box').checked = pref === 'dark'
}

function savePref(key, value) {
  localStorage.setItem(key, value)
}

function updatePref(
  newPref,
  withTransition = true,
  save = true,
  override = false
) {
  const root = document.documentElement
  const els = elsRequireTransit([
    'body',
    '#navbar',
    '#main-header',
    'code',
    '#blog-list-mini',
    '.card',
    '#toc'
  ])
  if ((currentPref() === 'dark' || override) && newPref === 'light') {
    if (withTransition) toggleTransition(els)
    root.classList.remove('theme-dark')
    navbar.style.background = '#fff'
    updateCheckbox('light')
    if (withTransition)
      setTimeout(() => {
        toggleTransition(els, false)
      }, 1000)
  } else if ((currentPref() === 'light' || override) && newPref === 'dark') {
    if (withTransition) toggleTransition(els)
    root.classList.add('theme-dark')
    navbar.style.background = '#000'
    updateCheckbox('dark')
    if (withTransition)
      setTimeout(() => {
        toggleTransition(els, false)
      }, 1000)
  }
  if (save) savePref('preference-theme', newPref)
}

function toggleTransition(els, addTransit = true) {
  els.map((el) => {
    addTransit
      ? el.forEach((e) => e.classList.add('theme-transit'))
      : el.forEach((e) => e.classList.remove('theme-transit'))
  })
}

function elsRequireTransit(els) {
  return els.map((el) => document.querySelectorAll(el))
}

// Event Listeners

function hideCheckbox() {
  const navBtns = document.querySelector('#nav-btns')
  window.addEventListener('scroll', function () {
    if (this.scrollY >= nav_init) {
      navBtns.classList.add('transparent')
      if (currentPref() === 'dark') {
        navbar.style.background = '#151516cc'
      }
    } else {
      navBtns.classList.remove('transparent')
      if (currentPref() === 'dark') {
        navbar.style.background = '#000'
      }
    }
  })
}

function syncBetweenTabs() {
  window.addEventListener('storage', (e) => {
    if (e.key === 'preference-theme') {
      if (e.newValue === 'light') {
        updatePref('light', true, false)
      } else if (e.newValue === 'dark') {
        updatePref('dark', true, false)
      }
    }
  })
}

function listenToOS() {
  const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQueryList.addEventListener('change', (m) => {
    if (m.matches !== true) {
      updatePref('light')
    } else {
      updatePref('dark')
    }
  })
}

function listenToCheckbox() {
  const checkbox = document.querySelector('#dark-toggle-box')
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      updatePref('dark', true, true, true)
    } else {
      updatePref('light', true, true, true)
    }
  })
}

/* Code Copy
 * Modified, from  https://stackoverflow.com/a/48078807/10365842
 */
const allCodeBlocksElements = document.querySelectorAll('div.highlighter-rouge')
allCodeBlocksElements.forEach(function (el, i) {
  const currentId = `codeblock${i + 1}`
  el.querySelector('code').setAttribute('id', currentId)
  const clipButton = document.createElement('button')
  clipButton.innerHTML = '<svg class="icon"><use xlink:href="#icon-clone-solid"></use></svg>'
  clipButton.className = 'code-copy-btn'
  clipButton.setAttribute('data-clipboard-target', `#${currentId}`)
  clipButton.setAttribute('aria-label', `Copy ${currentId}`)
  el.querySelector('code').after(clipButton)
})
if (allCodeBlocksElements.length > 0) {
  new ClipboardJS('.code-copy-btn')
}

/* Share Button */
function share() {
  if (navigator.share !== undefined) {
    navigator
      .share({
        title: document.querySelector('.header').textContent,
        text: 'Check this out!',
        url: window.location.href
      })
      .then(() => console.log('Shared!'))
      .catch((e) => console.error(e))
  } else {
    const shareButton = document.querySelector('#share-btn')
    shareButton.setAttribute('data-clipboard-text', location.href)
    new ClipboardJS('#share-btn')
    shareButton.classList.add('shared')
    setTimeout(() => {
      shareButton.classList.remove('shared')
    }, 5000)
  }
}

const shareButton = document.querySelector('#share-btn')
if (shareButton) shareButton.addEventListener('click', share)

/* Dynamic TOC */
const toc = document.querySelector('#toc')
if (toc) {
  const tocItems = Array.from(toc.querySelectorAll('li'))
  const tocMapping = tocItems.map(function (item) {
    const anchor = item.querySelector('a')
    const targetID = anchor.getAttribute('href').slice(1)
    const target = document.getElementById(targetID)

    return {
      listItem: item,
      anchor: anchor,
      targetID: targetID,
      target: target,
      targetOffset: target.offsetTop
    }
  })

  function getCurrentSection(tocMapping) {
    return tocMapping.reduce((acc, val) =>
      window.pageYOffset + 70 > val.targetOffset ? val : acc
    )
  }

  function sectionUpdaterInit(initialSection = {}) {
    let currentSection = initialSection
    function wrapped(newSection) {
      if (newSection.targetID !== currentSection.targetID) {
        if (currentSection.targetID) {
          currentSection.anchor.classList.remove('active')
        }
        newSection.anchor.classList.add('active')
        currentSection = newSection
      }
    }
    return wrapped
  }

  const sectionUpdater = sectionUpdaterInit()
  window.addEventListener('scroll', () =>
    sectionUpdater(getCurrentSection(tocMapping))
  )
}
