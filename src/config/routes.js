
module.exports = app => {

    app.route('/cards')
        .post(app.src.api.creditCard.save)
        .get(app.src.api.creditCard.get)

    app.route('/cards/user/:id')
        .get(app.src.api.creditCard.getByCpf)

    app.route('/cards/:id')
        .put(app.src.api.creditCard.save)
        .get(app.src.api.creditCard.getByCard)
        .delete(app.src.api.creditCard.remove)
}