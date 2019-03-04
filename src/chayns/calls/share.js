import {chaynsCall} from '../chaynsCall';
import {propTypes} from '../propTypes';
import {getCallbackName} from '../callback';


export function getAvailableSharingServices() {
    const callbackName = 'getAvailableSharingServices';

    return chaynsCall({
        'call': {
            'action': 79,
            'value': {
                'callback': getCallbackName(callbackName)
            }
        },
        'app': {
            'support': {'android': 4808, 'ios': 4380}
        },
        'myChaynsApp': {
            'support': {'android': 4808, 'ios': 4380}
        },
        'web': false,
        callbackName
    });
}

export const sharingApp = {
    'MAIL': 0,
    'WHATSAPP': 1,
    'FACEBOOK': 2,
    'FACEBOOK_MESSENGER': 3,
    'GOOGLE_PLUS': 4,
    'TWITTER': 5
};

export function share(value) {

    return chaynsCall({
        'call': {
            'action': 80,
            value
        },
        'app': {
            'support': {'android': 4808, 'ios': 4380}
        },
        'myChaynsApp': {
            'support': {'android': 4808, 'ios': 4380}
        },
        'web': false,
        'propTypes': {
            'title': propTypes.string,
            'text': propTypes.string.isRequired,
            'imageUrl': propTypes.string,
            'sharingApp': propTypes.number,
            'sharingAndroidApp': propTypes.string
        }
    });
}
