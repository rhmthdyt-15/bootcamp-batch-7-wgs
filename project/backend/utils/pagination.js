import { Op } from "sequelize";

export const getPaginatedData = async (
  model,
  query,
  searchFields,
  operator = Op.like
) => {
  const page = parseInt(query.page) || 0;
  const limit = parseInt(query.limit) || 10;
  const search = query.search_query || "";
  const offset = limit * page;

  const whereClause = {
    [Op.or]: searchFields.map((field) => ({
      [field]: {
        [operator]: `%${search}%`,
      },
    })),
  };

  const totalRows = await model.count({
    where: whereClause,
  });

  const totalPage = Math.ceil(totalRows / limit);

  const result = await model.findAll({
    where: whereClause,
    offset: offset,
    limit: limit,
    order: [["createdAt", "DESC"]],
  });

  return {
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  };
};
