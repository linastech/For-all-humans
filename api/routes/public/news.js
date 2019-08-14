const DB = require('@DB')
const faker = require('faker')

module.exports = (Router) => {
  Router.get('/news/get-articles', async (req, res, next) => {
    DB.news
      .findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
        limit: 10
      })
      .then(response => res.status(200).json(response))
      .catch(error => res.status(400).send(error))
  })

  Router.get('/news/get-article/:slug', async (req, res, next) => {
    DB.news
      .findOne({
        where: {slug: req.params.slug}
      })
      .then(response => res.status(200).json(response))
      .catch(error => res.status(400).send(error))
  })

  Router.get('/news/generate-fake/:amount', async (req, res, next) => {var emails = {};
    const data = []
    const title = faker.fake("{{lorem.sentence}}")
    
    for (var i = 0; i < req.params.amount; i++) {
      data.push({
        title: title,
        content: faker.fake("{{lorem.paragraphs}}"),
        author: faker.random.number(),
        image: '/static/assets/img/blog-posts/temp.png',
        slug: faker.random.number()+'-'+faker.helpers.slugify(title),
      })
    }

    DB.news.bulkCreate(data)

    res.end('Inserted: '+req.params.amount)
  })
 
  return this 
}