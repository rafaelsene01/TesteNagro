import * as Yup from 'yup';
import Imovel from '../models/Imovel';

class ImovelController {
  async index(req, res) {
    const { _page = 1 } = req.query;
    const { growerId: grower_id } = req.query;

    const imoveis = await Imovel.findAll({
      where: { grower_id },
      page: _page,
      limit: 20,
      offset: (_page - 1) * 20,
      attributes: ['id', 'name', 'city', 'total_area'],
    });

    return res.json(imoveis);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      city: Yup.string().required(),
      total_area: Yup.number().required(),
      growerId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { growerId: grower_id } = req.body;

    const {
      id,
      name,
      city,
      total_area,
      grower_id: growerId,
    } = await Imovel.create({
      ...req.body,
      grower_id,
    });

    return res.json({ id, name, city, total_area, growerId });
  }
}

export default new ImovelController();
