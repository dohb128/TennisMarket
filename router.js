function route(pathname, handle, response, productId) {
    console.log('pathname : ' + pathname);

    if (typeof handle[pathname] === 'function') {
        // 핸들러가 productId를 쓰는지 확인
        if (pathname === '/order' && productId != undefined){
            handle[pathname](response, productId);
        } else {
            handle[pathname](response);
        }
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write('Not Found');
        response.end();
    }

}

exports.route = route;