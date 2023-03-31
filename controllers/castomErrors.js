const customCastErrorId = new Error('_id not found');
customCastErrorId.name = 'CastError';
customCastErrorId.path = '_id';

module.exports = { customCastErrorId };
