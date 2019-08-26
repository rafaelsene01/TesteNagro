class PessoaController {
  async index(req, res) {
    return res.json({ ok: 'Ok' });
  }

  async store(req, res) {
    return res.json({ ok: 'Ok' });
  }
}

export default new PessoaController();
