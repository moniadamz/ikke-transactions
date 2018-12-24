module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.src.api.validator;

    const save = async (req, res) => {
        const card = { ...req.body };
        
        if (req.params.id) card.cpf = req.params.id;
        try {
            existsOrError(card.cpf, 'CPF não informado.')
            existsOrError(card.brand, 'Bandeira não informada.');
            existsOrError(card.expiration_date, 'Validade não informada.');
            existsOrError(card.code, 'Código do cartão não informado.')
        } catch (msg) {
            return res.status(400).send(msg);
        }


        if (card.id) {
            app.db('card')
                .update(card)
                .where({ cpf: card.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        } else {
            app.db('card')
                .insert(card)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
    }

    const get = (req, res) => {
        app.db('card')
            .select('cpf', 'credit', 'expiration_date', 'brand', 'code')
            .then(card => res.json(card))
            .catch(err => res.status(500).send(err))
    }

    const getByCpf = (req, res) => {
        app.db('card')
            .select('cpf', 'credit', 'expiration_date', 'brand', 'code')
            .where({ cpf: req.params.id })
            .first()
            .then(card => res.json(card))
            .catch(err => res.status(500).send(err))
    }

    const getByCard = (req, res) => {
        app.db('card')
            .select('cpf', 'credit', 'expiration_date', 'brand', 'code')
            .where({ code: req.params.id })
            .first()
            .then(card => res.json(card))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        app.db('cards')
            .where({ code: req.params.id })
            .then(res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getByCpf, getByCard, remove };
}