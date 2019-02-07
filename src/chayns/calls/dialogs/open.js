import {chaynsCall} from '../../chaynsCall';
import {getCallbackName} from '../../callback';
import {propTypes} from '../../propTypes';
import {isDialogPermitted} from '../../../utils/isPermitted';

export function open(json, config = {}) {
    const callbackName = `openDialog_${json.callType}`;
    if(!isDialogPermitted()) {
        Promise.reject('chaynsCall not supported. New Dialogs are available in Web, android appVersion 5.833 and ios appVersion x.xxx');
    }
    return chaynsCall({
        'call': {
            'action': 184,
            'value': {
                'callback': getCallbackName(callbackName),
                'dialogContent': json,
                'showTabbar': config.showTabbar,
                'blur': config.blur,
                'externalDialogUrl': config.externalDialogUrl
            }
        },
        'app': {
            'support': {'android': 5833, 'ios': 5148}
        },
        callbackName,
        'propTypes': {
            'dialogContent': propTypes.object.isRequired
        }
    });
}
