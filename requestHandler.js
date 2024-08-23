const fs = require('fs');
const main_view = fs.readFileSync('./main.html');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf8');

const mariadb = require('./database/connect/mariadb.js');

// main page
function main(response) {
    console.log('main');

    mariadb.query("SELECT * FROM product", function (err, rows) {
        console.log(rows);
    });

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(main_view);
    response.end();
}

//orderlist page
function orderlist(response) {
    console.log('orderlist');

    mariadb.query("SELECT * FROM orderlist", function (err, rows) {
        console.log(rows);

        let rowsHtml = '';
        rows.forEach((row, index) => {
            rowsHtml += `<tr>
                            <td>${index + 1}</td>
                            <td>${row.product_id}</td>
                            <td>${row.order_date}</td>
                        </tr>`;
        });

        // Replace placeholder with actual rows in the template
        let orderlist_html = orderlist_view.replace('{{orderRows}}', rowsHtml);

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(orderlist_html);
        response.end();
    });
}

//red racket img 
function RedRacket(response) {
    const data = fs.readFileSync('./img/redRacket.png');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
}

//blue racket img 
function BlueRacket(response) {
    const data = fs.readFileSync('./img/blueRacket.png');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
}

//black racket img 
function BlackRacket(response) {
    const data = fs.readFileSync('./img/blackRacket.png');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
}

// css
function css(response) {
    fs.readFile('./market.css', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/css' });
        response.write(data);
        response.end();
    });
}

// order button
function order(response, productId) {
    response.writeHead(200, { 'Content-Type': 'text/html' });

    mariadb.query("INSERT INTO orderlist VALUES (" + productId + ", '" + new Date().toLocaleDateString() + "');", function (err, rows) {
        console.log(rows);
    });

    response.write('order success');
    response.end();
}

let handle = {};    //key:value
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist.html'] = orderlist;

/* image directory */
handle['/img/redRacket.png'] = RedRacket;
handle['/img/blueRacket.png'] = BlueRacket;
handle['/img/blackRacket.png'] = BlackRacket;

/* css directory */
handle['/market.css'] = css;

exports.handle = handle;
