export default class TextUtils {
    static capitalizeWords(str: string) {
        if (str && str.split('_').length > 1) return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        if (str && str.split(' ').length > 1) return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return str ? str.charAt(0).toUpperCase() +  str.slice(1): '';
    }
    static ipAddress = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    static macAddress = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
}
