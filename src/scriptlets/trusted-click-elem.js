import {
    hit,
    toRegExp,
} from '../helpers/index';

/* eslint-disable max-len */
/**
 * @scriptlet trusted-click-elem
 *
 * @description
 * Clicks selected elements in a given order, waiting for them to render in the DOM first.
 *
 * **Syntax**
 * ```
 * example.com#%#//scriptlet('trusted-click-elem', '.container > #target, .container > #target2', 'hrefpart', '/cookiepart/')
 * ```
 *
 * - `selectors` — required, string with query selectors delimited by comma.
 * - `hrefMatch` - optional, string match page url, defaults to matching any url
 * - `cookieMatch` - optional, string or regex to match cookies, defaults to ignoring cookies
 *
 * **Examples**
 * 1. Click elements by selector
 * ```
 * example.com#%#//scriptlet('trusted-click-elem', 'button[name='agree']')
 * ```
 * 2. Click multiple elements by selector and matching href of a page
 * ```
 * example.com#%#//scriptlet('trusted-click-elem', 'button[name='agree'], button[name='check], input[type="submit"][value="akkoord"]', '/cookie wall')
 * ```
 * 3. Click multiple elements by selector and matching cookies string of a page
 * ```
 * example.com#%#//scriptlet('trusted-click-elem', 'button[name='agree'], input[type="submit"][value="akkoord"]', '', '/(?=(?:.*\d){3})/')
 * ```
 */
/* eslint-enable max-len */

export function trustedClickElem(source, selectors, hrefMatch, cookieMatch) {
    const OBSERVER_TIMEOUT = 5000;
    const SELECTORS_DELIMITER = ',';

    let hrefMatched = true;
    let cookieMatched = true;
    if (hrefMatch) {
        hrefMatched = window.location.href.indexOf(hrefMatch) !== -1;
    }
    if (cookieMatch) {
        const cookieRegex = toRegExp(cookieMatch);
        cookieMatched = cookieRegex.test(window.location.href);
    }
    if (!hrefMatched || !cookieMatched) {
        return;
    }

    // Parse selectors argument and set the first one as current
    const selectorsQueue = selectors
        .split(SELECTORS_DELIMITER)
        .map((selector) => selector.trim());
    let currentSelector = selectorsQueue.shift();

    const clickHandler = (mutations, observer) => {
        const target = document.querySelector(currentSelector);
        if (!target) {
            return;
        }
        // Click the element and set next selector from queue
        target.click();
        currentSelector = selectorsQueue.shift();
        // Disconnect observer and call hit after all elements have been clicked
        if (!currentSelector) {
            observer.disconnect();
            hit(source);
        }
    };

    // eslint-disable-next-line compat/compat
    const observer = new MutationObserver(clickHandler);
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });

    setTimeout(observer.disconnect, OBSERVER_TIMEOUT);
}

trustedClickElem.names = [
    'trusted-click-elem',
];

trustedClickElem.injections = [
    hit,
    toRegExp,
];
