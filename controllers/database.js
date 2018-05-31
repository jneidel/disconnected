exports.create = async ( db, data ) => {
  const user = new db( data );
  const createdUser = await user.save();

  return createdUser._id;
};

exports.getAll = async db => {
  const rawData = await db.aggregate( [ { $match: {} } ] );

  const data = rawData.reduce( ( acc, cur ) => {
    if ( cur.age && cur.startingAge && cur.silent && cur.suitable )
      acc.participants.push( {
        age        : cur.age,
        startingAge: cur.startingAge,
        silent     : cur.silent,
        suitable   : cur.suitable,
      } );
    else if ( cur.age && cur.startingAge && cur.silent )
      acc.participants.push( {
        age        : cur.age,
        startingAge: cur.startingAge,
        silent     : cur.silent,
      } );
    else if ( cur.age && cur.startingAge )
      acc.participants.push( {
        age        : cur.age,
        startingAge: cur.startingAge,
      } );

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
