const boom = require('boom')
module.exports = {
  allowAdmin: function(req, res, next) {
    if (req.decoded.role === 'admin') {
      next()
    } else {
      next(boom.unauthorized('Admin only'))
    }
  },
  isSelf: function(req, res, next) {
    if (req.decoded.userId == req.params.id) {
      next()
    } else {
      next(boom.unauthorized('Only user with same id allowed'))
    }
  },
  dontAllowAdmin : function (req,res,next) {
    if (req.decoded.role === 'admin') {
      next(boom.forbidden('Admin role cant do this action'))
    } else {
      next()
      
    }
  },
  isSelfOrAdmin: function(req, res, next) {
    this.isAdmin(req, res, err => {
      if (boom.isBoom(err)) {
        this.isSelf(req, res, next)
      } else {
        next()
      }
    })
  }
}