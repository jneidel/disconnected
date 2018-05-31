exports.create = async ( db, data ) => {
  const user = new db( data );
  const createdUser = await user.save();

  return createdUser._id;
};

exports.getAll = async db => {
  const rawData = await db.aggregate( [ { $match: {} } ] );

  const data = rawData.reduce( ( acc, cur ) => {
    const push = {};

    if ( cur.age )
      push.age = cur.age;
    if ( cur.startingAge )
      push.startingAge = cur.startingAge;
    if ( cur.silent )
      push.silent = cur.silent;
    if ( cur.suitable )
      push.suitable = cur.suitable;

    if ( Object.keys( push ) > 0 ) {
      acc.participants.push( push );
    }

    if ( cur.services )
      cur.services.forEach( service =>
        acc.services[service] = acc.services[service] ? acc.services[service] + 1 : 1 );

    return acc;
  }, { services: {}, participants: [] } );

  return data;
};

exports.listUsers = async ( db ) => {
  const rawData = await db.aggregate( [
    { $match: {} },
    {
      $sort: {
        timestamp: -1,
      },
    },
    { $project: {
      _id : 1,
      name: 1,
    } },
  ] );

  const data = rawData
    .filter( x => x.name )
    .map( x => {
      x.url = `stats?id=${x._id}`;
      return x;
    } );

  return data;
};

exports.getUser = async ( db, id ) => {
  const data = await db.findOne( { _id: id } );

  return data;
};
