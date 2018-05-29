exports.create = async ( db, data ) => {
  const user = new db( data );
  const createdUser = await user.save();

  return createdUser._id;
};

exports.getAll = async db => {
  const rawData = await db.aggregate( [
    { $match: {} },
    { $project: {
      _id        : 0,
      age        : 1,
      gender     : 1,
      startingAge: 1,
      time       : 1,
      timestamp  : 1,
    } },
  ] );

  const data = rawData.reduce( ( acc, cur ) => {
    if ( cur.age )
      acc.ages.push( cur.age );

    if ( cur.startingAge )
      acc.startingAges.push( cur.startingAge );

    if ( cur.time )
      acc.times.push( cur.time );

    if ( cur.gender !== null )
      acc.genders[cur.gender === true ? "male" : "female"]++;

    return acc;
  }, { ages: [], genders: { male: 0, female: 0 }, startingAges: [], times: [] } );

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

  const data = rawData.map( x => {
    x.url = `stats?id=${x._id}`;
    return x;
  } );

  return data;
};

exports.getUser = async ( db, id ) => {
  const data = await db.findOne( { _id: id } );

  return data;
};
