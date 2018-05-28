exports.generateGraphData = {
  ageToTime: data => {
    const lifeExpectancy = data.gender ? 85 : 90;
    const timePerYear = data.time * 356;

    const line = [
      {
        x: data.startingAge,
        y: 0,
      },
      {
        x: data.age,
        y: ( data.age - data.startingAge ) * timePerYear,
      },
      {
        x: lifeExpectancy,
        y: ( lifeExpectancy - data.age ) * timePerYear,
      },
    ];

    return line;
  },
};
