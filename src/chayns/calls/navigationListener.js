import {chaynsCall} from '../chaynsCall';
import {getCallbackName} from '../callback';
import {propTypes} from '../propTypes';

const listeners = [];

function _setNavigation(enabled) {
    const callbackName = 'setNavigationChange';

    return chaynsCall({
        'call': {
            'action': 198,
            'value': {
                'callback': getCallbackName(callbackName),
                'disableLinks': !enabled,
                'disableUnload': !enabled
            }
        },
        'web': true,
        callbackName,
        'callbackFunction': (data) => {
            const redirect = () => {
                _setNavigation(true);

                chayns.selectTapp({ 'id': data.tappId || 0 });
            };

            for (let i = 0, l = listeners.length; i < l; i++) {
                listeners[i](data, redirect);
            }
        },
        'propTypes': {
            'enabled': propTypes.boolean.isRequired,
            'callback': propTypes.string.isRequired,
            'apiVersion': propTypes.number.isRequired
        }
    });
}

export function addNavigationListener(cb) {
    if (listeners.length === 0) {
        _setNavigation(false);
    }

    listeners.push(cb);
    return true;
}

export function removeNavigationListener(cb) {
    let index = listeners.indexOf(cb);
    if (index !== -1) {
        listeners.splice(index, 1);
    }

    if (listeners.length === 0) {
        _setNavigation(true);
    }

    return index !== -1;
}
