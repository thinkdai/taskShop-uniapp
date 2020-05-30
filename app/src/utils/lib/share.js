import { extend } from './common';
// import cache from './cache';

// import { getUserInfo } from '@/models/globalModel';

function Share() {

}

function getCurrentPageWithArgs() {
    // let userInfo = getUserInfo();
        // salesID = cache.get('sales_man_id');
    let pages = getCurrentPages(),
        currPage = pages[pages.length - 1],
        url = currPage.route,
        options = currPage.options;
    let urlWithArgs = `/${url}?`;
    for (let key in options) {
        let value = options[key];
        urlWithArgs += `${key}=${value}&`;
    }
    // urlWithArgs += `u_id=${userInfo.id}&s_id=${salesID}`;
    // urlWithArgs += `u_id=${userInfo.id}`;
    return urlWithArgs;
}

Share.extend = function(copy) {
    return extend(this, copy);
};

/* 分享静态方法 */
Share.share = function(title, path, imageUrl) {
    let url;
        // userInfo = getUserInfo();
        // salesID = cache.get('sales_man_id');
    if (!path) url = getCurrentPageWithArgs();
    // else url = `${path + (path.indexOf('?') > -1 ? '&' : '?')}u_id=${(userInfo && userInfo.id) || ''}&s_id=${salesID}`;
    else url = `${path}`;
    return {
        title: title,
        imageUrl: imageUrl || '',
        path: url || ''
    };
};

export default Share;
