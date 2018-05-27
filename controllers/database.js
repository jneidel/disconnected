exports.add = ( db, userId, key, value ) =>
  db.findOneAndUpdate( { _id: userId }, { $set: { [key]: value } } );

exports.create = async ( db, data ) => {
  const user = new db( data );
  const createdUser = await user.save();

  return createdUser._id;
};
