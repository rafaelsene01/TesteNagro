import * as Yup from 'yup';
import Pessoa from '../models/Pessoa';

class PessoaController {
  async index(req, res) {
    const { _page = 1 } = req.query;

    const { count, rows: pessoas } = await Pessoa.findAndCountAll({
      page: _page,
      limit: 20,
      offset: (_page - 1) * 20,
      attributes: ['id', 'name', 'cpf'],
    });

    const nPages = Math.ceil(count / 20);

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

    return res.json({ id, name, cpf });
  }

  async delete(req, res) {
    const pessoa = await Pessoa.findByPk(req.params.id);

    if (!pessoa) {
      return res.status(400).json({ error: 'Pessoa already exists.' });
    }

    pessoa.destroy();

    return res.status(204).json();
  }
}

export default new PessoaController();
