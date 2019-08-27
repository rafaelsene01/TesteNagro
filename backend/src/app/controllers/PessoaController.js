import * as Yup from 'yup';
import Pessoa from '../models/Pessoa';

import Cache from '../../lib/Cache';

class PessoaController {
  async index(req, res) {
    const { _page = 1 } = req.query;

    const cacheKey = `pessoas:page:${_page}`;

    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const { count, rows: pessoas } = await Pessoa.findAndCountAll({
      page: _page,
      limit: 20,
      offset: (_page - 1) * 20,
      attributes: ['id', 'name', 'cpf'],
    });

    const nPages = Math.ceil(count / 20);

    await Cache.set(cacheKey, { nPages, pessoas });

    return res.json({ nPages, pessoas });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const pessoaExists = await Pessoa.findOne({ where: { cpf: req.body.cpf } });

    if (pessoaExists) {
      return res.status(400).json({ error: 'Pessoa already exists.' });
    }

    const { id, name, cpf } = await Pessoa.create(req.body);

    Cache.invalidatePrefix('pessoas');

    return res.json({ id, name, cpf });
  }

  async delete(req, res) {
    const pessoa = await Pessoa.findByPk(req.params.id);

    if (!pessoa) {
      return res.status(400).json({ error: 'Pessoa already exists.' });
    }

    pessoa.destroy();

    Cache.invalidatePrefix('pessoas');

    return res.status(204).json();
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const checkPessoa = await Pessoa.findByPk(req.params.id);

    if (checkPessoa.cpf !== req.body.cpf) {
      const cpfExists = await Pessoa.findOne({ where: { cpf: req.body.cpf } });

      if (cpfExists) {
        return res.status(400).json({ error: 'Pessoa already exists.' });
      }
    }

    const pessoa = await Pessoa.findByPk(req.params.id);

    await pessoa.update(req.body);

    const { id, name, cpf } = await Pessoa.findByPk(req.params.id);

    return res.json({ id, name, cpf });
  }
}

export default new PessoaController();
